from rest_framework import serializers
from .models import Usuario

class ProgrammerSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Usuario
        #fields = ('name')
        fields = '__all__'
        
   