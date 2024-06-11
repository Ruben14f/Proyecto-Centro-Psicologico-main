from django.db import models

# Create your models here.

#arreglo de opciones para tipo_consulta
opciones_consulta = [
    [0, "Terapia Individual"],
    [1, "Terapia de Parejas"]
]

#arreglo de opciones para tipo_modalidad
opciones_modalidad = [
    [0, "Presencial"],
    [1, "Online"]
]

#modelo de formulario reserva horas
class ReservaHora(models.Model):
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    correo = models.EmailField()
    correo_confirm = models.EmailField()
    telefono = models.IntegerField()
    tipo_consulta = models.IntegerField(choices=opciones_consulta)
    tipo_modalidad = models.IntegerField(choices=opciones_modalidad)
    
    def __str__(self):
        return self.nombre