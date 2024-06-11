from django.urls import path
from .views import UpdateSecretariesList, SecretaryListAPIView, SecretaryDetailView

urlpatterns = [
    path('updateSecretariesList', UpdateSecretariesList.as_view()),
    path('getSecretariesList', SecretaryListAPIView.as_view()),
    path('editSecretary/<int:secretary_id>/', SecretaryDetailView.as_view()),
]
