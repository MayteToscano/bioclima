# BioClima CoverageJSON Semantic Viewer

Replace the existing `viewer/` folder in the GitHub repository with the files in this folder.

Expected repository structure:

```text
bioclima/
├── data/
│   ├── catalog.json
│   ├── ontology-index.json
│   ├── observations/
│   ├── indicators/
│   └── categorical/
└── viewer/
    ├── index.html
    ├── app.js
    ├── style.css
    └── ontology.html
```

The viewer loads:

- `../data/catalog.json`
- `../data/ontology-index.json`
- the CoverageJSON files referenced by the catalog.

It should display:

- VAP observation CoverageJSON;
- PCI indicators with `trend`, `anomaly`, `changepoint_year`, `changepoint_pvalue`;
- categorical bioclimatic zones;
- semantic definitions and ontology links in the side panel and map popup.

After uploading, open:

```text
https://maytetoscano.github.io/bioclima/viewer/
```

Force refresh with `Cmd + Shift + R` if the browser keeps an older cached version.
