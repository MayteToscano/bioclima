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
