from rest_framework import serializers
from .models import SecretaryProfile


class SecretarySerializer(serializers.ModelSerializer):
    class Meta:
        model = SecretaryProfile
        fields = ['id', 'first_name', 'last_name', 'title', 'email']
