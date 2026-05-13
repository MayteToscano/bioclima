
# Ecosystem Services Link (Schema)

`syke.ebv.phenology.ecosystem-services` *v1.0*

Connects phenological shifts to ecosystem services such as pollination, carbon sequestration, water regulation, timber and recreation.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

# Ecosystem Services Link
Pollination timing mismatch, longer carbon season, earlier snowmelt/runoff, timber growth, autumn tourism.

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: Ecosystem service impact links
type: object
properties:
  services:
    type: array
    items:
      type: object
      properties:
        name:
          type: string
        category:
          type: string
          enum:
          - provisioning
          - regulating
          - cultural
          - supporting
        impact:
          type: string

```

Links to the schema:

* YAML version: [schema.yaml](http://localhost:9090/register/build-local/annotated/ebv/phenology/ecosystem-services/schema.json)
* JSON version: [schema.json](http://localhost:9090/register/build-local/annotated/ebv/phenology/ecosystem-services/schema.yaml)


# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/ogcincubator/bblocks-ebv-bioclima](https://github.com/ogcincubator/bblocks-ebv-bioclima)
* Path: `_sources/ecosystem-services`

