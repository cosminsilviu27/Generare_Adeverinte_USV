from rest_framework import serializers
from .models import StudentProfile


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = ['id', 'email', 'study_program_name', 'study_cycle', 'study_year', 'study_domain', 'study_form', 'funding', 'full_name', 'sex']
