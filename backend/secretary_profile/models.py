from django.db import models


class SecretaryProfile(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    title = models.CharField(max_length=50)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.email
