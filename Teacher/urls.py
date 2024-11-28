from django.shortcuts import render
from django.urls import path, include
from . import views

app_name = 'Teacher'
urlpatterns = [
    path('', views.showList, name='list'),
]