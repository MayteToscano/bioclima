
# CovJSON Coverage Collection (Schema)

`syke.ebv.phenology.covjson-coverage-collection` *v1.0*

Collection of coverages grouping multiple entities. Maps to the EBV Data Cube with 4 dimensions: lon, lat, time, entity.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

# CovJSON Coverage Collection

Groups multiple coverages = EBV Data Cube.

## [→ Open Interactive Viewer](../../viewer/)

## UML: CoverageCollection 0..1 ← 1..* Coverage
```
CoverageCollection (EBV Data Cube)
├── Coverage: Coniferous VAP (320×200×18)
├── Coverage: Deciduous VAP (320×200×18)
└── ParameterGroup: "Ecosystem Phenology"
    ├── member: VAP_coniferous
    └── member: VAP_deciduous
```

## 4 Dimensions of the EBV Cube
1. **x** (longitude): 14.10° – 35.23°
2. **y** (latitude): 57.75° – 71.17°
3. **t** (time): 2001–2018 annual
4. **entity**: Coniferous, Deciduous (one Coverage per entity)

## Examples

### Finland VAP collection (coniferous + deciduous)
CoverageCollection with two entity coverages. ParameterGroup semantically links 
both under EcosystemPhenology. Maps to the EBV Data Cube (lon, lat, time, entity).

#### json
```json
{
  "type": "CoverageCollection",
  "domainType": "Grid",
  "parameters": {
    "VAP": {
      "type": "Parameter",
      "description": {
        "en": "Start of Vegetation Active Period",
        "es": "Inicio del Periodo Activo de Vegetación",
        "zh": "植被活跃期起始",
        "ro": "Începutul Perioadei Active a Vegetației"
      },
      "unit": {
        "label": {"en": "Day of Year"},
        "symbol": {"value": "d"}
      },
      "observedProperty": {
        "id": "https://w3id.org/ogc/hosted/ebv-phenology/StartOfVAP",
        "label": {"en": "Start of VAP", "es": "Inicio del PAV", "zh": "VAP起始", "ro": "Începutul VAP"}
      }
    }
  },
  "parameterGroups": [
    {
      "type": "ParameterGroup",
      "label": {"en": "Phenology by forest type", "es": "Fenología por tipo de bosque"},
      "observedProperty": {
        "id": "https://w3id.org/ogc/hosted/ebv-phenology/EcosystemPhenology",
        "label": {"en": "Ecosystem Phenology", "es": "Fenología del Ecosistema"}
      },
      "members": ["VAP_coniferous", "VAP_deciduous"]
    }
  ],
  "coverages": [
    {
      "type": "Coverage",
      "domain": {
        "type": "Domain", "domainType": "Grid",
        "axes": {
          "x": {"start":14.10,"stop":35.23,"num":320},
          "y": {"start":57.75,"stop":71.17,"num":200},
          "t": {"values":["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018"]}
        },
        "referencing": [{"coordinates":["x","y"],"system":{"type":"GeographicCRS","id":"http://www.opengis.net/def/crs/OGC/1.3/CRS84"}},{"coordinates":["t"],"system":{"type":"TemporalRS","calendar":"Gregorian"}}]
      },
      "ranges": {"VAP": {"type":"NdArray","dataType":"integer","axisNames":["t","y","x"],"shape":[18,200,320]}}
    },
    {
      "type": "Coverage",
      "domain": {
        "type": "Domain", "domainType": "Grid",
        "axes": {
          "x": {"start":14.10,"stop":35.23,"num":320},
          "y": {"start":57.75,"stop":71.17,"num":200},
          "t": {"values":["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018"]}
        },
        "referencing": [{"coordinates":["x","y"],"system":{"type":"GeographicCRS","id":"http://www.opengis.net/def/crs/OGC/1.3/CRS84"}},{"coordinates":["t"],"system":{"type":"TemporalRS","calendar":"Gregorian"}}]
      },
      "ranges": {"VAP": {"type":"NdArray","dataType":"integer","axisNames":["t","y","x"],"shape":[18,200,320]}}
    }
  ]
}

```

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: CoverageJSON CoverageCollection - groups multiple entity coverages
type: object
required:
- type
- coverages
properties:
  type:
    type: string
    const: CoverageCollection
  domainType:
    type: string
  parameters:
    type: object
  parameterGroups:
    type: array
    items:
      type: object
  coverages:
    type: array
    items:
      type: object
      required:
      - type

```

Links to the schema:

* YAML version: [schema.yaml](http://localhost:9090/register/build-local/annotated/ebv/phenology/covjson-coverage-collection/schema.json)
* JSON version: [schema.json](http://localhost:9090/register/build-local/annotated/ebv/phenology/covjson-coverage-collection/schema.yaml)

## Sources

* [OGC CoverageJSON 21-069r2 §6.3](https://docs.ogc.org/cs/21-069r2/21-069r2.html)

# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/ogcincubator/bblocks-ebv-bioclima](https://github.com/ogcincubator/bblocks-ebv-bioclima)
* Path: `_sources/covjson-coverage-collection`

