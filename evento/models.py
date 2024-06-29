from django.db import models

class Equipo(models.Model):
    nombre = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='logos/')

    def __str__(self):
        return self.nombre

class Participante(models.Model):
    equipo = models.ForeignKey(Equipo, related_name='participantes', on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    nickname = models.CharField(max_length=100)
    discord = models.CharField(max_length=100, blank=True)
    nacionalidad = models.CharField(max_length=100, blank=True)
    edad = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.nombre
