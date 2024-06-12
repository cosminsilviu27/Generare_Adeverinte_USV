from django.db import models

from secretary_profile.models import SecretaryProfile


class Faculty(models.Model):
    full_name = models.CharField(max_length=255)
    short_name = models.CharField(max_length=50)
    current_academic_year = models.CharField(max_length=20)
    dean_name = models.CharField(max_length=255)
    chief_secretary = models.ForeignKey(SecretaryProfile, on_delete=models.CASCADE)

    def __str__(self):
        return self.short_name

    class Meta:
        verbose_name = 'Faculty'
        verbose_name_plural = 'Faculties'
