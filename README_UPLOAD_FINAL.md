# BioClima final viewer with time Play

This package fixes the two issues:

1. The viewer now shows **Play/Pause by year** for multitemporal CoverageJSON files.
2. The **attribute/parameter name itself** is the ontology link.

## What to upload

Upload/replace these folders/files in GitHub:

```text
viewer/
data/catalog.json
data/ontology-index.json
data/observations/finland-vap-coniferous-2001-2018.covjson
data/observations/finland-vap-deciduous-2001-2018.covjson
scripts/build_multitemporal_vap_covjson.py
scripts/build_ontology_index.py
```

The package also includes the existing PCI and categorical files for completeness:

```text
data/indicators/
data/categorical/
```

## Important

The Play button only appears for coverages that have a temporal `t` axis with more than one value.

Use one of these coverages in the viewer:

```text
[observation] VAP coniferous 2001-2018 time series
[observation] VAP deciduous 2001-2018 time series
```

The old coverage below is static and will not show Play:

```text
[observation] VAP coniferous 2001 crop
```

The PCI is also static because it summarizes 2001-2018 into four parameters:

```text
trend
anomaly
changepoint_year
changepoint_pvalue
```

## Attribute links

In the popup, the parameter name is the ontology link. For example:

```text
Start of VAP (Day of Year)
Phenological trend
Phenological anomaly
Change point year
Change point p-value
```

The row `Semantic URI` shows the raw identifier only.

## After upload

Open:

```text
https://maytetoscano.github.io/bioclima/viewer/?coverage=finland-vap-coniferous-2001-2018&parameter=vap_doy&lang=en
```

Force refresh:

```text
Cmd + Shift + R
```
