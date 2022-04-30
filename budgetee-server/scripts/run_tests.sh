#!/bin/bash
coverage run --source=src -m pytest
coverage html
coverage report