from django.db import models
from student_profile.models import StudentProfile
from secretary_profile.models import SecretaryProfile


class Certificate(models.Model):
    registration_number = models.CharField(max_length=100, null=True, blank=True)
    registration_date = models.DateField()
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE)
    purpose = models.TextField()
    status = models.CharField(max_length=100)
    rejection_motive = models.TextField(null=True, blank=True)
    processing_date = models.DateField()
    processed_by = models.ForeignKey(SecretaryProfile, on_delete=models.CASCADE, related_name='processed_certificates')
    processing_position = models.IntegerField()
    was_printed = models.BooleanField(default=False)
    printed_by = models.ForeignKey(SecretaryProfile, on_delete=models.CASCADE, null=True, blank=True, related_name='printed_certificates')

    def __str__(self):
        return self.id