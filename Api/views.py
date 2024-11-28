from django.shortcuts import render
from Account import models
from . import serializers
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

class InfoEjercicioViewSet(viewsets.ModelViewSet):
    queryset = models.Info_Ejercicio.objects.all()
    serializer_class = serializers.InfoEjercicioSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        id_user = request.user.id  
        id_ejercicio = request.data.get('id_ejercicio')
        estrellas = request.data.get('estrellas', 0)
        tiempo = request.data.get('tiempo')  
        puntaje_nuevo = int(estrellas) 

        id_ejercicio = request.data.get('id_ejercicio')
        if not id_ejercicio or not tiempo:
            return Response({'error': 'Faltan campos requeridos: id_ejercicio y/o tiempo'}, status=400)

        ejercicio_instance = get_object_or_404(models.Ejercicio, id=id_ejercicio)

        instance = models.Info_Ejercicio.objects.filter(id_user=id_user, id_ejercicio=ejercicio_instance).first()

        if instance:
            instance.intentos += 1

            if puntaje_nuevo > instance.estrellas:
                incremento_puntaje = puntaje_nuevo - instance.estrellas 
                instance.estrellas = puntaje_nuevo
                instance.tiempo = tiempo 
                profile = models.Profile.objects.filter(user=request.user).first()
                if profile:
                    profile.puntaje += incremento_puntaje
                    profile.save()
                    self.desbloquear_ejercicios(profile.puntaje, id_user)
                    self.otorgar_recompensas(profile.puntaje, id_user)

                serializer = self.get_serializer(instance, data=request.data, partial=True)
                serializer.is_valid(raise_exception=True)
                serializer.save()

            elif puntaje_nuevo == instance.estrellas:
                if instance.tiempo > tiempo:
                    instance.tiempo = tiempo
                    serializer = self.get_serializer(instance, data=request.data, partial=True)
                    serializer.is_valid(raise_exception=True)
                    serializer.save()
            
            return Response(serializer.data, status=200)

        else:
            request.data['id_user'] = id_user
            request.data['intentos'] = 1
            request.data['estrellas'] = puntaje_nuevo

            profile = models.Profile.objects.filter(user=request.user).first()
            if profile:
                profile.puntaje += puntaje_nuevo
                profile.save()
                self.desbloquear_ejercicios(profile.puntaje, id_user)
                self.otorgar_recompensas(profile.puntaje, id_user)

            return super().create(request, *args, **kwargs)

    def desbloquear_ejercicios(self, puntaje, id_user):
        from django.contrib.auth.models import User
        try:
            user_instance = User.objects.get(id=id_user)
        except User.DoesNotExist:
            raise ValueError("El usuario con el ID proporcionado no existe.")

        ejercicios_desbloqueables = models.Ejercicio.objects.filter(requerimiento__lte=puntaje)

        for ejercicio in ejercicios_desbloqueables:
            existe = models.Info_Ejercicio.objects.filter(id_user=user_instance, id_ejercicio=ejercicio).exists()
            if not existe:
                models.Info_Ejercicio.objects.create(
                    id_user=user_instance,
                    id_ejercicio=ejercicio,
                    tiempo="00:00:00",
                    estrellas=0,
                    intentos=0
                )

    def otorgar_recompensas(self, puntaje, id_user):
        from django.contrib.auth.models import User
        try:
            user_instance = User.objects.get(id=id_user)
        except User.DoesNotExist:
            raise ValueError("El usuario con el ID proporcionado no existe.")

        recompensas_desbloqueables = models.Recompensa.objects.filter(requerimiento__lte=puntaje)

        for recompensa in recompensas_desbloqueables:
            existe = models.Usuario_Recompensa.objects.filter(id_user=user_instance, id_recompensa=recompensa).exists()
            if not existe:
                models.Usuario_Recompensa.objects.create(
                    id_user=user_instance,
                    id_recompensa=recompensa,
                )





class InfoEjercicioGet(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, rango):
        try:
            ejercicios = models.Ejercicio.objects.filter(id_seccion=rango)
            
            ejercicio_ids = ejercicios.values_list('id', flat=True)

            info_ejercicios = models.Info_Ejercicio.objects.filter(
                id_user=request.user,
                id_ejercicio__in=ejercicio_ids
            )

            info_dict = {
                info.id_ejercicio.id: {
                    "tiempo": info.tiempo,
                    "estrellas": info.estrellas,
                    "intentos": info.intentos
                }
                for info in info_ejercicios
            }
            data = []
            for ejercicio in ejercicios:
                ejercicio_data = serializers.EjercicioSerializer(ejercicio).data
                if ejercicio.id in info_dict:
                    ejercicio_data.update(info_dict[ejercicio.id])
                data.append(ejercicio_data)
                
            return Response({
                "total_ejercicios": ejercicios.count(),
                "data": data
            }, status=200)
        
        except models.Ejercicio.DoesNotExist:
            return Response({"error": "No se encontraron ejercicios para el rango proporcionado."}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
        
class ListadoEstudiantes(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profesor_profile = models.Profile.objects.get(user=request.user, tipo__nombreUsuario="Profesor")
        except models.Profile.DoesNotExist:
            return Response({"error": "El usuario autenticado no es un profesor o no tiene un perfil asignado."}, status=403)

        paralelo_profesor = profesor_profile.paralelo

        estudiantes = models.Profile.objects.filter(
            tipo__nombreUsuario="Estudiante",
            paralelo=paralelo_profesor
        ).values(
            "user__username",
            "nombre",
            "apellidoPaterno",
            "apellidoMaterno",
            "puntaje"
        )

        # Crear la respuesta
        data = list(estudiantes)
        return Response(data)
