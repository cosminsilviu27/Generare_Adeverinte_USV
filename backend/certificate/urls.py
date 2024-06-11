from django.urls import path
from .views import get_google_sheets_data

urlpatterns = [
    path('getCertificatesList', get_google_sheets_data.as_view()),
]