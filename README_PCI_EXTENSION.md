# PCI semantic CoverageJSON extension

This package extends the original `bblocks-ebv-bioclima` repository with a semantic, catalog-driven implementation of the **Phenological Change Indicator (PCI)**.

## What has been added

- `data/observations/finland-vap-coniferous-2001-crop.covjson`
- `data/indicators/finland-pci-coniferous-2001-2018.covjson`
- `data/indicators/finland-pci-deciduous-2001-2018.covjson`
- `data/categorical/finland-bioclimatic-zones.covjson`
- `data/catalog.json`
- `data/methods/pci-method.jsonld`
- `data/provenance/pci-provenance.jsonld`
- `_sources/phenological-change-indicator/`
- `_sources/bioclimatic-zone-coverage/`
- a generic viewer in `viewer/`
- scripts under `scripts/`

## PCI definition

The PCI is represented as **one CoverageJSON Coverage** with one `ParameterGroup` and four parameters:

- `trend`: Theil-Sen slope of VAP/SOS against year, in days/year.
- `anomaly`: mean VAP/SOS for 2011-2018 minus mean VAP/SOS for 2001-2010.
- `changepoint_year`: Pettitt test change-point year.
- `changepoint_pvalue`: Pettitt test p-value.

## Semantic approach

Python performs the numerical calculation. The semantics are provided by:

- the new Building Block `_sources/phenological-change-indicator/`;
- `parameters[*].observedProperty.id` in the CoverageJSON files;
- the PCI `ParameterGroup`;
- ontology terms in `vocab/ebv-phenology.ttl` and `_sources/ebv-ontology/ontology.ttl`;
- the method definition `data/methods/pci-method.jsonld`;
- the provenance file `data/provenance/pci-provenance.jsonld`.

## Viewer

Open:

```text
viewer/index.html
```

The viewer reads `data/catalog.json`, loads any registered CoverageJSON file, detects its parameters dynamically and displays observations, indicators or categorical coverages.

## Important note on the bioclimatic-zone layer

The bundled `finland-bioclimatic-zones.covjson` is a demonstrator layer aligned with the VAP grid. Replace it with an official bioclimatic zonation layer when available, preserving the same semantic structure.


## Processing scripts as Building Blocks

The executable components are also exposed as Building Blocks under `_sources/`:

- `pci-computation-process`: semantic block for `scripts/compute_pci.py`.
- `bioclimatic-zone-generation-process`: semantic block for `scripts/generate_bioclimatic_zones.py`.
- `covjson-validation-process`: semantic block for `scripts/validate_covjson.py`.
- `semantic-coveragejson-viewer`: semantic block for the catalog-driven multilingual map viewer.

The code remains in `scripts/` and `viewer/`, but each executable component now has a semantic process block with JSON-LD metadata, inputs, outputs, implementation path and ontology links.

## Multilingual ontology-aware viewer

The viewer loads `data/ontology-index.json` and resolves each CoverageJSON `parameters[*].observedProperty.id` against that index. The interface language is selected automatically from `navigator.languages`, with manual override through the language selector and a URL parameter such as `viewer/?lang=es` or `viewer/?lang=fi`.
