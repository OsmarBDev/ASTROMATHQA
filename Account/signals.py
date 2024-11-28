from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Info_Ejercicio, Ejercicio, Profile
from django.core.exceptions import ObjectDoesNotExist

@receiver(post_save, sender=User)
def create_default_info_ejercicio(sender, instance, created, **kwargs):
    if created and hasattr(instance, 'profile') and instance.profile.tipo_id == 1:
        try:
            ejercicio = Ejercicio.objects.get(id=1)
            Info_Ejercicio.objects.get_or_create(
                id_user=instance,
                id_ejercicio=ejercicio,
                defaults={
                    'tiempo': "00:00:00",
                    'estrellas': 0,
                    'intentos': 0,
                }
            )
        except Ejercicio.DoesNotExist:
            print("Error: El ejercicio con ID=1 no existe.")
