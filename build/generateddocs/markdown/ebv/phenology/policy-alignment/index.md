
# Policy Alignment (Schema)

`syke.ebv.phenology.policy-alignment` *v1.0*

Policy-relevance and alignment record for EBV phenology data and derived indicators.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

# Policy Alignment

This Building Block documents potential policy alignment for EBV phenology data.

It does not claim that the example dataset proves policy compliance. Instead, it explains how the dataset and related Building Blocks may support policy-relevant monitoring themes such as:

- biodiversity monitoring
- climate change impacts on ecosystems
- forest ecosystem functioning
- open and interoperable environmental data workflows

The example distinguishes between:

- the full source dataset, which may support national-scale monitoring;
- illustrative Building Block examples, which are not representative policy indicators by themselves;
- derived Phenology Indicators, which require methodology, provenance, validation and uncertainty information.

Policy use should be framed cautiously. The recommended wording is:

> This Building Block can support policy-relevant monitoring of ecosystem phenology, but the examples are illustrative and should not be interpreted as policy-grade indicators by themselves.

## Examples

### Policy alignment for Finland EBV phenology data
examples/finland-phenology-policy-alignment.json
#### json
```json
{
  "type": "PolicyAlignment",
  "title": "Policy alignment for Finland EBV phenology data",
  "description": "Illustrative policy alignment record for the EBV phenology dataset 'Vegetation Phenology in Finland'. The record explains how the dataset may support policy-relevant monitoring, while clearly distinguishing between technical interoperability examples and policy-grade indicators.",
  "source_dataset": {
    "title": "Vegetation Phenology in Finland",
    "doi": "10.25829/xf8ek6",
    "product_version": "2",
    "date_issued": "2023-07-18",
    "spatial_scope": "Finland",
    "temporal_coverage": {
      "time_coverage_resolution": "P0001-00-00",
      "time_coverage_start": "2001-01-01",
      "time_coverage_end": "2018-01-01"
    },
    "ebv_class": "Ecosystem functioning",
    "ebv_name": "Ecosystem phenology",
    "ebv_entity_scope": "Coniferous and deciduous forests",
    "metric": {
      ":standard_name": "Start of the vegetation active period (VAP)",
      ":long_name": "The start of the vegetation active period (VAP) in coniferous forest (Day of Year) is defined as the day when the trees start to photosynthesize in spring. The data set was derived from Moderate Resolution Imaging Spetroradiometer (MODIS) satellite observation of Fractional Snow Cover. The day when snow cover decreases during spring melt was used as a proxy indicator for the beginning of the start of the vegetation active period. The start of the vegetation active period (VAP) in deciduous vegetation (Day of Year) is defined as the day when deciduous trees unfold new leaves in spring. It is also often referred to as the green-up or greening day. The data set was derived from time series of the Normalized Difference Water Index (NDWI) calculated from Moderate Resolution Imaging Spetroradiometer (MODIS) satellite observation.",
      ":units": "Day of year"
    },
    "license": "https://creativecommons.org/licenses/by/4.0"
  },
  "policy_relevance": {
    "summary": "The dataset may support policy-relevant monitoring of ecosystem phenology, forest ecosystem functioning and climate-driven changes in seasonal vegetation dynamics.",
    "relevance_type": "potential_supporting_evidence",
    "policy_use_level": "monitoring_support",
    "not_policy_grade_by_itself": true
  },
  "aligned_policy_themes": [
    {
      "theme": "Biodiversity monitoring",
      "alignment": "The dataset is an Essential Biodiversity Variable related to ecosystem functioning and ecosystem phenology. It can support monitoring of temporal changes in vegetation seasonality.",
      "evidence_from_dataset": [
        "Annual maps of start of Vegetation Active Period.",
        "Coverage for coniferous forests and deciduous vegetation.",
        "National spatial scope for Finland."
      ],
      "limitations": [
        "The Building Block examples may be subsets or derived summaries.",
        "Policy interpretation requires analysis of the full dataset and documented aggregation methods."
      ]
    },
    {
      "theme": "Climate change impacts on ecosystems",
      "alignment": "Changes in the start of the Vegetation Active Period can be used as an indicator of climate-related shifts in ecosystem seasonality.",
      "evidence_from_dataset": [
        "Annual time series from 2001 to 2018.",
        "MODIS-derived phenology observations.",
        "Day-of-year metric for VAP onset."
      ],
      "limitations": [
        "Trend strength and statistical significance must be assessed separately.",
        "The indicator should not be interpreted without uncertainty and validation information."
      ]
    },
    {
      "theme": "Forest ecosystem functioning",
      "alignment": "The dataset distinguishes coniferous and deciduous vegetation, supporting interpretation of forest phenology dynamics across ecosystem entities.",
      "evidence_from_dataset": [
        "EBV entity names: Coniferous and Deciduous.",
        "Metric: start of the Vegetation Active Period."
      ],
      "limitations": [
        "National-scale summaries may hide regional variation.",
        "Local management decisions would require finer-scale analysis."
      ]
    },
    {
      "theme": "Open, interoperable environmental data",
      "alignment": "Representing the dataset through OGC Building Blocks, CoverageJSON, JSON-LD and linked definitions supports reusable and interoperable environmental data workflows.",
      "evidence_from_dataset": [
        "NetCDF source dataset.",
        "CoverageJSON examples.",
        "Linked vocabulary terms for phenology attributes."
      ],
      "limitations": [
        "Interoperability does not automatically imply policy readiness.",
        "Mappings to specific reporting frameworks must be explicitly documented."
      ]
    }
  ],
  "linked_building_blocks": [
    {
      "id": "syke.ebv.phenology.covjson-coverage",
      "role": "Represents annual raster coverages."
    },
    {
      "id": "syke.ebv.phenology.ebv-feature-view",
      "role": "Provides feature-oriented examples and semantic annotation."
    },
    {
      "id": "syke.ebv.phenology.phenology-indicators",
      "role": "Represents derived temporal indicators."
    },
    {
      "id": "syke.ebv.phenology.data-provenance",
      "role": "Documents provenance and derivation lineage."
    }
  ],
  "interpretation_guidance": {
    "appropriate_use": [
      "Demonstrating how EBV phenology data can be aligned with policy-relevant monitoring themes.",
      "Explaining potential relevance to biodiversity, climate and ecosystem-functioning assessment.",
      "Supporting discussion about interoperable data flows for environmental reporting."
    ],
    "inappropriate_use": [
      "Claiming direct compliance with a policy target from the example alone.",
      "Using a small example subset as a representative national policy indicator.",
      "Inferring climate impacts without trend analysis, validation and uncertainty assessment."
    ],
    "recommended_statement": "This Building Block can support policy-relevant monitoring of ecosystem phenology, but the examples are illustrative and should not be interpreted as policy-grade indicators by themselves."
  },
  "representativeness_assessment": {
    "full_dataset": "potentially_relevant_for_national_scale_monitoring",
    "building_block_examples": "illustrative_not_representative",
    "coveragejson_crop": "technical_demonstration",
    "feature_view_examples": "semantic_and_visual_demonstration",
    "phenology_indicators": "derived_summary_requiring_methodological_context"
  }
}
```

#### jsonld
```jsonld
{
  "@context": "https://ogcincubator.github.io/bblocks-ebv-bioclima/build/annotated/ebv/phenology/policy-alignment/context.jsonld",
  "type": "PolicyAlignment",
  "title": "Policy alignment for Finland EBV phenology data",
  "description": "Illustrative policy alignment record for the EBV phenology dataset 'Vegetation Phenology in Finland'. The record explains how the dataset may support policy-relevant monitoring, while clearly distinguishing between technical interoperability examples and policy-grade indicators.",
  "source_dataset": {
    "title": "Vegetation Phenology in Finland",
    "doi": "10.25829/xf8ek6",
    "product_version": "2",
    "date_issued": "2023-07-18",
    "spatial_scope": "Finland",
    "temporal_coverage": {
      "time_coverage_resolution": "P0001-00-00",
      "time_coverage_start": "2001-01-01",
      "time_coverage_end": "2018-01-01"
    },
    "ebv_class": "Ecosystem functioning",
    "ebv_name": "Ecosystem phenology",
    "ebv_entity_scope": "Coniferous and deciduous forests",
    "metric": {
      ":standard_name": "Start of the vegetation active period (VAP)",
      ":long_name": "The start of the vegetation active period (VAP) in coniferous forest (Day of Year) is defined as the day when the trees start to photosynthesize in spring. The data set was derived from Moderate Resolution Imaging Spetroradiometer (MODIS) satellite observation of Fractional Snow Cover. The day when snow cover decreases during spring melt was used as a proxy indicator for the beginning of the start of the vegetation active period. The start of the vegetation active period (VAP) in deciduous vegetation (Day of Year) is defined as the day when deciduous trees unfold new leaves in spring. It is also often referred to as the green-up or greening day. The data set was derived from time series of the Normalized Difference Water Index (NDWI) calculated from Moderate Resolution Imaging Spetroradiometer (MODIS) satellite observation.",
      ":units": "Day of year"
    },
    "license": "https://creativecommons.org/licenses/by/4.0"
  },
  "policy_relevance": {
    "summary": "The dataset may support policy-relevant monitoring of ecosystem phenology, forest ecosystem functioning and climate-driven changes in seasonal vegetation dynamics.",
    "relevance_type": "potential_supporting_evidence",
    "policy_use_level": "monitoring_support",
    "not_policy_grade_by_itself": true
  },
  "aligned_policy_themes": [
    {
      "theme": "Biodiversity monitoring",
      "alignment": "The dataset is an Essential Biodiversity Variable related to ecosystem functioning and ecosystem phenology. It can support monitoring of temporal changes in vegetation seasonality.",
      "evidence_from_dataset": [
        "Annual maps of start of Vegetation Active Period.",
        "Coverage for coniferous forests and deciduous vegetation.",
        "National spatial scope for Finland."
      ],
      "limitations": [
        "The Building Block examples may be subsets or derived summaries.",
        "Policy interpretation requires analysis of the full dataset and documented aggregation methods."
      ]
    },
    {
      "theme": "Climate change impacts on ecosystems",
      "alignment": "Changes in the start of the Vegetation Active Period can be used as an indicator of climate-related shifts in ecosystem seasonality.",
      "evidence_from_dataset": [
        "Annual time series from 2001 to 2018.",
        "MODIS-derived phenology observations.",
        "Day-of-year metric for VAP onset."
      ],
      "limitations": [
        "Trend strength and statistical significance must be assessed separately.",
        "The indicator should not be interpreted without uncertainty and validation information."
      ]
    },
    {
      "theme": "Forest ecosystem functioning",
      "alignment": "The dataset distinguishes coniferous and deciduous vegetation, supporting interpretation of forest phenology dynamics across ecosystem entities.",
      "evidence_from_dataset": [
        "EBV entity names: Coniferous and Deciduous.",
        "Metric: start of the Vegetation Active Period."
      ],
      "limitations": [
        "National-scale summaries may hide regional variation.",
        "Local management decisions would require finer-scale analysis."
      ]
    },
    {
      "theme": "Open, interoperable environmental data",
      "alignment": "Representing the dataset through OGC Building Blocks, CoverageJSON, JSON-LD and linked definitions supports reusable and interoperable environmental data workflows.",
      "evidence_from_dataset": [
        "NetCDF source dataset.",
        "CoverageJSON examples.",
        "Linked vocabulary terms for phenology attributes."
      ],
      "limitations": [
        "Interoperability does not automatically imply policy readiness.",
        "Mappings to specific reporting frameworks must be explicitly documented."
      ]
    }
  ],
  "linked_building_blocks": [
    {
      "id": "syke.ebv.phenology.covjson-coverage",
      "role": "Represents annual raster coverages."
    },
    {
      "id": "syke.ebv.phenology.ebv-feature-view",
      "role": "Provides feature-oriented examples and semantic annotation."
    },
    {
      "id": "syke.ebv.phenology.phenology-indicators",
      "role": "Represents derived temporal indicators."
    },
    {
      "id": "syke.ebv.phenology.data-provenance",
      "role": "Documents provenance and derivation lineage."
    }
  ],
  "interpretation_guidance": {
    "appropriate_use": [
      "Demonstrating how EBV phenology data can be aligned with policy-relevant monitoring themes.",
      "Explaining potential relevance to biodiversity, climate and ecosystem-functioning assessment.",
      "Supporting discussion about interoperable data flows for environmental reporting."
    ],
    "inappropriate_use": [
      "Claiming direct compliance with a policy target from the example alone.",
      "Using a small example subset as a representative national policy indicator.",
      "Inferring climate impacts without trend analysis, validation and uncertainty assessment."
    ],
    "recommended_statement": "This Building Block can support policy-relevant monitoring of ecosystem phenology, but the examples are illustrative and should not be interpreted as policy-grade indicators by themselves."
  },
  "representativeness_assessment": {
    "full_dataset": "potentially_relevant_for_national_scale_monitoring",
    "building_block_examples": "illustrative_not_representative",
    "coveragejson_crop": "technical_demonstration",
    "feature_view_examples": "semantic_and_visual_demonstration",
    "phenology_indicators": "derived_summary_requiring_methodological_context"
  }
}
```

#### ttl
```ttl
@prefix dcterms: <http://purl.org/dc/terms/> .
@prefix ebv: <https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#> .

[] a "PolicyAlignment" ;
    dcterms:description "Illustrative policy alignment record for the EBV phenology dataset 'Vegetation Phenology in Finland'. The record explains how the dataset may support policy-relevant monitoring, while clearly distinguishing between technical interoperability examples and policy-grade indicators." ;
    dcterms:source [ dcterms:title "Vegetation Phenology in Finland" ] ;
    dcterms:title "Policy alignment for Finland EBV phenology data" ;
    ebv:aligned_policy_theme [ ],
        [ ],
        [ ],
        [ ] ;
    ebv:interpretation_guidance [ ] ;
    ebv:linked_building_block [ ],
        [ ],
        [ ],
        [ ] ;
    ebv:policy_relevance [ ] ;
    ebv:representativeness_assessment [ ] .


```

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: Policy alignment record for EBV phenology data and derived indicators.
type: object
properties:
  type:
    type: string
    const: PolicyAlignment
    x-jsonld-id: http://www.w3.org/1999/02/22-rdf-syntax-ns#type
  title:
    type: string
    x-jsonld-id: http://purl.org/dc/terms/title
  description:
    type: string
    x-jsonld-id: http://purl.org/dc/terms/description
  source_dataset:
    type: object
    x-jsonld-id: http://purl.org/dc/terms/source
  policy_relevance:
    type: object
    x-jsonld-id: https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#policy_relevance
  aligned_policy_themes:
    type: array
    x-jsonld-id: https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#aligned_policy_theme
  linked_building_blocks:
    type: array
    x-jsonld-id: https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#linked_building_block
  interpretation_guidance:
    type: object
    x-jsonld-id: https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#interpretation_guidance
  representativeness_assessment:
    type: object
    x-jsonld-id: https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#representativeness_assessment
required:
- type
- title
- source_dataset
- policy_relevance
- aligned_policy_themes
- interpretation_guidance
x-jsonld-prefixes:
  dcterms: http://purl.org/dc/terms/
  ebv: https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#

```

Links to the schema:

* YAML version: [schema.yaml](https://ogcincubator.github.io/bblocks-ebv-bioclima/build/annotated/ebv/phenology/policy-alignment/schema.json)
* JSON version: [schema.json](https://ogcincubator.github.io/bblocks-ebv-bioclima/build/annotated/ebv/phenology/policy-alignment/schema.yaml)


# JSON-LD Context

```jsonld
{
  "@context": {
    "type": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
    "title": "dcterms:title",
    "description": "dcterms:description",
    "source_dataset": "dcterms:source",
    "policy_relevance": "ebv:policy_relevance",
    "aligned_policy_themes": "ebv:aligned_policy_theme",
    "linked_building_blocks": "ebv:linked_building_block",
    "interpretation_guidance": "ebv:interpretation_guidance",
    "representativeness_assessment": "ebv:representativeness_assessment",
    "dcterms": "http://purl.org/dc/terms/",
    "ebv": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#",
    "@version": 1.1
  }
}
```

You can find the full JSON-LD context here:
[context.jsonld](https://ogcincubator.github.io/bblocks-ebv-bioclima/build/annotated/ebv/phenology/policy-alignment/context.jsonld)


# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/ogcincubator/bblocks-ebv-bioclima](https://github.com/ogcincubator/bblocks-ebv-bioclima)
* Path: `_sources/policy-alignment`

