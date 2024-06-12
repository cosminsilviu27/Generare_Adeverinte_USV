from rest_framework import serializers

from secretary_profile.serializers import SecretarySerializer
from .models import Faculty


class FacultySerializer(serializers.ModelSerializer):
    chief_secretary = SecretarySerializer(read_only=True)

    class Meta:
        model = Faculty
        fields = ['full_name', 'short_name', 'current_academic_year', 'dean_name', 'chief_secretary']
