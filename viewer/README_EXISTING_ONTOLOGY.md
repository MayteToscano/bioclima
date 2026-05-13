# Semantic viewer using the existing ontology

This package keeps the existing ontology as the source of truth.

## Source of truth

Use the existing Turtle ontology:

```text
vocab/ebv-phenology.ttl
```

or, if that is your canonical copy:

```text
_sources/ebv-ontology/ontology.ttl
```

## Browser index

The file below is not a second ontology:

```text
data/ontology-index.json
```

It is only a lightweight index generated from the Turtle ontology so that the JavaScript viewer can resolve:

```text
observedProperty.id → label → definition → language → type
```

## Files to upload

Upload or replace these files in the repository:

```text
scripts/build_ontology_index.py
viewer/index.html
viewer/app.js
viewer/style.css
viewer/ontology.html
viewer/README_VIEWER.md
data/ontology-index.json
.github/workflows/build-ontology-index.yml   # optional but recommended
```

## How it works

1. CoverageJSON parameters contain semantic identifiers, usually in:

```json
"observedProperty": {
  "id": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#phenological_trend"
}
```

2. The viewer reads `data/ontology-index.json`.

3. The index is generated from the existing Turtle ontology using:

```bash
python3 scripts/build_ontology_index.py
```

4. The popup links the attribute name itself to:

```text
viewer/ontology.html?uri=<semantic-uri>&lang=<language>
```

## Important

Do not edit `data/ontology-index.json` manually unless it is only for a quick test.

Edit the ontology in `vocab/ebv-phenology.ttl`, then regenerate the index.

If an attribute does not show a definition, it means one of these is missing:

- the CoverageJSON parameter does not have a correct `observedProperty.id`;
- the URI used by the CoverageJSON does not match the ontology URI;
- the ontology term has no `rdfs:label` or `skos:definition`;
- the term uses a different fragment and needs an alias in `viewer/app.js`.

## Multilingual behaviour

The viewer shows the requested language if the ontology contains it.

If a term has no label/definition in that language, the viewer falls back to English or Spanish.


## Time animation

The viewer now supports temporal CoverageJSON grids.

If a selected CoverageJSON parameter has a `t` axis with more than one value,
the viewer automatically shows a time slider, a year/time selector and a Play/Pause button.

Expected CoverageJSON pattern:

```json
"domain": {
  "axes": {
    "t": { "values": ["2001-01-01T00:00:00Z", "2002-01-01T00:00:00Z"] },
    "y": {},
    "x": {}
  }
},
"ranges": {
  "vap_doy": {
    "axisNames": ["t", "y", "x"],
    "shape": [18, 50, 50],
    "values": []
  }
}
```

Static indicators such as PCI will not show the Play button unless they also include a temporal `t` axis.


## Fix v2

The viewer now tries several safe URL candidates for `data/catalog.json`,
`data/ontology-index.json` and CoverageJSON files. This avoids 404 errors when
GitHub Pages serves the viewer under `/bioclima/viewer/`.
