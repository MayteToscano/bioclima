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
