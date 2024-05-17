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

    if not all(key in request.data.keys() for key in ['password', 'conf_password', 'email']):
        return Response({"available": False}, status=status.HTTP_400_BAD_REQUEST)
    

    email, password, conf_pass = UsuarioData.decrypt([request.data['email'],request.data['password'],request.data['conf_password']], 'confidential1234')
    if Usuario.objects.filter(email=request.data.get('email')).exists():
        return Response({"available":False}, status=status.HTTP_400_BAD_REQUEST)
    
    if password == conf_pass:   
        
        data = UsuarioData(email,password)        
        if data.gmail_validator() and data.password_validador():            
            user = Usuario.objects.create(
                email=request.data['email'],
                password=make_password(request.data['password']),
            )
            user.save()
    return Response({"registrado":True}, status=status.HTTP_200_OK)
    
    
@api_view(['POST'])
def login_user(request):
    
    return
    
      
@api_view(['POST'])
def desencript(request):
    
    decrypted_data = UsuarioData.decrypt(request.data['pass'], 'confidential1234')
    return Response({'echo':decrypted_data})
    