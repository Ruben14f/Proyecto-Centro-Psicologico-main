# Generated by Django 5.0.6 on 2024-06-22 03:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_reservahora_pagada'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reservahora',
            name='pagada',
        ),
    ]