
# Bioclimatic zone CoverageJSON generation process (Schema)

`syke.ebv.phenology.bioclimatic-zone-generation-process` *v1.0*

Semantic process block for generating or replacing the categorical CoverageJSON of Finland bioclimatic zones.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

# Bioclimatic zone CoverageJSON generation process

Semantic process block for generating or replacing the categorical CoverageJSON of Finland bioclimatic zones.

This block makes the executable workflow visible in the Building Blocks register. The numerical or software execution remains in code, while the block records the semantic inputs, outputs, method, implementation file and ontology links.



## Examples

### Bioclimatic zone CoverageJSON generation process definition
examples/bioclimatic-zone-generation-process.jsonld
#### json
```json
{
  "@context": {
    "ebv": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#",
    "prov": "http://www.w3.org/ns/prov#",
    "dct": "http://purl.org/dc/terms/"
  },
  "@id": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#bioclimatic-zone-generation-process",
  "@type": [
    "prov:Plan",
    "ebv:CoverageGenerationProcess"
  ],
  "title": {
    "en": "Bioclimatic zone CoverageJSON generation process",
    "es": "Proceso de generación de CoverageJSON de zonas bioclimáticas"
  },
  "description": {
    "en": "Produces a categorical CoverageJSON aligned to the map grid. The bundled layer is a demonstrator and can be replaced by an authoritative zonation source.",
    "es": "Produce un CoverageJSON categórico alineado con la malla del mapa. La capa incluida es demostrativa y puede sustituirse por una zonificación oficial."
  },
  "usesOntology": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#",
  "input": [
    "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#bioclimatic_zone"
  ],
  "output": [
    "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#bioclimatic_zone"
  ],
  "implementedBy": {
    "language": "python",
    "path": "scripts/generate_bioclimatic_zones.py",
    "role": "generation or replacement helper"
  }
}
```

#### python
```python
#!/usr/bin/env python3
"""Generate the bundled demonstration categorical bioclimatic-zone CoverageJSON."""
print('This repository already includes data/categorical/finland-bioclimatic-zones.covjson. Replace this demonstration generator with an official zonation layer when available.')

```

#### jsonld
```jsonld
{
  "@context": [
    "https://maytetoscano.github.io/bioclima/build/annotated/ebv/phenology/bioclimatic-zone-generation-process/context.jsonld",
    {
      "ebv": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#",
      "prov": "http://www.w3.org/ns/prov#",
      "dct": "http://purl.org/dc/terms/"
    }
  ],
  "@id": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#bioclimatic-zone-generation-process",
  "@type": [
    "prov:Plan",
    "ebv:CoverageGenerationProcess"
  ],
  "title": {
    "en": "Bioclimatic zone CoverageJSON generation process",
    "es": "Proceso de generaci\u00f3n de CoverageJSON de zonas bioclim\u00e1ticas"
  },
  "description": {
    "en": "Produces a categorical CoverageJSON aligned to the map grid. The bundled layer is a demonstrator and can be replaced by an authoritative zonation source.",
    "es": "Produce un CoverageJSON categ\u00f3rico alineado con la malla del mapa. La capa incluida es demostrativa y puede sustituirse por una zonificaci\u00f3n oficial."
  },
  "usesOntology": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#",
  "input": [
    "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#bioclimatic_zone"
  ],
  "output": [
    "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#bioclimatic_zone"
  ],
  "implementedBy": {
    "language": "python",
    "path": "scripts/generate_bioclimatic_zones.py",
    "role": "generation or replacement helper"
  }
}
```

#### ttl
```ttl
@prefix dct: <http://purl.org/dc/terms/> .
@prefix ebv: <https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#> .
@prefix prov: <http://www.w3.org/ns/prov#> .

ebv:bioclimatic-zone-generation-process a prov:Plan,
        ebv:CoverageGenerationProcess ;
    dct:description [ ] ;
    dct:title [ ] ;
    ebv:implementedBy [ dct:format "python" ;
            dct:identifier "scripts/generate_bioclimatic_zones.py" ;
            dct:type "generation or replacement helper" ] ;
    ebv:input "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#bioclimatic_zone" ;
    ebv:output "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#bioclimatic_zone" ;
    ebv:usesOntology "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#" .


```

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: Semantic process or software component definition encoded as JSON-LD.
type: object
required:
- '@context'
- '@id'
- '@type'
- title
- implementedBy
properties:
  '@context': {}
  '@id':
    type: string
  '@type': {}
  title:
    x-jsonld-id: http://purl.org/dc/terms/title
  description:
    x-jsonld-id: http://purl.org/dc/terms/description
  usesOntology:
    type: string
    x-jsonld-id: https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#usesOntology
  input:
    type: array
    x-jsonld-id: https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#input
  output:
    type: array
    x-jsonld-id: https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#output
  implementedBy:
    type: object
    required:
    - language
    - path
    properties:
      language:
        type: string
        x-jsonld-id: http://purl.org/dc/terms/format
      path:
        type: string
        x-jsonld-id: http://purl.org/dc/terms/identifier
      role:
        type: string
        x-jsonld-id: http://purl.org/dc/terms/type
    x-jsonld-id: https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#implementedBy
  method:
    type: string
    x-jsonld-id: https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#method
  provenance:
    type: string
    x-jsonld-id: http://www.w3.org/ns/prov#wasGeneratedBy
additionalProperties: true
x-jsonld-prefixes:
  dct: http://purl.org/dc/terms/
  ebv: https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#
  prov: http://www.w3.org/ns/prov#

```

Links to the schema:

* YAML version: [schema.yaml](https://maytetoscano.github.io/bioclima/build/annotated/ebv/phenology/bioclimatic-zone-generation-process/schema.json)
* JSON version: [schema.json](https://maytetoscano.github.io/bioclima/build/annotated/ebv/phenology/bioclimatic-zone-generation-process/schema.yaml)


# JSON-LD Context

```jsonld
{
  "@context": {
    "title": "dct:title",
    "description": "dct:description",
    "usesOntology": "ebv:usesOntology",
    "input": "ebv:input",
    "output": "ebv:output",
    "implementedBy": {
      "@context": {
        "language": "dct:format",
        "path": "dct:identifier",
        "role": "dct:type"
      },
      "@id": "ebv:implementedBy"
    },
    "method": "ebv:method",
    "provenance": "prov:wasGeneratedBy",
    "dct": "http://purl.org/dc/terms/",
    "ebv": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#",
    "prov": "http://www.w3.org/ns/prov#",
    "@version": 1.1
  }
}
```

You can find the full JSON-LD context here:
[context.jsonld](https://maytetoscano.github.io/bioclima/build/annotated/ebv/phenology/bioclimatic-zone-generation-process/context.jsonld)

## Sources

* [W3C PROV](https://www.w3.org/TR/prov-o/)
* [CoverageJSON](https://docs.ogc.org/cs/21-069r2/21-069r2.html)

# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/MayteToscano/bioclima](https://github.com/MayteToscano/bioclima)
* Path: `_sources/bioclimatic-zone-generation-process`

