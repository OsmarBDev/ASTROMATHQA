from rest_framework import serializers
from Account import models 

class InfoEjercicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Info_Ejercicio
        fields = '__all__'
        
class InfoEjercicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Info_Ejercicio
        fields = ['estrellas', 'tiempo']
        
class EjercicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Ejercicio
        fields = '__all__'