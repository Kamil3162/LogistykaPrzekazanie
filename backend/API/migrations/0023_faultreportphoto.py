# Generated by Django 4.2 on 2023-05-03 09:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0022_vehiclereceivment_story'),
    ]

    operations = [
        migrations.CreateModel(
            name='FaultReportPhoto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.ImageField(upload_to='media')),
                ('receivment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.vehiclereceivment')),
            ],
        ),
    ]
