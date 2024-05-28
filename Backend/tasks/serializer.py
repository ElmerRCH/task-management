from rest_framework import serializers
from .models import Tasks

class TaskSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Tasks
        # fields = ('email','password')
        fields = '__all__'

        
    