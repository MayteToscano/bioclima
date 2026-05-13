
# EBV Dataset Profile (Schema)

`syke.ebv.phenology.ebv-profile` *v1.0*

Identity of an EBV dataset: class, name, entities, metric, scope, DOI. Following GEO BON framework.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

# EBV Dataset Profile

Identity card of an EBV dataset within the GEO BON framework. 6 EBV classes, entities, metric, scope, DOI.

## Finland: Ecosystem functioning → Ecosystem phenology → Coniferous/Deciduous → VAP (DOY)

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: EBV Dataset Profile
type: object
required:
- ebv_class
- ebv_name
- entities
properties:
  ebv_class:
    type: string
    enum:
    - Genetic composition
    - Species populations
    - Species traits
    - Community composition
    - Ecosystem structure
    - Ecosystem functioning
  ebv_name:
    type: string
  entities:
    type: array
    items:
      type: string
  metric:
    type: string
  scope:
    type: string
    enum:
    - Local
    - Regional
    - National
    - Continental
    - Global
  doi:
    type: string
  ebv_portal_id:
    type: integer
  creator:
    type: string
  institution:
    type: string
  license:
    type: string

```

Links to the schema:

* YAML version: [schema.yaml](http://localhost:9090/register/build-local/annotated/ebv/phenology/ebv-profile/schema.json)
* JSON version: [schema.json](http://localhost:9090/register/build-local/annotated/ebv/phenology/ebv-profile/schema.yaml)

## Sources

* [GEO BON EBV Framework](https://geobon.org/ebvs/)

# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/ogcincubator/bblocks-ebv-bioclima](https://github.com/ogcincubator/bblocks-ebv-bioclima)
* Path: `_sources/ebv-profile`

