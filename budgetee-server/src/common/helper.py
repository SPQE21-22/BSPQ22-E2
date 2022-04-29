import re
from uuid import UUID

under_pat = re.compile(r'_([a-z])')

def camelize(name):
    return under_pat.sub(lambda x: x.group(1).upper(), name)

def is_valid_uuid(value, version=4):
    try:
        uuid = UUID(str(value), version=version)
    except ValueError:
        return False
    return str(uuid) == str(value)

def not_none(s, d):
    if s is None:
        return d
    return s