from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
# from django.contrib.auth.hashers import make_password,check_password
from werkzeug.security import generate_password_hash, check_password_hash
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
    if Usuario.objects.filter(email=email).exists():
        return Response({"available":False}, status=status.HTTP_400_BAD_REQUEST)
    
    if password == conf_pass:   

        password = generate_password_hash(password)
        data = UsuarioData(email,password)        
        if data.gmail_validator() and data.password_validador():            
            user = Usuario.objects.create(
                email= email,
                password = password,
            )
            user.save()
    return Response({"registrado":True}, status=status.HTTP_200_OK)
    
    
@api_view(['POST'])
def login_user(request):
    response = status.HTTP_400_BAD_REQUEST
    log = False
    if not all(key in request.data.keys() for key in ['password', 'email']):
        return Response({"available": False}, status=status.HTTP_400_BAD_REQUEST)

    email, password = UsuarioData.decrypt([request.data['email'],request.data['password']], 'confidential1234')

    if Usuario.objects.filter(email=email).exists():
        usuario = Usuario.objects.get(email=email)
            
        if check_password_hash(usuario.password,password): 
            log = True
            response = status.HTTP_200_OK
            
    return Response({"log":log}, status=response)
    
    
      
@api_view(['POST'])
def desencript(request):
    
    return Response(check_password_hash('scrypt:32768:8:1$D2zV7k9lcOYwyxKu$d2eba19d77e572d0435195a45099a241ee2f115a03df6d74c553cb3a17b9843c5ff772d01d7e68ab5d6a1f3a38a7b8aa421d976301a6ecf380642a844fcd818c','Fortnite125.'))
    
    