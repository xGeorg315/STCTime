from calendar import c
from django.shortcuts import render
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

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
        
                return redirect(calendar)

        

    return render(request, 'login.html') 

@login_required
def calendar (request):


    return render(request, 'index.html')