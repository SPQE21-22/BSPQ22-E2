#!/bin/bash
source .env
coverage run --source=src -m pytest
coverage html
coverage report