from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .serializer import UsersSerializer
from .models import Usuario

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from Backend.util.util_entry_data import Usuario as UsuarioData


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):

    queryset = Usuario.objects.all()
    serializer_class = UsersSerializer


@api_view(['POST'])
def verificar_email(request):
    
    exist = False if Usuario.objects.filter(email=request.data.get('email')).exists() else True
    return Response({"available":exist}, status=status.HTTP_200_OK)

@api_view(['POST'])
def registrar_user(request):
    print('request',request.data)
    if Usuario.objects.filter(email=request.data.get('email')).exists():
        return Response({"available":False}, status=status.HTTP_400_BAD_REQUEST)

    if request.data['password'] == request.data['conf_password']:   
        data = UsuarioData(request.data['email'],request.data['password'])        
        if data.gmail_validator() and data.password_validador():
            
            user = Usuario.objects.create(
                email=request.data['email'],
                password=make_password(request.data['password']),
            )
            user.save()
    return Response({"registrado":True}, status=status.HTTP_200_OK)
    
    
@api_view(['POST'])
def login_user(request):
    
    if Usuario.objects.filter(email=request.data.get('email')).exists():
        return Response({"available":False}, status=status.HTTP_400_BAD_REQUEST)
    
  
@api_view(['GET'])
def log_user(request):
    
    data = UsuarioData('pruebas@gmail.com','Pass1do2.')
    
    return Response(data.password_validador())
