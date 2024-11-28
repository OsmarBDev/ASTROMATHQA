from django.contrib import admin
from . import models
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
# Register your models here.

admin.site.register(models.Profile)
admin.site.register(models.Tipo_Usuario)
admin.site.register(models.Ejercicio)
admin.site.register(models.Info_Ejercicio)
admin.site.register(models.Seccion)
admin.site.register(models.Recompensa)
admin.site.register(models.Usuario_Recompensa)

class ProfileInline(admin.StackedInline):
    model = models.Profile
    can_delete = False
    verbose_name_plural = 'Perfil'

# Define un nuevo User admin
class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline,)

    def save_model(self, request, obj, form, change):
        # Guarda el usuario normalmente
        super().save_model(request, obj, form, change)
        # Si el perfil no existe, lo creamos
        if not hasattr(obj, 'profile'):
            models.Profile.objects.create(user=obj)


class CustomUserAdmin(UserAdmin):
    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)

        # Si es un nuevo usuario y tiene un perfil asociado
        if not change:  # Si es un nuevo usuario
            if hasattr(obj, 'profile') and obj.profile.tipo_id == 1:  # Solo para estudiantes
                ejercicio = models.Ejercicio.objects.filter(id=1).first()
                if ejercicio:  # Verifica que el ejercicio exista
                    models.Info_Ejercicio.objects.get_or_create(
                        id_user=obj,  # Pasar la instancia del usuario
                        id_ejercicio=ejercicio,
                        tiempo="00:00:00",
                        estrellas=0,
                        intentos=0
                    )


# Re-registramos el modelo User con el administrador personalizado
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)