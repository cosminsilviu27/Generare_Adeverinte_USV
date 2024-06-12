from django.utils import timezone

from rest_framework import serializers

from secretary_profile.serializers import SecretarySerializer
from student_profile.serializers import StudentSerializer
from .models import Certificate


class CertificateSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    processed_by = SecretarySerializer(read_only=True)
    printed_by = SecretarySerializer(read_only=True)
    def_number = serializers.SerializerMethodField()

    class Meta:  # Correctly nested Meta class
        model = Certificate
        fields = ['id', 'registration_number', 'registration_date', 'student',
                  'purpose', 'status', 'rejection_motive', 'processing_date',
                  'processed_by', 'processing_position', 'was_printed', 'printed_by', 'def_number']

    def get_def_number(self, obj):
        today = timezone.now().date()
        certificates_today = Certificate.objects.filter(processing_date=today)
        if certificates_today.exists():
            first_certificate_today = certificates_today.first()
            nr, _, _ = first_certificate_today.registration_number.partition(".")
            return nr
        return None
