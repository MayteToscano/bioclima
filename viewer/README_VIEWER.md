# BioClima CoverageJSON Viewer final version

Replace the existing `viewer/` folder in the GitHub repository with these files:

- `index.html`
- `app.js`
- `style.css`
- `ontology.html`

The viewer expects the data folder to remain outside `viewer/`:

```text
data/
├── catalog.json
├── ontology-index.json
├── observations/
├── indicators/
└── categorical/
```

Main features:

- Reads `../data/catalog.json`.
- Loads CoverageJSON observations, indicators and categorical coverages.
- Detects parameters dynamically.
- Resolves each parameter `observedProperty.id` against `../data/ontology-index.json`.
- Shows semantic definition in the side panel.
- Shows value + definition + ontology link when clicking a map cell.
- Opens readable definitions through `viewer/ontology.html?uri=...&lang=...`.


V4 update:
- The parameter label in the popup is now a direct ontology link.
- The semantic title in the sidebar is also a direct ontology link.


V5 update:
- The attribute/parameter name is the main ontology link in the popup.
- The attribute name in the semantic side panel is also the ontology link.
- The Semantic URI row now shows only the raw identifier, avoiding a separate "Open definition" action.


V6 update:
- The ontology definition is resolved dynamically for every selected parameter/attribute.
- Resolution priority: observedProperty.id → parameter.id → parameter key → local aliases.
- This supports PCI attributes such as trend, anomaly, changepoint_year and changepoint_pvalue, not only vap_doy.
- The attribute name remains the main clickable ontology link.
