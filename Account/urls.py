from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.showIndex, name='Index'),
    path('login', views.showLogin, name='Login'),
    path('logout', views.signOut, name='Logout'),
]
