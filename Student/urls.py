from django.contrib import admin
from django.urls import path, include
from . import views
app_name = 'Student'
urlpatterns = [
    path('', views.showMundos, name='Mundos'),
    path('Multiplicacion/', views.showEjerciciosMultiplicacion, name='Multiplicacion'),
    path('Resta/', views.showEjerciciosResta, name='Resta'),
    path('Suma/', views.showEjerciciosSuma, name='Suma'),
    path('Resta/Resultados/', views.showPantallaFinal, name='Resultados'),
    path('Suma/Resultados/', views.showPantallaFinal, name='Resultados'),
    path('Multiplicacion/Resultados/', views.showPantallaFinal, name='Resultados'),
    path('Perfil', views.showPerfil, name='Perfil'),
]
