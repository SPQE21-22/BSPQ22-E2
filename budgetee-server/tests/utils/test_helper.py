from operator import is_
from src.common.helper import camelize, is_valid_uuid, not_none

def test_camelize():
  assert camelize('camelize_this') == 'camelizeThis'
  assert camelize('camelizeThis') == 'camelizeThis'


def test_is_valid_uuid():
  assert is_valid_uuid('dfabdaf0-04f0-4b5d-b8ae-97afb7a80aa0')
  assert not is_valid_uuid('invaliduuidvalue')
  assert not is_valid_uuid('1')