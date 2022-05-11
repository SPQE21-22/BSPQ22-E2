"""! @package common"""
import re
from uuid import UUID

under_pat = re.compile(r'_([a-z])')

def camelize(name):
    """! It gets a string with _ and it converts it into camelized
    nombre_variable => nombreVariable
    @param variable string
    @return variable camelized
    """
    return under_pat.sub(lambda x: x.group(1).upper(), name)

def is_valid_uuid(value, version=4):
    """! Checks if UUID is valid
    @param UUID value
    @return True if UUID is valid
    """
    try:
        uuid = UUID(str(value), version=version)
    except ValueError:
        return False
    return str(uuid) == str(value)

def not_none(s, d):
    """! returns the not none value 
    @param s value 1
    @param d value 2
    @return not none value
    """
    if s is None:
        return d
    return s