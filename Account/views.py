from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from . import models
from django.http import HttpResponse
from . import models
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models

def showIndex(request):
    return render(request, 'index.html')

def showLogin(request):
    if request.method == 'GET':
        return render(request, 'login.html')
    else:
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            try:
                extra_info = models.Profile.objects.get(user=user)
                print(extra_info.tipo)
                if(extra_info.tipo == 2):
                    return redirect("Student:Mundos")
                else:
                    login(request, user)
                    return redirect("Teacher:list")
            except:
                return render(request, 'login.html', {
                    'flag': True
                })
        else:
            return render(request, 'login.html', {
                'flag': True
            })

def signOut(request):
    logout(request)
    return redirect("Index")