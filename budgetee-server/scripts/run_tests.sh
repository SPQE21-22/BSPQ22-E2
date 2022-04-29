#!/bin/bash
coverage run -m pytest
coverage html
coverage report