from django.db import models


class Faculty(models.Model):
    full_name = models.CharField(max_length=255)
    short_name = models.CharField(max_length=50)
    current_academic_year = models.CharField(max_length=20)
    dean_name = models.CharField(max_length=255)
    chief_secretary_name = models.CharField(max_length=255)

    def __str__(self):
        return self.short_name

    class Meta:
        verbose_name = 'Faculty'
        verbose_name_plural = 'Faculties'
