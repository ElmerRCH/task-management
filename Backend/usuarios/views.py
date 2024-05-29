from django.shortcuts import render
# from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import login
from django.contrib.auth.hashers import check_password
from .serializer import UsersSerializer

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated , AllowAny
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView,)
from Backend.util.util_entry_data import Usuario as UsuarioData

from django.utils import timezone
from django.contrib.auth import logout
from django.middleware.csrf import get_token

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UsersSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        # Puedes añadir datos adicionales al payload del token aquí
        data.update({'email': self.user.email})
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def verificar_email(request):
    
    exist = False if User.objects.filter(email=request.data.get('email')).exists() else True
    return Response({"available":exist}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
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
                username= email,
                password = password,
            )
            user.save()
            # login(request, user)
    return Response({"registrado":True}, status=status.HTTP_200_OK)
 
@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    response = status.HTTP_400_BAD_REQUEST
    log = False
    tokens = {
        "refresh":'',
        "access" :''
    }
    if not all(key in request.data.keys() for key in ['password', 'username']):
        return Response({"available": False}, status=status.HTTP_400_BAD_REQUEST)
    # email, password  = request.data['username'],request.data['password']
    email, password = UsuarioData.decrypt([request.data['username'],request.data['password']], 'confidential1234')

    if User.objects.filter(username=email).exists():
        usuario = User.objects.get(username=email)
        if check_password(password, usuario.password): 
            log = True
            token_serializer = TokenObtainPairSerializer(data={'username':email,'password':password})
            if token_serializer.is_valid():
                tokens = token_serializer.validated_data
            response = status.HTTP_200_OK
                 
    return Response({"log":log,"access":tokens['access'],"refresh":tokens['refresh']}, status=response)
    
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

