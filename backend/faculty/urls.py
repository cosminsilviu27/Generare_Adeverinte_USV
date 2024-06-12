from django.urls import path
from .views import UpdateFacultiesList, FacultyListAPIView, EditFacultyDetailView

urlpatterns = [
    path('updateFacultiesList', UpdateFacultiesList.as_view()),
    path('getFacultiesList', FacultyListAPIView.as_view()),
    path('editFaculty/<int:faculty_id>/', EditFacultyDetailView.as_view())
]
