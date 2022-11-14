from django.db import models

# Create your models here.

class userdaten (models.Model):
    username = models.CharField(max_length= 200)
    date_v = models.JSONField()
    date_k = models.JSONField()
    date_w = models.JSONField()