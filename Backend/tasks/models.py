from django.db import models
from django.contrib.auth.models import User

class Tasks(models.Model):
    
    name = models.CharField(max_length=200)
    date_create = models.CharField(max_length=200)
    duration = models.CharField(max_length=200)
    dead_line = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    