from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated # , AllowAny
# from rest_framework.views import APIView
from rest_framework.decorators import api_view,permission_classes
# from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Tasks
from .serializer import TaskSerializer

# Create your views here.
class TaskViewset(viewsets.ModelViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TaskSerializer
    
    def get_queryset(self):
        user = self.request.user
        return Tasks.objects.filter(user=user)
    
               
@api_view(['POST'])
@permission_classes([IsAuthenticated])
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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def verific_exist(request):
    if not all(key in request.data.keys() for key in ['id']):
        return Response({"available": False}, status=status.HTTP_400_BAD_REQUEST)
    data = {
        'name':'',
        'dateInit':'',
        'duration':'',
        'deadLine':''
                
    }
    tasks = Tasks.objects.filter(id=request.data['id'])
    serializer = TaskSerializer(tasks, many=True)

    if serializer.data:
        task_data = serializer.data[0]
        
        data['name'] = task_data.get('name')
        data['dateInit'] = task_data.get('date_create')
        data['duration'] = task_data.get('duration')
        data['deadLine'] = task_data.get('dead_line')
        
    return Response(data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def edit_task(request):
    if not all(key in request.data.keys() for key in ['name','dateinit','duration','deadline']):
        return Response({"available": False}, status=status.HTTP_400_BAD_REQUEST)
    
    task_id = request.data['id']
    
    try:
        task = Tasks.objects.get(id=task_id)
    except Tasks.DoesNotExist:
        return Response({"available": False, "detail": "Task not found."}, status=status.HTTP_404_NOT_FOUND)

    task.name = request.data['name']
    task.date_create = request.data['dateinit']
    task.duration = request.data['duration']
    task.dead_line = request.data['deadline']
    
    task.save()
    return Response('echo')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_task(request):
    if not all(key in request.data.keys() for key in ['name','dateinit','duration','deadline']):
        return Response({"available": False}, status=status.HTTP_400_BAD_REQUEST)
    
    task_id = request.data['id']
    
    try:
        task = Tasks.objects.get(id=task_id)
    except Tasks.DoesNotExist:
        return Response({"available": False, "detail": "Task not found."}, status=status.HTTP_404_NOT_FOUND)

    task.delete()
    return Response('echo')


