from django.urls import path
from .views import GetAdminProfileView, UpdateAdminProfileView

urlpatterns = [
    path('user', GetAdminProfileView.as_view()),
    path('update', UpdateAdminProfileView.as_view()),
]
