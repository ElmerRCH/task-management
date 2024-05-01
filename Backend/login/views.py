from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .serializer import ProgrammerSerializer
from .models import Usuario

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    
    queryset = Usuario.objects.all()
    serializer_class = ProgrammerSerializer

    