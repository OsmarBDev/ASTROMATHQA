from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Tipo_Usuario(models.Model):
    nombreUsuario = models.CharField(max_length=50)
    def __str__(self):
        return f'{self.nombreUsuario}'
    class Meta:
        verbose_name = "Tipo de Usuario"
        verbose_name_plural = "Tipos de Usuarios"
    
class Seccion(models.Model):
    nombreSeccion = models.CharField(max_length=100)
    class Meta:
        verbose_name = "Seccion"
        verbose_name_plural = "Seciones"
    def __str__(self):
        return f'{self.id} y {self.nombreSeccion}'

class Ejercicio(models.Model):
    id_seccion = models.ForeignKey(Seccion, on_delete=models.CASCADE)
    dificultad = models.IntegerField()
    requerimiento = models.IntegerField(null=False)
    class Meta:
        verbose_name = "Ejercicio"
        verbose_name_plural = "Ejercicios"
    def __str__(self):
        return f'{self.id} de {self.id_seccion.nombreSeccion}'
        
class Recompensa(models.Model):
    nombre = models.CharField(max_length=50, null=False)
    requerimiento = models.IntegerField(null=False)
    imagen = models.CharField(max_length=200)
    class Meta:
        verbose_name = "Recompesa"
        verbose_name_plural = "Recompesas"
    
    
class Usuario_Recompensa(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_recompensa = models.ForeignKey(Recompensa, on_delete=models.CASCADE)
    class Meta:
        unique_together = ('id_user', 'id_recompensa')
    class Meta:
        verbose_name = "Recompensa de Usuario"
        verbose_name_plural = "Recompensas de Usuario"
    
class Info_Ejercicio(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_ejercicio = models.ForeignKey(Ejercicio, on_delete=models.CASCADE)
    intentos = models.IntegerField(default=0)
    estrellas = models.IntegerField()
    tiempo = models.TimeField()
    class Meta:
        unique_together = ('id_user', 'id_ejercicio')
        verbose_name = "Informacion Ejecicio"
        verbose_name_plural = "Informaciones de los EJercicios"
    def __str__(self):
        return f'{self.id_ejercicio} y {self.id_user}'

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False)
    nombre = models.CharField(max_length=50, null=False)
    apellidoPaterno = models.CharField(max_length=100, null=False)
    apellidoMaterno = models.CharField(max_length=100, null=False)
    paralelo = models.CharField(max_length=10)
    puntaje = models.IntegerField(null=True, blank=True, default=0)
    tipo = models.ForeignKey(Tipo_Usuario, on_delete=models.CASCADE)
    def __str__(self):
        return f'Perfil de {self.user.username}'
    class Meta:
        verbose_name = "Perfil de Usuario"
        verbose_name_plural = "Perfiles de Usuario"
    