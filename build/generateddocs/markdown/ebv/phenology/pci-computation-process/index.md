
# PCI computation process (Schema)

`syke.ebv.phenology.pci-computation-process` *v1.0*

Semantic process block for computing the Phenological Change Indicator from SOS/VAP time-series CoverageJSON or binary grid sources.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

# PCI computation process

Semantic process block for computing the Phenological Change Indicator from SOS/VAP time-series CoverageJSON or binary grid sources.

This block makes the executable workflow visible in the Building Blocks register. The numerical or software execution remains in code, while the block records the semantic inputs, outputs, method, implementation file and ontology links.

The Python script is treated as an implementation of the semantic process, not as the semantic definition itself.

## Examples

### PCI computation process definition
examples/pci-computation-process.jsonld
#### json
```json
{
  "@context": {
    "ebv": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#",
    "prov": "http://www.w3.org/ns/prov#",
    "dct": "http://purl.org/dc/terms/"
  },
  "@id": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#pci-computation-process",
  "@type": [
    "prov:Plan",
    "ebv:IndicatorComputationProcess"
  ],
  "title": {
    "en": "PCI computation process",
    "es": "Proceso de cálculo del PCI"
  },
  "description": {
    "en": "Computes trend, anomaly, changepoint_year and changepoint_pvalue and writes one semantic CoverageJSON with a ParameterGroup.",
    "es": "Calcula trend, anomaly, changepoint_year y changepoint_pvalue y genera un único CoverageJSON semántico con un ParameterGroup."
  },
  "usesOntology": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#",
  "method": "data/methods/pci-method.jsonld",
  "input": [
    "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#vap_doy"
  ],
  "output": [
    "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#PhenologicalChangeIndicator",
    "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#phenological_trend",
    "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#phenological_anomaly",
    "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#changepoint_year",
    "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#changepoint_pvalue"
  ],
  "implementedBy": {
    "language": "python",
    "path": "scripts/compute_pci.py",
    "role": "execution engine"
  },
  "provenance": "data/provenance/pci-provenance.jsonld"
}
```

#### python
```python
#!/usr/bin/env python3
"""Compute Phenological Change Indicator (PCI) CoverageJSON files.

This script is intentionally semantic-aware: the numerical computation is done in
Python, while the indicator definition, component URIs and method metadata are
kept in `data/methods/pci-method.jsonld` and in the EBV vocabulary.

Run from the repository root:

    python scripts/compute_pci.py
"""
from __future__ import annotations
import json, math
from pathlib import Path
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
VOCAB = 'https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#'
FILL = -32768
YEARS = list(range(2001, 2019))

def read_json(p): return json.loads(Path(p).read_text(encoding='utf-8'))
def write_json(p, obj): Path(p).parent.mkdir(parents=True, exist_ok=True); Path(p).write_text(json.dumps(obj, indent=2, ensure_ascii=False), encoding='utf-8')

def load_entity(entity, summary):
    h, w = summary['height'], summary['width']
    stack=[]
    for year in YEARS:
        arr=np.fromfile(ROOT/f'viewer/data/bin/{entity}_{year}.bin', dtype=np.int16).reshape(h,w).astype(np.float32)
        arr[arr==FILL]=np.nan
        stack.append(arr)
    return np.stack(stack, axis=0)

def theil_sen(years, vals):
    ok=np.isfinite(vals); x=np.asarray(years)[ok].astype(float); y=vals[ok].astype(float)
    if len(y)<6: return np.nan
    slopes=[]
    for i in range(len(y)-1): slopes.extend(((y[i+1:]-y[i])/(x[i+1:]-x[i])).tolist())
    return float(np.median(slopes)) if slopes else np.nan

def pettitt(years, vals):
    ok=np.isfinite(vals); x=vals[ok].astype(float); yy=np.asarray(years)[ok].astype(int)
    n=len(x)
    if n<8: return np.nan, np.nan
    U=[]
    for t in range(n-1): U.append(float(np.sign(x[t+1:][None,:]-x[:t+1][:,None]).sum()))
    U=np.asarray(U); k=int(np.argmax(np.abs(U))); K=abs(U[k])
    p=min(max(2*math.exp((-6*K*K)/(n**3+n**2)),0),1)
    return float(yy[k]), float(p)

def compute(data):
    t,h,w=data.shape; years=np.asarray(YEARS,dtype=float)
    trend=np.full((h,w),np.nan,np.float32); cp_year=np.full((h,w),np.nan,np.float32); cp_p=np.full((h,w),np.nan,np.float32)
    baseline=data[:10]; recent=data[10:]
    base_count=np.sum(np.isfinite(baseline),axis=0); recent_count=np.sum(np.isfinite(recent),axis=0)
    anomaly=np.nanmean(recent,axis=0)-np.nanmean(baseline,axis=0)
    anomaly[(base_count<5)|(recent_count<4)]=np.nan
    flat=data.reshape(t,-1)
    for idx in range(flat.shape[1]):
        vals=flat[:,idx]
        if np.sum(np.isfinite(vals))>=6: trend.flat[idx]=theil_sen(years, vals)
        if np.sum(np.isfinite(vals))>=8: cp_year.flat[idx], cp_p.flat[idx]=pettitt(years, vals)
    return trend, anomaly.astype(np.float32), cp_year, cp_p

def vals(arr, integer=False):
    return [None if not np.isfinite(v) else (int(round(float(v))) if integer else round(float(v),6)) for v in arr.ravel()]

def main():
    summary=read_json(ROOT/'viewer/data/summary.json'); h,w=summary['height'],summary['width']; [[south,west],[north,east]]=summary['bounds']
    dx=(east-west)/w; dy=(north-south)/h
    x=[round(west+dx*(i+0.5),10) for i in range(w)]; y=[round(north-dy*(i+0.5),10) for i in range(h)]
    domain={'type':'Domain','domainType':'Grid','axes':{'x':{'values':x},'y':{'values':y}},'referencing':[{'coordinates':['x','y'],'system':{'type':'GeographicCRS','id':'http://www.opengis.net/def/crs/OGC/1.3/CRS84'}}]}
    method=read_json(ROOT/'data/methods/pci-method.jsonld')
    for entity in ['coniferous','deciduous']:
        trend, anomaly, cpy, cpp=compute(load_entity(entity, summary))
        cov={'type':'Coverage','domain':domain,'parameters':{},'parameterGroups':[{'type':'ParameterGroup','id':VOCAB+'PhenologicalChangeIndicator','label':{'en':'Phenological Change Indicator (PCI)'},'observedProperty':{'id':VOCAB+'PhenologicalChangeIndicator','label':{'en':'Phenological Change Indicator'}},'members':['trend','anomaly','changepoint_year','changepoint_pvalue']}],'ranges':{},'metadata':{'method':method.get('@id'),'entity':entity}}
        # Full parameter metadata is maintained in the repository examples generated by the prepared package.
        for name, arr, dtype, integer in [('trend',trend,'float',False),('anomaly',anomaly,'float',False),('changepoint_year',cpy,'integer',True),('changepoint_pvalue',cpp,'float',False)]:
            cov['parameters'][name]={'type':'Parameter','observedProperty':{'id':VOCAB+name,'label':{'en':name}}}
            cov['ranges'][name]={'type':'NdArray','dataType':dtype,'axisNames':['y','x'],'shape':[h,w],'values':vals(arr, integer)}
        write_json(ROOT/f'data/indicators/finland-pci-{entity}-2001-2018.covjson', cov)
if __name__ == '__main__': main()

```

#### jsonld
```jsonld
{
  "@context": [
    "https://maytetoscano.github.io/bioclima/build/annotated/ebv/phenology/pci-computation-process/context.jsonld",
    {
      "ebv": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#",
      "prov": "http://www.w3.org/ns/prov#",
      "dct": "http://purl.org/dc/terms/"
    }
  ],
  "@id": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#pci-computation-process",
  "@type": [
    "prov:Plan",
    "ebv:IndicatorComputationProcess"
  ],
  "title": {
    "en": "PCI computation process",
    "es": "Proceso de c\u00e1lculo del PCI"
  },
  "description": {
    "en": "Computes trend, anomaly, changepoint_year and changepoint_pvalue and writes one semantic CoverageJSON with a ParameterGroup.",
    "es": "Calcula trend, anomaly, changepoint_year y changepoint_pvalue y genera un \u00fanico CoverageJSON sem\u00e1ntico con un ParameterGroup."
  },
  "usesOntology": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#",
  "method": "data/methods/pci-method.jsonld",
  "input": [
    "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#vap_doy"
  ],
  "output": [
    "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#PhenologicalChangeIndicator",
    "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#phenological_trend",
    "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#phenological_anomaly",
    "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#changepoint_year",
    "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#changepoint_pvalue"
  ],
  "implementedBy": {
    "language": "python",
    "path": "scripts/compute_pci.py",
    "role": "execution engine"
  },
  "provenance": "data/provenance/pci-provenance.jsonld"
}
```

#### ttl
```ttl
@prefix dct: <http://purl.org/dc/terms/> .
@prefix ebv: <https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#> .
@prefix prov: <http://www.w3.org/ns/prov#> .

ebv:pci-computation-process a prov:Plan,
        ebv:IndicatorComputationProcess ;
    dct:description [ ] ;
    dct:title [ ] ;
    prov:wasGeneratedBy "data/provenance/pci-provenance.jsonld" ;
    ebv:implementedBy [ dct:format "python" ;
            dct:identifier "scripts/compute_pci.py" ;
            dct:type "execution engine" ] ;
    ebv:input "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#vap_doy" ;
    ebv:method "data/methods/pci-method.jsonld" ;
    ebv:output "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#PhenologicalChangeIndicator",
        "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#changepoint_pvalue",
        "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#changepoint_year",
        "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#phenological_anomaly",
        "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#phenological_trend" ;
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

* YAML version: [schema.yaml](https://maytetoscano.github.io/bioclima/build/annotated/ebv/phenology/pci-computation-process/schema.json)
* JSON version: [schema.json](https://maytetoscano.github.io/bioclima/build/annotated/ebv/phenology/pci-computation-process/schema.yaml)


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
[context.jsonld](https://maytetoscano.github.io/bioclima/build/annotated/ebv/phenology/pci-computation-process/context.jsonld)

## Sources

* [W3C PROV](https://www.w3.org/TR/prov-o/)
* [CoverageJSON](https://docs.ogc.org/cs/21-069r2/21-069r2.html)

# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/MayteToscano/bioclima](https://github.com/MayteToscano/bioclima)
* Path: `_sources/pci-computation-process`

