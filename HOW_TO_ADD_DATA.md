# How to add new observations and indicators

This repository is designed to be extended without rewriting the viewer.

## Add a new observation

1. Add the CoverageJSON file under `data/observations/`.
2. Ensure each parameter contains `observedProperty.id`, `label` and, where relevant, `unit`.
3. Add an entry to `data/catalog.json` with `kind: "observation"`.
4. Open `viewer/index.html`; the coverage and its parameters will be detected automatically.

## Add a new indicator

1. Define or reuse semantic terms in `vocab/ebv-phenology.ttl` and `_sources/ebv-ontology/ontology.ttl`.
2. Create a Building Block under `_sources/` only for a new indicator type, not for every file.
3. Store the output CoverageJSON under `data/indicators/`.
4. Add the indicator to `data/catalog.json` with `kind: "indicator"`.
5. Add method/provenance metadata under `data/methods/` and `data/provenance/` when the indicator is derived.

## Core design principle

The numerical values stay in CoverageJSON `ranges`. Their meaning is expressed through semantic URIs in `parameters[*].observedProperty.id`, `parameterGroups`, the ontology and provenance files.


## Add ontology-linked labels for the viewer

When adding a new parameter, assign a stable `observedProperty.id` and add the same URI to `data/ontology-index.json` with multilingual labels and definitions. The viewer will use this file to display the parameter in the browser language.

Example:

```json
"https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#new_indicator_component": {
  "label": {"en": "New component", "es": "Nuevo componente", "fi": "Uusi komponentti"},
  "definition": {"en": "...", "es": "...", "fi": "..."}
}
```
