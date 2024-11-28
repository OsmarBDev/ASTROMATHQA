from django.urls import path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r"addInfo", views.InfoEjercicioViewSet, 'task')

urlpatterns = [
    path('getInfo/<int:rango>/', views.InfoEjercicioGet.as_view(), name='get_info'),
     path('getInfoEstudiantes/', views.ListadoEstudiantes.as_view(), name='estudiantes_por_profesor'),
]

urlpatterns += router.urls
