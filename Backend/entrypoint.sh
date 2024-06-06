#!/bin/sh

# Ejecutar migraciones
python manage.py migrate

# Iniciar Gunicorn
exec gunicorn Backend.wsgi:application --bind 0.0.0.0:8000