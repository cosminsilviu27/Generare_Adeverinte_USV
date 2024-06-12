from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

@login_required
def update_profile(request):
    user = request.user
    email = user.email

    # Ensure the user's profile email is updated
    user.profile.email = email
    user.profile.save()

    return JsonResponse({'email': email})
