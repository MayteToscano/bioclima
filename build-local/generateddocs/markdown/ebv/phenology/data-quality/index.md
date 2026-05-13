
# Data Quality (Schema)

`syke.ebv.phenology.data-quality` *v1.0*

Uncertainty, validation, bias, gaps.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

# Data Quality
±9 days accuracy, ~3 days late bias, pre-2005 gaps.

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: Data quality metrics
type: object
properties:
  accuracy_days:
    type: number
  bias_days:
    type: number
  validation_method:
    type: string
  known_limitations:
    type: array
    items:
      type: string

```

Links to the schema:

* YAML version: [schema.yaml](http://localhost:9090/register/build-local/annotated/ebv/phenology/data-quality/schema.json)
* JSON version: [schema.json](http://localhost:9090/register/build-local/annotated/ebv/phenology/data-quality/schema.yaml)


# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/ogcincubator/bblocks-ebv-bioclima](https://github.com/ogcincubator/bblocks-ebv-bioclima)
* Path: `_sources/data-quality`

