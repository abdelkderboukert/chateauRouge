# Generated by Django 5.0.3 on 2024-05-31 15:25

import django.db.models.manager
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_datte_client'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='client',
            managers=[
                ('vers_set', django.db.models.manager.Manager()),
            ],
        ),
        migrations.RemoveField(
            model_name='client',
            name='datte',
        ),
        migrations.RemoveField(
            model_name='client',
            name='vers',
        ),
    ]
