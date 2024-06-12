from django.shortcuts import render

# def login(request):
#     return render(request, 'account/login.html')

from django.shortcuts import redirect

def login(request):
    return redirect('/accounts/google/login/?process=login')

# from django.shortcuts import render, redirect
# from django.contrib.auth import login
# from django.contrib.auth.models import User
# from django.contrib import messages
# from secretary_profile.models import SecretaryProfile

# def oauth_callback(request):
#     # This example assumes you retrieve the email from the OAuth response.
#     user_email = request.GET.get('email')

#     if SecretaryProfile.objects.filter(email=user_email).exists():
#         # The user is a secretary, proceed with the login
#         try:
#             user = User.objects.get(email=user_email)
#             login(request, user)
#             return redirect('secretary_page')
#         except User.DoesNotExist:
#             messages.error(request, 'User does not exist.')
#             return redirect('secretary')
#     else:
#         # The user is not a secretary
#         messages.error(request, 'Unable to login as secretary because the account is not correct.')
#         return redirect('secretary')
