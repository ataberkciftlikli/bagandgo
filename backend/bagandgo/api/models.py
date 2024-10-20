from django.db import models
from rest_framework.authtoken.models import Token


# Create your models here.

class AuthToken(models.Model):
    token = models.CharField(max_length=255, unique=True)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.token} - {self.user.username}"

class UserProfile(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    address = models.CharField(max_length=255)
    balance = models.FloatField(default=0)

    def __str__(self):
        return self.user.username