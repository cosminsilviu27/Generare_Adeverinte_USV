from django.urls import path
from .views import GetAdminProfileView, UpdateAdminProfileView, ResetApplication

urlpatterns = [
    path('user', GetAdminProfileView.as_view()),
    path('update', UpdateAdminProfileView.as_view()),
    path('resetApplication', ResetApplication.as_view()),
]
