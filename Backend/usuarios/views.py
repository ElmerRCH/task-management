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

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):

    queryset = Usuario.objects.all()
    serializer_class = UsersSerializer


@api_view(['POST'])
def verificar_email(request):
    
    exist = False if Usuario.objects.filter(email=request.data.get('email')).exists() else True
    return Response({"available":exist}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def registrar_user(request):

    if Usuario.objects.filter(email=request.data.get('email')).exists():
        return Response({"available":False}, status=status.HTTP_400_BAD_REQUEST)

    if request.data['password'] == request.data['conf_password']:
        
        user = Usuario.objects.create(
            email=request.data['email'],
            password=make_password(request.data['password']),
            )
        user.save()
        return Response('iguales')
    return Response('no  iguales')
    
@api_view(['GET'])
def log_user(request):

    return Response("eeecho")