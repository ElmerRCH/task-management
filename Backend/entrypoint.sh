#!/bin/sh

# Ejecutar migraciones
echo "Applying database migrations........."
python manage.py migrate

# Iniciar Gunicorn
echo "Starting Gunicorn server..."
exec gunicorn Backend.wsgi:application --bind 0.0.0.0:8000