from rest_framework import serializers
from .models import Tasks

class TaskSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Tasks
        fields = ('id','name','date_create','duration','dead_line')
        # fields = '__all__'

        
    