#!/bin/bash
source .env.dev
coverage run --source=src -m pytest
coverage html
coverage report