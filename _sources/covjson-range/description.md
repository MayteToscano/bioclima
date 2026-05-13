# CovJSON Range

The data values for one parameter. Either inline (NdArray) or tiled (TiledNdArray).

## UML
```
Range
├── 1..* NdArray (inline values)
└── 0..1 TiledNdArray (tiled via URI templates)
```
