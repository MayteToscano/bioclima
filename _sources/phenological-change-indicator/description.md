# Phenological Change Indicator Coverage

This block defines a semantic CoverageJSON profile for the **Phenological Change Indicator (PCI)**.

The PCI describes observed phenological change using only the SOS/VAP time series. It is represented as **one Coverage** with one `ParameterGroup` and four parameters:

- `trend`: Theil-Sen slope of SOS/VAP against year, in days/year.
- `anomaly`: recent mean minus baseline mean, using 2001-2010 as baseline and 2011-2018 as recent period.
- `changepoint_year`: Pettitt test change-point year.
- `changepoint_pvalue`: Pettitt test p-value.

The numerical values remain in CoverageJSON `ranges`; the semantic meaning is provided through `parameters[*].observedProperty.id`, the `ParameterGroup`, the ontology and PROV-based provenance.
