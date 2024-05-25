from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import login
from django.contrib.auth.hashers import check_password,make_password
from werkzeug.security import generate_password_hash, check_password_hash
from .serializer import UsersSerializer

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from Backend.util.util_entry_data import Usuario as UsuarioData

from django.utils import timezone
from django.contrib.auth import logout
from django.middleware.csrf import get_token

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UsersSerializer


@api_view(['POST'])
def verificar_email(request):
    
    exist = False if User.objects.filter(email=request.data.get('email')).exists() else True
    return Response({"available":exist}, status=status.HTTP_200_OK)

@api_view(['POST'])
def registrar_user(request):

    if not all(key in request.data.keys() for key in ['password', 'conf_password', 'email']):
        return Response({"available": False}, status=status.HTTP_400_BAD_REQUEST)
    
    email, password, conf_pass = UsuarioData.decrypt([request.data['email'],request.data['password'],request.data['conf_password']], 'confidential1234')
    if User.objects.filter(email=email).exists():
        return Response({"available":False}, status=status.HTTP_400_BAD_REQUEST)
    
    if password == conf_pass:   

        data = UsuarioData(email,password)        
        if data.gmail_validator() and data.password_validador():                        
            user = User.objects.create_user(
                'pruebas',
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
    if User.objects.filter(email=email).exists():
        usuario = User.objects.get(email=email)
        if check_password(password, usuario.password): 

            log = True
            response = status.HTTP_200_OK
            print('login:',login(request, usuario) )
                 
    return Response({"log":log}, status=response)
    
def set_session_data(request):
    request.session['favorite_color'] = 'blue'
    request.session['last_visit'] = str(timezone.now())
    
    return Response('ECHO')

@api_view(['POST'])
def get_session_data(request):
    favorite_color = request.session.get('favorite_color', 'unknown')
    last_visit = request.session.get('last_visit', 'never')
    context = {
        'favorite_color': favorite_color,
        'last_visit': last_visit,
    }
    return Response('ECHO')


def logout_view(request):
    logout(request)
    return Response('ECHO') 

@api_view(['POST'])
def desencript(request):
    match = check_password('Fortnite125.', "pbkdf2_sha256$720000$Ji5KQl8ur7VkMmwxIex1rG$GgE+GvlC5TAtpkSoBWvF6bRVHSEFPqG2mFZa/XRDlOc=")
    
    return Response(match)

# scrypt:32768:8:1$D2zV7k9lcOYwyxKu$d2eba19d77e572d0435195a45099a241ee2f115a03df6d74c553cb3a17b9843c5ff772d01d7e68ab5d6a1f3a38a7b8aa421d976301a6ecf380642a844fcd818c
@api_view(['POST'])
def generate_csrf_token(request):
    # Obtener el token CSRF
    csrf_token = get_token(request)
    # Devolver el token CSRF en una respuesta JSON
    return Response({'csrf_token': csrf_token})