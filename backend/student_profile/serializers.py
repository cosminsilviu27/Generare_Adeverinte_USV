from rest_framework import serializers

from faculty.serializers import FacultySerializer
from .models import StudentProfile


class StudentSerializer(serializers.ModelSerializer):
    faculty = FacultySerializer(read_only=True)

    class Meta:
        model = StudentProfile
        fields = ['id', 'email', 'study_program_name', 'study_cycle', 'study_year', 'study_domain', 'study_form', 'funding', 'full_name', 'sex', 'faculty']
