from rest_framework import serializers

from secretary_profile.serializers import SecretarySerializer
from student_profile.serializers import StudentSerializer
from .models import Certificate


class CertificateSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    processed_by = SecretarySerializer(read_only=True)

    class Meta:  # Correctly nested Meta class
        model = Certificate
        fields = ['id', 'registration_number', 'registration_date', 'student',
                  'purpose', 'status', 'rejection_motive', 'processing_date',
                  'processed_by', 'processing_position']