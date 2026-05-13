
# CovJSON Parameter (Schema)

`syke.ebv.phenology.covjson-parameter` *v1.0*

Describes what is measured: observed property with multi-language labels, unit of measure, and optional category encoding.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

# CovJSON Parameter

Describes WHAT is measured. Key feature: **native multi-language** via i18n objects + **semantic link** via `observedProperty.id` → ontology URI.

## Finland VAP Parameter
```json
{
  "type": "Parameter",
  "description": {
    "en": "Start of Vegetation Active Period for coniferous forests",
    "es": "Inicio del Periodo Activo de Vegetación para bosques de coníferas",
    "zh": "针叶林植被活跃期起始",
    "ro": "Începutul Perioadei Active a Vegetației pentru păduri de conifere"
  },
  "unit": {
    "label": {"en": "Day of Year", "es": "Día del Año"},
    "symbol": {"value": "d"}
  },
  "observedProperty": {
    "id": "https://w3id.org/ogc/hosted/ebv-phenology/StartOfVAP",
    "label": {"en": "Start of VAP", "es": "Inicio del PAV", "zh": "VAP起始", "ro": "Începutul VAP"}
  }
}
```

## observedProperty → Ontology (bidirectional)
The `id` URI points to an OWL class in the EBV Ontology. This creates a structural semantic link.

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: CoverageJSON Parameter with i18n and observedProperty
type: object
required:
- type
- observedProperty
properties:
  type:
    type: string
    const: Parameter
    x-jsonld-id: '@type'
  description:
    type: object
    description: i18n multi-language description
    x-jsonld-id: http://purl.org/dc/terms/description
    x-jsonld-container: '@language'
  unit:
    type: object
    properties:
      label:
        type: object
        x-jsonld-id: http://www.w3.org/2004/02/skos/core#prefLabel
        x-jsonld-container: '@language'
      symbol:
        type: object
        properties:
          value:
            type: string
            x-jsonld-id: '@value'
          type:
            type: string
            x-jsonld-id: '@type'
        x-jsonld-id: http://qudt.org/schema/qudt#symbol
    x-jsonld-id: http://qudt.org/schema/qudt#unit
  observedProperty:
    type: object
    required:
    - label
    properties:
      id:
        type: string
        x-jsonld-id: '@id'
      label:
        type: object
        x-jsonld-id: http://www.w3.org/2004/02/skos/core#prefLabel
        x-jsonld-container: '@language'
      description:
        type: object
        x-jsonld-id: http://purl.org/dc/terms/description
        x-jsonld-container: '@language'
      categories:
        type: array
        items:
          type: object
    x-jsonld-id: http://www.w3.org/ns/sosa#observedProperty
  categoryEncoding:
    type: object
    x-jsonld-id: https://covjson.org/def/core#categoryEncoding
x-jsonld-extra-terms:
  meteogate: https://api.meteogate.eu/profiles/metocean/covjson
  title:
    x-jsonld-id: http://purl.org/dc/terms/title
    x-jsonld-container: '@language'
  Domain: https://covjson.org/def/core#Domain
  domain: https://covjson.org/def/core#domain
  domainType:
    x-jsonld-id: https://covjson.org/def/core#domainType
    x-jsonld-type: '@vocab'
  axes:
    x-jsonld-id: https://covjson.org/def/core#axis
    x-jsonld-container: '@index'
  dataType:
    x-jsonld-id: https://covjson.org/def/core#dataType
    x-jsonld-type: '@vocab'
  primitive: https://covjson.org/def/core#primitive
  tuple: https://covjson.org/def/core#tuple
  polygon: https://covjson.org/def/core#polygon
  num: https://covjson.org/def/core#num
  start: https://covjson.org/def/core#start
  stop: https://covjson.org/def/core#stop
  referencing:
    x-jsonld-id: https://covjson.org/def/core#referencing
    x-jsonld-container: '@set'
  components:
    x-jsonld-id: https://covjson.org/def/core#components
    x-jsonld-container: '@list'
  system: https://covjson.org/def/core#referenceSystem
  RS: https://covjson.org/def/core#ReferenceSystem
  CRS: https://covjson.org/def/core#CoordinateReferenceSystem
  cs: http://data.ign.fr/def/ignf#coordinateSystem
  CS: http://data.ign.fr/def/ignf#CoordinateSystem
  TemporalRS: http://inspire.ec.europa.eu/glossary/TemporalReferenceSystem
  TemporalCRS: https://covjson.org/def/core#TemporalCRS
  calendar:
    x-jsonld-id: https://covjson.org/def/core#calendar
    x-jsonld-type: '@vocab'
  Gregorian: http://www.opengis.net/def/uom/ISO-8601/0/Gregorian
  timeScale: https://covjson.org/def/core#timeScale
  SpatialRS: http://inspire.ec.europa.eu/glossary/SpatialReferenceSystem
  SpatialCRS: http://data.ign.fr/def/ignf#CRS
  GeodeticCRS: http://data.ign.fr/def/ignf#GeodeticCRS
  ProjectedCRS: http://data.ign.fr/def/ignf#ProjectedCRS
  VerticalCRS: http://data.ign.fr/def/ignf#VerticalCRS
  datum: http://data.ign.fr/def/ignf#datum
  csAxes:
    x-jsonld-id: https://covjson.org/def/core#coordinateSystemAxes
    x-jsonld-container: '@list'
  direction: http://data.ign.fr/def/ignf#axisDirection
  IdentifierRS: https://covjson.org/def/core#IdentifierReferenceSystem
  targetConcept: https://covjson.org/def/core#targetConcept
  identifiers:
    x-jsonld-id: https://covjson.org/def/core#identifier
    x-jsonld-type: '@id'
    x-jsonld-container: '@index'
  Parameter: https://covjson.org/def/core#Parameter
  parameters:
    x-jsonld-id: https://covjson.org/def/core#parameter
    x-jsonld-type: '@id'
    x-jsonld-container: '@index'
  usedProcedure: http://www.w3.org/ns/sosa#usedProcedure
  madeBySensor: http://www.w3.org/ns/sosa#madeBySensor
  hasFeatureOfInterest: http://www.w3.org/ns/sosa#hasFeatureOfInterest
  ParameterGroup: https://covjson.org/def/core#ParameterGroup
  members:
    x-jsonld-id: https://covjson.org/def/core#member
    x-jsonld-type: '@vocab'
    x-jsonld-container: '@set'
  ranges:
    x-jsonld-id: https://covjson.org/def/core#range
    x-jsonld-type: '@id'
    x-jsonld-container: '@index'
  NdArray: https://covjson.org/def/core#NdArray
  TiledNdArray: https://covjson.org/def/core#TiledNdArray
  shape:
    x-jsonld-id: https://covjson.org/def/core#shape
    x-jsonld-container: '@list'
  tileShape:
    x-jsonld-id: https://covjson.org/def/core#tileShape
    x-jsonld-container: '@list'
  axisNames:
    x-jsonld-id: https://covjson.org/def/core#axisNames
    x-jsonld-container: '@list'
  urlTemplate: https://covjson.org/def/core#urlTemplate
  tileSets:
    x-jsonld-id: https://covjson.org/def/core#tileSet
    x-jsonld-container: '@set'
  float: http://www.w3.org/2001/XMLSchema#double
  integer: http://www.w3.org/2001/XMLSchema#integer
  string: http://www.w3.org/2001/XMLSchema#string
  Coverage: https://covjson.org/def/core#Coverage
  coverages:
    x-jsonld-id: http://www.w3.org/ns/hydra/core#member
    x-jsonld-container: '@set'
  CoverageCollection: https://covjson.org/def/core#CoverageCollection
  Grid: https://covjson.org/def/domainTypes#Grid
  VerticalProfile: https://covjson.org/def/domainTypes#VerticalProfile
  MultiPointSeries: https://covjson.org/def/domainTypes#MultiPointSeries
  MultiPoint: https://covjson.org/def/domainTypes#MultiPoint
  PointSeries: https://covjson.org/def/domainTypes#PointSeries
  Point: https://covjson.org/def/domainTypes#Point
  Trajectory: https://covjson.org/def/domainTypes#Trajectory
  Section: https://covjson.org/def/domainTypes#Section
  MultiPolygonSeries: https://covjson.org/def/domainTypes#MultiPolygonSeries
  MultiPolygon: https://covjson.org/def/domainTypes#MultiPolygon
  Polygon: https://covjson.org/def/domainTypes#Polygon
x-jsonld-vocab: '_:'
x-jsonld-prefixes:
  skos: http://www.w3.org/2004/02/skos/core#
  dct: http://purl.org/dc/terms/
  qudt: http://qudt.org/schema/qudt#
  covjson: https://covjson.org/def/core#
  ignf: http://data.ign.fr/def/ignf#
  inspiregloss: http://inspire.ec.europa.eu/glossary/
  sosa: http://www.w3.org/ns/sosa#
  xsd: http://www.w3.org/2001/XMLSchema#
  hydra: http://www.w3.org/ns/hydra/core#
  covjsondt: https://covjson.org/def/domainTypes#
  ssn: http://www.w3.org/2005/Incubator/ssn/ssnx/ssn#
  rel: http://www.iana.org/assignments/relation/
  ebv: https://w3id.org/ogc/hosted/ebv-phenology/

```

Links to the schema:

* YAML version: [schema.yaml](https://ogcincubator.github.io/bblocks-ebv-bioclima/build/annotated/ebv/phenology/covjson-parameter/schema.json)
* JSON version: [schema.json](https://ogcincubator.github.io/bblocks-ebv-bioclima/build/annotated/ebv/phenology/covjson-parameter/schema.yaml)


# JSON-LD Context

```jsonld
{
  "@context": {
    "@vocab": "_:",
    "meteogate": "https://api.meteogate.eu/profiles/metocean/covjson",
    "title": {
      "@id": "dct:title",
      "@container": "@language"
    },
    "Domain": "covjson:Domain",
    "domain": "covjson:domain",
    "domainType": {
      "@id": "covjson:domainType",
      "@type": "@vocab"
    },
    "axes": {
      "@id": "covjson:axis",
      "@container": "@index"
    },
    "dataType": {
      "@id": "covjson:dataType",
      "@type": "@vocab"
    },
    "primitive": "covjson:primitive",
    "tuple": "covjson:tuple",
    "polygon": "covjson:polygon",
    "num": "covjson:num",
    "start": "covjson:start",
    "stop": "covjson:stop",
    "referencing": {
      "@id": "covjson:referencing",
      "@container": "@set"
    },
    "components": {
      "@id": "covjson:components",
      "@container": "@list"
    },
    "system": "covjson:referenceSystem",
    "RS": "covjson:ReferenceSystem",
    "CRS": "covjson:CoordinateReferenceSystem",
    "cs": "ignf:coordinateSystem",
    "CS": "ignf:CoordinateSystem",
    "TemporalRS": "inspiregloss:TemporalReferenceSystem",
    "TemporalCRS": "covjson:TemporalCRS",
    "calendar": {
      "@id": "covjson:calendar",
      "@type": "@vocab"
    },
    "Gregorian": "http://www.opengis.net/def/uom/ISO-8601/0/Gregorian",
    "timeScale": "covjson:timeScale",
    "SpatialRS": "inspiregloss:SpatialReferenceSystem",
    "SpatialCRS": "ignf:CRS",
    "GeodeticCRS": "ignf:GeodeticCRS",
    "ProjectedCRS": "ignf:ProjectedCRS",
    "VerticalCRS": "ignf:VerticalCRS",
    "datum": "ignf:datum",
    "csAxes": {
      "@id": "covjson:coordinateSystemAxes",
      "@container": "@list"
    },
    "direction": "ignf:axisDirection",
    "IdentifierRS": "covjson:IdentifierReferenceSystem",
    "targetConcept": "covjson:targetConcept",
    "identifiers": {
      "@id": "covjson:identifier",
      "@type": "@id",
      "@container": "@index"
    },
    "Parameter": "covjson:Parameter",
    "parameters": {
      "@id": "covjson:parameter",
      "@type": "@id",
      "@container": "@index"
    },
    "usedProcedure": "sosa:usedProcedure",
    "madeBySensor": "sosa:madeBySensor",
    "hasFeatureOfInterest": "sosa:hasFeatureOfInterest",
    "ParameterGroup": "covjson:ParameterGroup",
    "members": {
      "@id": "covjson:member",
      "@type": "@vocab",
      "@container": "@set"
    },
    "ranges": {
      "@id": "covjson:range",
      "@type": "@id",
      "@container": "@index"
    },
    "NdArray": "covjson:NdArray",
    "TiledNdArray": "covjson:TiledNdArray",
    "shape": {
      "@id": "covjson:shape",
      "@container": "@list"
    },
    "tileShape": {
      "@id": "covjson:tileShape",
      "@container": "@list"
    },
    "axisNames": {
      "@id": "covjson:axisNames",
      "@container": "@list"
    },
    "urlTemplate": "covjson:urlTemplate",
    "tileSets": {
      "@id": "covjson:tileSet",
      "@container": "@set"
    },
    "float": "xsd:double",
    "integer": "xsd:integer",
    "string": "xsd:string",
    "Coverage": "covjson:Coverage",
    "coverages": {
      "@id": "hydra:member",
      "@container": "@set"
    },
    "CoverageCollection": "covjson:CoverageCollection",
    "Grid": "covjsondt:Grid",
    "VerticalProfile": "covjsondt:VerticalProfile",
    "MultiPointSeries": "covjsondt:MultiPointSeries",
    "MultiPoint": "covjsondt:MultiPoint",
    "PointSeries": "covjsondt:PointSeries",
    "Point": "covjsondt:Point",
    "Trajectory": "covjsondt:Trajectory",
    "Section": "covjsondt:Section",
    "MultiPolygonSeries": "covjsondt:MultiPolygonSeries",
    "MultiPolygon": "covjsondt:MultiPolygon",
    "Polygon": "covjsondt:Polygon",
    "type": "@type",
    "description": {
      "@id": "dct:description",
      "@container": "@language"
    },
    "unit": {
      "@context": {
        "label": {
          "@id": "skos:prefLabel",
          "@container": "@language"
        },
        "symbol": {
          "@context": {
            "value": "@value"
          },
          "@id": "qudt:symbol"
        }
      },
      "@id": "qudt:unit"
    },
    "observedProperty": {
      "@context": {
        "id": "@id",
        "label": {
          "@id": "skos:prefLabel",
          "@container": "@language"
        }
      },
      "@id": "sosa:observedProperty"
    },
    "categoryEncoding": "covjson:categoryEncoding",
    "skos": "http://www.w3.org/2004/02/skos/core#",
    "dct": "http://purl.org/dc/terms/",
    "qudt": "http://qudt.org/schema/qudt#",
    "covjson": "https://covjson.org/def/core#",
    "ignf": "http://data.ign.fr/def/ignf#",
    "inspiregloss": "http://inspire.ec.europa.eu/glossary/",
    "sosa": "http://www.w3.org/ns/sosa#",
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "hydra": "http://www.w3.org/ns/hydra/core#",
    "covjsondt": "https://covjson.org/def/domainTypes#",
    "ssn": "http://www.w3.org/2005/Incubator/ssn/ssnx/ssn#",
    "rel": "http://www.iana.org/assignments/relation/",
    "ebv": "https://w3id.org/ogc/hosted/ebv-phenology/",
    "@version": 1.1
  }
}
```

You can find the full JSON-LD context here:
[context.jsonld](https://ogcincubator.github.io/bblocks-ebv-bioclima/build/annotated/ebv/phenology/covjson-parameter/context.jsonld)

## Sources

* [OGC CoverageJSON 21-069r2 §8](https://docs.ogc.org/cs/21-069r2/21-069r2.html)

# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/ogcincubator/bblocks-ebv-bioclima](https://github.com/ogcincubator/bblocks-ebv-bioclima)
* Path: `_sources/covjson-parameter`

