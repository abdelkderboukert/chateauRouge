# Generated by Django 5.0.3 on 2024-05-20 22:21

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='balite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('color', models.CharField(max_length=30)),
                ('prix', models.IntegerField(default=0)),
                ('mitrage', models.IntegerField(default=0)),
                ('prix_vendre', models.IntegerField(default=0)),
                ('type', models.CharField(max_length=50)),
                ('vent', models.IntegerField(choices=[(0, 'acha'), (1, 'vent')])),
            ],
        ),
        migrations.CreateModel(
            name='datte',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prix', models.IntegerField(default=0)),
                ('time', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Camany',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('place', models.CharField(max_length=150)),
                ('re_com', models.CharField(max_length=30)),
                ('balites', models.ManyToManyField(to='api.balite')),
            ],
        ),
        migrations.AddField(
            model_name='balite',
            name='campany',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.camany'),
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('prename', models.CharField(max_length=30)),
                ('campany', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.camany')),
                ('datte', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='client_datte', to='api.datte')),
            ],
        ),
        migrations.CreateModel(
            name='Buying',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ptotal', models.IntegerField(default=0)),
                ('time', models.CharField(max_length=50)),
                ('balites', models.ManyToManyField(to='api.balite')),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.client')),
            ],
        ),
        migrations.AddField(
            model_name='balite',
            name='client',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.client'),
        ),
        migrations.CreateModel(
            name='vers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prix', models.IntegerField(default=0)),
                ('time', models.CharField(max_length=50)),
                ('client', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='vers_set', to='api.client')),
            ],
        ),
        migrations.AddField(
            model_name='client',
            name='vers',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='client_vers', to='api.vers'),
        ),
    ]
