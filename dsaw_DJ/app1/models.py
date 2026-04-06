from django.db import models

class Person(models.Model):
    class Rol(models.TextChoices): ####
        TEACHER = 'Teacher'
        STUDENT = 'Student'
        ADMIN = 'Admin'
        VISITANT = 'Visitant'

    class Doc(models.TextChoices):
        NIE = 'NIE'
        DNI = 'DNI'
        PASSPORT = 'PASSPORT'

    nom = models.CharField(max_length=30) ####
    email = models.CharField(max_length=50) ####
    dataNaix = models.DateField() ####
    telefon = models.CharField(max_length=9) ####
    codiPostal = models.CharField(max_length=5) ####
    password = models.CharField(max_length=20) # NO
    createdAt = models.DateTimeField(auto_now_add=True) ###
    updatedAt = models.DateTimeField(auto_now=True)
    rol = models.CharField(max_length=30, choices=Rol.choices) ####
    document = models.CharField(max_length=15, choices=Doc.choices) ####
    numDoc = models.CharField(max_length=9)