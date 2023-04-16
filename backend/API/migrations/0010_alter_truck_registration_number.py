# Generated by Django 4.2 on 2023-04-16 18:30

import backend.API.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0009_semitrailer_truck_vehiclereceivment_truckequipment_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='truck',
            name='registration_number',
            field=models.CharField(max_length=8, unique=True, validators=[backend.API.models.registration_num_validator]),
        ),
    ]
