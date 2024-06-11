from django.urls import path
from .views import UpdateFacultiesList, FacultyListAPIView

urlpatterns = [
    path('updateFacultiesList', UpdateFacultiesList.as_view()),
    path('getFacultiesList', FacultyListAPIView.as_view()),
]
