from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

from secretary_profile.models import SecretaryProfile


@login_required
def update_profile(request):
    user = request.user
    email = user.email

    # Ensure the user's profile email is updated
    user.profile.email = email
    user.profile.save()

    return JsonResponse({'email': email})


def get_profile_name(request):
    user = request.user
    email = user.email

    secretary = SecretaryProfile.objects.filter(email=email).first()
    return JsonResponse({'name': secretary.first_name + ' ' + secretary.last_name})

