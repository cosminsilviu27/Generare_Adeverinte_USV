from django.db import models

from faculty.models import Faculty


class StudentProfile(models.Model):
    email = models.EmailField(unique=True)
    study_program_name = models.CharField(max_length=100)
    study_cycle = models.CharField(max_length=100)
    study_year = models.PositiveSmallIntegerField()
    study_domain = models.CharField(max_length=100)
    study_form = models.CharField(max_length=2, default='IF')
    funding = models.CharField(max_length=50)
    full_name = models.CharField(max_length=255)
    sex = models.CharField(max_length=1)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)

    def __str__(self):
        return self.email
