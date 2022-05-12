#!/bin/bash
# source .env
# export DATABASE_URL=$DATABASE_URL
gunicorn -b 0.0.0.0:5000 --chdir ./src app:app --log-level debug