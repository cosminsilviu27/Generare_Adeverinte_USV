from rest_framework import serializers
from .models import Faculty


class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = ['full_name', 'short_name', 'current_academic_year', 'dean_name', 'chief_secretary_name']
