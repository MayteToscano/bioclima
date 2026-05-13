
# EBV Phenology Ontology (Schema)

`syke.ebv.phenology.ebv-ontology` *v1.0*

OWL/SKOS ontology with multilingual labels (EN, ES, ZH, RO). Linked from CovJSON observedProperty URIs.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

# EBV Phenology Ontology

OWL ontology, 4 languages. Linked via CovJSON `observedProperty.id` URIs.

```
EcosystemFunctioning → EcosystemPhenology → StartOfVAP / PeakGreenness / StartOfSenescence
Entities: ConiferousForest, DeciduousForest
Methods: RemoteSensing, GroundObservation
```

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: EBV Phenology Ontology concept reference
type: object
properties:
  concept_uri:
    type: string
  labels:
    type: object

```

Links to the schema:

* YAML version: [schema.yaml](https://ogcincubator.github.io/bblocks-ebv-bioclima/build/annotated/ebv/phenology/ebv-ontology/schema.json)
* JSON version: [schema.json](https://ogcincubator.github.io/bblocks-ebv-bioclima/build/annotated/ebv/phenology/ebv-ontology/schema.yaml)

## Sources

* [W3C OWL 2](https://www.w3.org/TR/owl2-overview/)

# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/ogcincubator/bblocks-ebv-bioclima](https://github.com/ogcincubator/bblocks-ebv-bioclima)
* Path: `_sources/ebv-ontology`

