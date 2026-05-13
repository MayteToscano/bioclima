#!/usr/bin/env python3
"""
Build data/ontology-index.json from the existing Turtle ontology.

This script makes the existing vocabulary/ontology the source of truth.
It does not create a second ontology. It only generates a lightweight JSON
index that the browser-based viewer can use efficiently.

Default source:
  vocab/ebv-phenology.ttl

Default output:
  data/ontology-index.json

Usage:
  python3 scripts/build_ontology_index.py
  python3 scripts/build_ontology_index.py --source vocab/ebv-phenology.ttl --output data/ontology-index.json
  python3 scripts/build_ontology_index.py --source vocab/ebv-phenology.ttl --source vocab/viewer-terms.ttl
"""

from __future__ import annotations

import argparse
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


RDF_TYPE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
RDFS_LABEL = "http://www.w3.org/2000/01/rdf-schema#label"
RDFS_COMMENT = "http://www.w3.org/2000/01/rdf-schema#comment"
SKOS_PREF_LABEL = "http://www.w3.org/2004/02/skos/core#prefLabel"
SKOS_DEFINITION = "http://www.w3.org/2004/02/skos/core#definition"
DCT_TITLE = "http://purl.org/dc/terms/title"
DCT_DESCRIPTION = "http://purl.org/dc/terms/description"


DEFAULT_PREFIXES = {
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "owl": "http://www.w3.org/2002/07/owl#",
    "skos": "http://www.w3.org/2004/02/skos/core#",
    "dcterms": "http://purl.org/dc/terms/",
    "dct": "http://purl.org/dc/terms/",
    "xsd": "http://www.w3.org/2001/XMLSchema#",
}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--source",
        action="append",
        default=[],
        help="Turtle ontology file. Can be provided more than once.",
    )
    parser.add_argument(
        "--output",
        default="data/ontology-index.json",
        help="Output JSON index path.",
    )
    parser.add_argument(
        "--default-language",
        default="en",
        help="Default language for labels and definitions.",
    )
    args = parser.parse_args()

    sources = [Path(p) for p in args.source] or default_sources()

    existing_sources = [p for p in sources if p.exists()]
    if not existing_sources:
        raise FileNotFoundError(
            "No ontology source found. Expected one of: "
            + ", ".join(str(p) for p in sources)
        )

    prefixes: dict[str, str] = dict(DEFAULT_PREFIXES)
    triples: dict[str, dict[str, list[Any]]] = {}

    for source in existing_sources:
        text = source.read_text(encoding="utf-8")
        prefixes.update(parse_prefixes(text))
        parse_turtle_into_index(text, prefixes, triples)

    terms = build_terms(triples, prefixes)
    supported_languages = sorted(
        {
            lang
            for term in terms.values()
            for key in ("label", "definition")
            for lang in term.get(key, {}).keys()
        }
    )

    if args.default_language not in supported_languages:
        supported_languages.insert(0, args.default_language)

    result = {
        "@context": {
            "id": "@id",
            "label": str(RDFS_LABEL),
            "definition": str(SKOS_DEFINITION),
            "type": "@type",
        },
        "sourceOfTruth": "Existing Turtle ontology files",
        "sources": [str(p) for p in existing_sources],
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "defaultLanguage": args.default_language,
        "supportedLanguages": supported_languages,
        "terms": terms,
    }

    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(f"Generated {output} with {len(terms)} ontology terms from:")
    for source in existing_sources:
        print(f"  - {source}")


def default_sources() -> list[Path]:
    candidates = [
        Path("vocab/ebv-phenology.ttl"),
        Path("_sources/ebv-ontology/ontology.ttl"),
    ]

    # If a project later adds a small auxiliary ontology, include it automatically.
    candidates.extend(sorted(Path("vocab").glob("*.ttl")) if Path("vocab").exists() else [])
    candidates.extend(sorted(Path("_sources/ebv-ontology").glob("*.ttl")) if Path("_sources/ebv-ontology").exists() else [])

    # Preserve order and remove duplicates.
    unique: list[Path] = []
    seen = set()
    for path in candidates:
        key = str(path)
        if key not in seen:
            unique.append(path)
            seen.add(key)

    return unique


def parse_prefixes(text: str) -> dict[str, str]:
    prefixes: dict[str, str] = {}
    pattern = re.compile(r"@prefix\s+([A-Za-z][\w-]*):\s*<([^>]+)>\s*\.", re.MULTILINE)
    for match in pattern.finditer(text):
        prefixes[match.group(1)] = match.group(2)
    return prefixes


def parse_turtle_into_index(text: str, prefixes: dict[str, str], triples: dict[str, dict[str, list[Any]]]) -> None:
    # Remove prefix declarations line by line. Do not use a pattern that stops
    # at the first dot because URLs contain dots.
    body = re.sub(r"^\s*@prefix\s+[^\n]*?\.\s*$", "", text, flags=re.MULTILINE)
    body = strip_comments(body)

    for statement in split_outside_quotes(body, "."):
        statement = statement.strip()
        if not statement:
            continue

        parts = split_outside_quotes(statement, ";")
        if not parts:
            continue

        first = parts[0].strip()
        subject_token, predicate_object = split_first_token(first)
        if not subject_token or not predicate_object:
            continue

        subject = expand_token(subject_token, prefixes)
        if not subject:
            continue

        subject_triples = triples.setdefault(subject, {})

        predicate_objects = [predicate_object] + [p.strip() for p in parts[1:] if p.strip()]
        current_predicate = None

        for po in predicate_objects:
            predicate_token, objects_text = split_first_token(po)

            if not predicate_token:
                continue

            predicate = expand_predicate(predicate_token, prefixes)

            if not objects_text:
                # Turtle allows repeated predicate via comma lists, but we only parse complete clauses here.
                continue

            current_predicate = predicate
            objects = split_outside_quotes(objects_text, ",")

            for obj_text in objects:
                obj = parse_object(obj_text.strip(), prefixes)
                if obj is None:
                    continue
                subject_triples.setdefault(current_predicate, []).append(obj)


def strip_comments(text: str) -> str:
    result = []
    in_quote = False
    in_angle = False
    escaped = False
    i = 0

    while i < len(text):
        ch = text[i]

        if ch == "\\" and in_quote:
            escaped = not escaped
            result.append(ch)
            i += 1
            continue

        if ch == '"' and not escaped and not in_angle:
            in_quote = not in_quote
            result.append(ch)
            i += 1
            continue

        escaped = False

        if not in_quote:
            if ch == "<":
                in_angle = True
            elif ch == ">":
                in_angle = False

        if ch == "#" and not in_quote and not in_angle:
            while i < len(text) and text[i] not in "\r\n":
                i += 1
            continue

        result.append(ch)
        i += 1

    return "".join(result)


def split_outside_quotes(text: str, delimiter: str) -> list[str]:
    parts: list[str] = []
    start = 0
    in_quote = False
    escaped = False
    angle_depth = 0

    for i, ch in enumerate(text):
        if ch == "\\" and in_quote:
            escaped = not escaped
            continue

        if ch == '"' and not escaped:
            in_quote = not in_quote

        escaped = False

        if not in_quote:
            if ch == "<":
                angle_depth += 1
            elif ch == ">":
                angle_depth = max(0, angle_depth - 1)
            elif ch == delimiter and angle_depth == 0:
                parts.append(text[start:i])
                start = i + 1

    parts.append(text[start:])
    return parts


def split_first_token(text: str) -> tuple[str, str]:
    text = text.strip()
    if not text:
        return "", ""

    in_angle = False
    for i, ch in enumerate(text):
        if ch == "<":
            in_angle = True
        elif ch == ">":
            in_angle = False
        elif ch.isspace() and not in_angle:
            return text[:i].strip(), text[i:].strip()

    return text, ""


def expand_predicate(token: str, prefixes: dict[str, str]) -> str:
    if token == "a":
        return RDF_TYPE
    return expand_token(token, prefixes) or token


def expand_token(token: str, prefixes: dict[str, str]) -> str | None:
    token = token.strip()

    if not token:
        return None

    if token.startswith("<") and token.endswith(">"):
        return token[1:-1]

    if ":" in token:
        prefix, local = token.split(":", 1)
        if prefix in prefixes:
            return prefixes[prefix] + local

    return token


def parse_object(text: str, prefixes: dict[str, str]) -> Any | None:
    if not text:
        return None

    # Language-tagged or typed string literal.
    literal_match = re.match(
        r'^"((?:[^"\\]|\\.)*)"(?:@([A-Za-z-]+)|\^\^([^\s]+))?$',
        text,
        flags=re.DOTALL,
    )

    if literal_match:
        raw = literal_match.group(1)
        lang = literal_match.group(2)
        datatype = literal_match.group(3)
        # Preserve UTF-8 Turtle literals. Only unescape the most common
        # quoted-string escapes instead of re-decoding the whole string.
        value = (
            raw.replace(r'\\"', '"')
               .replace(r"\\'", "'")
               .replace(r"\\n", "\n")
               .replace(r"\\t", "\t")
               .replace(r"\\\\", "\\")
        )

        if lang:
            return {"value": value, "lang": lang.lower()}

        if datatype:
            return {"value": value, "datatype": expand_token(datatype, prefixes) or datatype}

        return {"value": value}

    # IRI or QName object.
    expanded = expand_token(text, prefixes)
    if expanded:
        return {"id": expanded}

    return None


def build_terms(triples: dict[str, dict[str, list[Any]]], prefixes: dict[str, str]) -> dict[str, dict[str, Any]]:
    terms: dict[str, dict[str, Any]] = {}

    for subject, props in sorted(triples.items()):
        labels = collect_lang_values(props.get(RDFS_LABEL, []))
        pref_labels = collect_lang_values(props.get(SKOS_PREF_LABEL, []))
        titles = collect_lang_values(props.get(DCT_TITLE, []))

        definitions = collect_lang_values(props.get(SKOS_DEFINITION, []))
        comments = collect_lang_values(props.get(RDFS_COMMENT, []))
        descriptions = collect_lang_values(props.get(DCT_DESCRIPTION, []))

        label = merge_lang_maps(labels, pref_labels, titles)
        definition = merge_lang_maps(definitions, comments, descriptions)

        rdf_types = [
            shrink_uri(obj.get("id"), prefixes)
            for obj in props.get(RDF_TYPE, [])
            if isinstance(obj, dict) and obj.get("id")
        ]
        rdf_types = [t for t in rdf_types if t]

        if not label and not definition and not rdf_types:
            continue

        term: dict[str, Any] = {
            "id": subject,
        }

        if rdf_types:
            term["type"] = rdf_types[0] if len(rdf_types) == 1 else rdf_types

        if label:
            term["label"] = label

        if definition:
            term["definition"] = definition

        # Useful lookup key for browser fallback.
        fragment = subject.split("#")[-1].split("/")[-1]
        term["fragment"] = fragment

        terms[subject] = term

    return terms


def collect_lang_values(objects: list[Any]) -> dict[str, str]:
    result: dict[str, str] = {}

    for obj in objects:
        if not isinstance(obj, dict) or "value" not in obj:
            continue

        lang = obj.get("lang", "und").lower()
        result.setdefault(lang, obj["value"])

    return result


def merge_lang_maps(*maps: dict[str, str]) -> dict[str, str]:
    result: dict[str, str] = {}

    for mp in maps:
        for lang, value in mp.items():
            result.setdefault(lang, value)

    # Use untagged literal as English fallback if no English label exists.
    if "en" not in result and "und" in result:
        result["en"] = result["und"]

    result.pop("und", None)
    return result


def shrink_uri(uri: str | None, prefixes: dict[str, str]) -> str | None:
    if not uri:
        return None

    for prefix, base in prefixes.items():
        if uri.startswith(base):
            return f"{prefix}:{uri[len(base):]}"

    return uri


if __name__ == "__main__":
    main()
