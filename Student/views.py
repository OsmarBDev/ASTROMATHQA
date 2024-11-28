from django.shortcuts import render
from Account.decorators import role_required
from Account import models

@role_required('Estudiante')
def showMundos(request):
    return render(request,'mundos.html')

def showEjerciciosMultiplicacion(request):
    return render(request, 'ejercicio-multiplicaciones.html')

def showEjerciciosSuma(request):
    return render(request, 'ejercicio.html')

def showEjerciciosResta(request):
    return render(request, 'ejercicio-resta.html')

def showPantallaFinal(request):
    return render(request, 'final-nivel.html')

def showPerfil(request):
    usuario = request.user
    try:
        perfil = models.Profile.objects.get(user=usuario)
    except models.Profile.DoesNotExist:
        perfil = None  

   
    recompensas_usuario = models.Usuario_Recompensa.objects.filter(id_user=usuario).select_related('id_recompensa')
    recompensas = [relacion.id_recompensa for relacion in recompensas_usuario]


    cantidad_recompensas = models.Recompensa.objects.count()

    while len(recompensas) < cantidad_recompensas:
        recompensas.append(None)


    context = {
        'username': usuario.username,
        'firstname': perfil.nombre,
        'apellidoPaterno': perfil.apellidoPaterno if perfil else None,
        'apellidoMaterno': perfil.apellidoMaterno if perfil else None,
        'paralelo': perfil.paralelo if perfil else None,
        'puntaje': perfil.puntaje if perfil else None,
        'recompensas': recompensas, 
        'cantidad_recompensas': cantidad_recompensas, 
    }

    return render(request, 'perfil.html', context)
