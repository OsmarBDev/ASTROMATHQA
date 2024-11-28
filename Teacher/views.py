from django.shortcuts import render
from Account.decorators import role_required

@role_required('Profesor')
def showList(request):
    return render(request,'listado.html')