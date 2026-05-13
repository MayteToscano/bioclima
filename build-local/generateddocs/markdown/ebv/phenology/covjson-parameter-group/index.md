
# CovJSON Parameter Group (Schema)

`syke.ebv.phenology.covjson-parameter-group` *v1.0*

Semantic grouping of related parameters, e.g., velocity = speed + direction, or coniferous + deciduous VAP.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

# CovJSON Parameter Group

Groups semantically related parameters. For phenology: coniferous VAP + deciduous VAP grouped under "Ecosystem Phenology".

## UML: ParameterGroup 0..1 ← 1..* Parameter

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: CoverageJSON ParameterGroup - semantic association of parameters
type: object
required:
- type
- members
properties:
  type:
    type: string
    const: ParameterGroup
  label:
    type: object
  description:
    type: object
  observedProperty:
    type: object
    properties:
      id:
        type: string
      label:
        type: object
  members:
    type: array
    items:
      type: string

```

Links to the schema:

* YAML version: [schema.yaml](http://localhost:9090/register/build-local/annotated/ebv/phenology/covjson-parameter-group/schema.json)
* JSON version: [schema.json](http://localhost:9090/register/build-local/annotated/ebv/phenology/covjson-parameter-group/schema.yaml)

## Sources

* [OGC CoverageJSON 21-069r2 §8.3](https://docs.ogc.org/cs/21-069r2/21-069r2.html)

# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/ogcincubator/bblocks-ebv-bioclima](https://github.com/ogcincubator/bblocks-ebv-bioclima)
* Path: `_sources/covjson-parameter-group`

