from django.urls import path
from . import views

urlpatterns = [
    path('update-profile/', views.update_profile, name='update-profile'),
    path('get-profile-name/', views.get_profile_name, name='get-profile-name'),
]
