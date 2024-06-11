from django.shortcuts import render

# def login(request):
#     return render(request, 'account/login.html')

from django.shortcuts import redirect

def login(request):
    return redirect('/accounts/google/login/?process=login')
