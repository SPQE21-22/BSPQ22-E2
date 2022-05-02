#!/bin/bash
source .env
source venv/bin/activate
export FLASK_APP=src.app
flask run