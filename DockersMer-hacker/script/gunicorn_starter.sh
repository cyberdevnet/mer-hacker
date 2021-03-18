#!/bin/sh
gunicorn --chdir flask wsgi:app -w 4 --threads 4 --timeout 240 --log-level=debug -b 0.0.0.0:5000