from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated , AllowAny
from rest_framework.views import APIView
from rest_framework.decorators import api_view,permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication

# Create your views here.
"""class TaskListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        tasks = Task.objects.all()
        task_list = [{"id": task.id, "name": task.name} for task in tasks]
        return Response(task_list)"""
 
 
       
@api_view(['POST'])
@permission_classes([AllowAny])
def verificar_task(request):
   # authentication_classes = [JWTAuthentication]
    
    user = request.user
    print('Usuario autenticado:', user)
    print('llego.............')
    return Response('echo')
