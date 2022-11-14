from calendar import c
from django.shortcuts import render
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from .models import userdaten


# Create your views here.



@csrf_exempt
def LoginSite(request):
 
    if request.user.is_authenticated:

        return redirect(calendar)  
    

    else:    

        if request.method == 'POST':

            username = request.POST['username']
            password = request.POST['password']
            #create_user = User.objects.create_user(username= username, password= password)
            user = authenticate(request, username=username, password=password)
            
            if user is not None:

                login(request, user) 
        
                return redirect('calendar')

    return render(request, 'login.html')


@csrf_exempt
@login_required(login_url='http://127.0.0.1:8000/login')
def calendar (request):

    if request.method == 'POST':
        if request.POST['type'] == 'logout':
            logout(request)
        elif request.POST['type'] == 'vacation':
            userdaten.objects.create(username = request.user, date_v = request.POST['data'], date_w = '', date_k = '')
            print('1')

        elif request.POST['type'] == 'krank':
            print('krank')
        elif request.POST['type'] == 'work':
            print('work')
        else:
            print('komisch')


    if request.user.groups.filter(name='Supervisor').exists():  
        User = get_user_model()
        User_all = User.objects.filter(groups__name='Employees')
        id = 1

    elif request.user.groups.filter(name='HR').exists():  
        User = get_user_model()
        User_Employees = User.objects.filter(groups__name='Employees')
        User_Supervisor = User.objects.filter(groups__name='Supervisor')
        User_all= User_Employees | User_Supervisor
        id = 2
  
    else:
        User_all= ''
        id = 0

    return render(request, 'index.html', {'Users': User_all , 'id':id})


def logout_user(request):
    
    return render(request,'logout.html')
