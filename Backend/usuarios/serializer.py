from rest_framework import serializers
from .models import Usuario

class UsersSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Usuario
        #fields = ('email','password')
        fields = '__all__'
        
    