from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import status
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

    if not all(key in request.data.keys() for key in ['name','dateinit','duration','deadline']):
        return Response({"available": False}, status=status.HTTP_400_BAD_REQUEST)
    
    user = request.user
    if user.is_authenticated:
       
        task = Tasks.objects.create(
                name = request.data['name'],
                date_create = request.data['dateinit'],
                duration = request.data['duration'],
                dead_line = request.data['deadline'],
                user = user
            )
        task.save()
    return Response('echo')