from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated , AllowAny
from rest_framework.views import APIView
from rest_framework.decorators import api_view,permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Tasks
from .serializer import TaskSerializer

# Create your views here.
"""class TaskListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        tasks = Task.objects.all()
        task_list = [{"id": task.id, "name": task.name} for task in tasks]
        return Response(task_list)"""
 
class TaskViewset(viewsets.ModelViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TaskSerializer
       
@api_view(['POST'])
@permission_classes([AllowAny])
def add_task(request):
   # authentication_classes = [JWTAuthentication]
    
    user = request.user
    if user.is_authenticated:
        print('Usuario autenticado:', user)
        print('Usuario id:', user.id)
        task = Tasks.objects.create(
                name = '1',
                date_create ='1',
                duration = '1',
                user = user
            )
        task.save()
    return Response('echo')