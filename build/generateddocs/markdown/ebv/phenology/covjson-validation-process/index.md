
# Semantic CoverageJSON validation process (Schema)

`syke.ebv.phenology.covjson-validation-process` *v1.0*

Semantic process block for validating that CoverageJSON files expose domain, parameters, ranges and observedProperty URIs.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

# Semantic CoverageJSON validation process

Semantic process block for validating that CoverageJSON files expose domain, parameters, ranges and observedProperty URIs.

This block makes the executable workflow visible in the Building Blocks register. The numerical or software execution remains in code, while the block records the semantic inputs, outputs, method, implementation file and ontology links.



## Examples

### Semantic CoverageJSON validation process definition
examples/covjson-validation-process.jsonld
#### json
```json
{
  "@context": {
    "ebv": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#",
    "prov": "http://www.w3.org/ns/prov#",
    "dct": "http://purl.org/dc/terms/"
  },
  "@id": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#covjson-validation-process",
  "@type": [
    "prov:Plan",
    "ebv:ValidationProcess"
  ],
  "title": {
    "en": "Semantic CoverageJSON validation process",
    "es": "Proceso de validación semántica de CoverageJSON"
  },
  "description": {
    "en": "Checks that each CoverageJSON parameter has a matching range and an observedProperty.id linked to the vocabulary.",
    "es": "Comprueba que cada parámetro CoverageJSON tenga un range asociado y un observedProperty.id vinculado al vocabulario."
  },
  "usesOntology": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#",
  "input": [
    "CoverageJSON files"
  ],
  "output": [
    "validation report"
  ],
  "implementedBy": {
    "language": "python",
    "path": "scripts/validate_covjson.py",
    "role": "validation helper"
  }
}
```

#### python
```python
#!/usr/bin/env python3
from __future__ import annotations
import json, sys
from pathlib import Path

def validate(path: Path):
    obj=json.loads(path.read_text(encoding='utf-8'))
    assert obj.get('type')=='Coverage', f'{path}: type must be Coverage'
    assert 'domain' in obj and 'parameters' in obj and 'ranges' in obj, f'{path}: missing domain/parameters/ranges'
    for name,param in obj['parameters'].items():
        assert name in obj['ranges'], f'{path}: parameter {name} has no range'
        assert param.get('observedProperty',{}).get('id'), f'{path}: parameter {name} has no observedProperty.id'
    print(f'OK {path}')

if __name__ == '__main__':
    files = [Path(p) for p in sys.argv[1:]] or list(Path('data').rglob('*.covjson'))
    for f in files: validate(f)

```

#### jsonld
```jsonld
{
  "@context": [
    "https://maytetoscano.github.io/bioclima/build/annotated/ebv/phenology/covjson-validation-process/context.jsonld",
    {
      "ebv": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#",
      "prov": "http://www.w3.org/ns/prov#",
      "dct": "http://purl.org/dc/terms/"
    }
  ],
  "@id": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#covjson-validation-process",
  "@type": [
    "prov:Plan",
    "ebv:ValidationProcess"
  ],
  "title": {
    "en": "Semantic CoverageJSON validation process",
    "es": "Proceso de validaci\u00f3n sem\u00e1ntica de CoverageJSON"
  },
  "description": {
    "en": "Checks that each CoverageJSON parameter has a matching range and an observedProperty.id linked to the vocabulary.",
    "es": "Comprueba que cada par\u00e1metro CoverageJSON tenga un range asociado y un observedProperty.id vinculado al vocabulario."
  },
  "usesOntology": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#",
  "input": [
    "CoverageJSON files"
  ],
  "output": [
    "validation report"
  ],
  "implementedBy": {
    "language": "python",
    "path": "scripts/validate_covjson.py",
    "role": "validation helper"
  }
}
```

#### ttl
```ttl
@prefix dct: <http://purl.org/dc/terms/> .
@prefix ebv: <https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#> .
@prefix prov: <http://www.w3.org/ns/prov#> .

ebv:covjson-validation-process a prov:Plan,
        ebv:ValidationProcess ;
    dct:description [ ] ;
    dct:title [ ] ;
    ebv:implementedBy [ dct:format "python" ;
            dct:identifier "scripts/validate_covjson.py" ;
            dct:type "validation helper" ] ;
    ebv:input "CoverageJSON files" ;
    ebv:output "validation report" ;
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

* YAML version: [schema.yaml](https://maytetoscano.github.io/bioclima/build/annotated/ebv/phenology/covjson-validation-process/schema.json)
* JSON version: [schema.json](https://maytetoscano.github.io/bioclima/build/annotated/ebv/phenology/covjson-validation-process/schema.yaml)


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
[context.jsonld](https://maytetoscano.github.io/bioclima/build/annotated/ebv/phenology/covjson-validation-process/context.jsonld)

## Sources

* [W3C PROV](https://www.w3.org/TR/prov-o/)
* [CoverageJSON](https://docs.ogc.org/cs/21-069r2/21-069r2.html)

# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/MayteToscano/bioclima](https://github.com/MayteToscano/bioclima)
* Path: `_sources/covjson-validation-process`

