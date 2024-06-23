# Generated by Django 5.0.6 on 2024-06-16 00:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservahora',
            name='tipo_consulta',
            field=models.IntegerField(choices=[(0, 'Terapia Individual'), (1, 'Terapia de Parejas')]),
        ),
        migrations.AlterField(
            model_name='reservahora',
            name='tipo_modalidad',
            field=models.IntegerField(choices=[(0, 'Presencial'), (1, 'Online')]),
        ),
    ]