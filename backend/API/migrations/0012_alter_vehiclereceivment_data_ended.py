# Generated by Django 4.2 on 2023-04-19 19:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0011_alter_vehiclereceivment_data_ended'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vehiclereceivment',
            name='data_ended',
            field=models.DateField(blank=True, null=True),
        ),
    ]
