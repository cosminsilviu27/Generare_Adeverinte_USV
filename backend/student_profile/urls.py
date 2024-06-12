from django.urls import path
from .views import UpdateStudentsList, StudentListAPIView, CreateStudent, StudentDetailView, DeleteStudentView

urlpatterns = [
    path('updateStudentsList', UpdateStudentsList.as_view()),
    path('getStudentsList', StudentListAPIView.as_view()),
    path('createStudent', CreateStudent.as_view()),
    path('editStudent/<int:student_id>/', StudentDetailView.as_view()),
    path('deleteStudent/<int:student_id>/', DeleteStudentView.as_view()),
]
