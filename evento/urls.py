from django.urls import path
from . import views

urlpatterns = [
   path('', views.equipo_create, name='equipo_create'),
   path('bienvenido/', views.bienvenido, name='bienvenido'),
   path('registrar_equipo/', views.equipo_create, name='equipo_create'),
    # Añade más rutas aquí según sea necesario
]
