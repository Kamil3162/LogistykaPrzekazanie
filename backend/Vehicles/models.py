import re

from django.db import models

from django.core.validators import (RegexValidator,
                                    MinValueValidator,
                                    MaxValueValidator,
                                    ValidationError)
from LogistykaFIx.backend.API.models import  AppUser
def registration_num_validator(reg_num):
    if re.match(r'([A-Z]{2,3})([0-9]{4,5})', reg_num):
        return ValidationError("Register num is not proper")


class Truck(models.Model):
    CHOICES = (
        ('Wol', 'Wolny'),
        ('Zaj', 'Zajety'),
        ('Awar', 'Awaria')
    )
    brand = models.CharField(max_length=20, blank=False)
    model = models.CharField(max_length=40, blank=False)
    power = models.IntegerField(blank=False,
                                validators=[MinValueValidator(300), MaxValueValidator(999)])
    registration_number = models.CharField(max_length=8,
                                           blank=False,
                                           validators=[registration_num_validator])
    driven_length = models.IntegerField(blank=False)
    production_date = models.DateField(blank=False)
    avaiable = models.CharField(choices=CHOICES, blank=False, max_length=4)

    def __str__(self):
        return self.registration_number

class TruckEquipment(models.Model):
    CHOICES = (
        ('Wol','Wolny'),
        ('Zaj','Zajety'),
        ('Awar','Awaria')
    )
    truck = models.ForeignKey(Truck,
                              on_delete=models.CASCADE,
                              blank=False)
    chest = models.BooleanField(default=True, blank=False)
    chains = models.BooleanField(default=True, blank=False)
    jack_hitch = models.BooleanField(default=True, blank=False)
    planetar_key = models.BooleanField(default=True, blank=False)
    manometer = models.BooleanField(default=True, blank=False)
    avaiable = models.CharField(choices=CHOICES, blank=False,max_length=4)
    tire_pumping_wire = models.BooleanField(default=True, blank=False)
    complete_status = models.BooleanField(default=True)
    def __str__(self):
        return str(self.truck)

    def status_checker(self):
        if all(self.chest, self.chains, self.jack_hitch,
               self.planetar_key, self.manometer, self.tire_pumping_wire):
            self.complete_status = True
        self.complete_status = False


class SemiTrailer(models.Model):
    brand = models.CharField(max_length=20, blank=False)
    model = models.CharField(max_length=40, blank=False)
    production_year = models.DateField()
    registration_number = models.CharField(max_length=8,
                                           blank=False,
                                           validators=[registration_num_validator], unique=True)

    semi_note = models.BooleanField(default=True, blank=False)

    def __str__(self):
        return self.registration_number

class SemiTrailerEquipment(models.Model):
    semi_trailer = models.ForeignKey(SemiTrailer,
                                     on_delete=models.CASCADE,
                                     blank=False)
    belts = models.IntegerField(default=6,
                                validators=[MinValueValidator(6),
                                            MaxValueValidator(12)])
    corners = models.IntegerField(default=8,
                                  validators=[MinValueValidator(8),
                                              MaxValueValidator(16)])
    aluminium_stick = models.IntegerField(default=12,
                                          validators=[MinValueValidator(12),
                                                      MaxValueValidator(20)])
    wide_stick = models.IntegerField(default=2,
                                     validators=[MinValueValidator(2),
                                                 MaxValueValidator(6)])
    ladder = models.BooleanField(default=True, blank=False)
    roof_stick = models.BooleanField(default=True, blank=False)
    dimenstion_board = models.BooleanField(default=True, blank=False)

    def __str__(self):
        return self.semi_trailer.id


class VehicleReceivment(models.Model):
    truck = models.ForeignKey(Truck,
                              on_delete=models.CASCADE,
                              blank=Truck)

    semi_trailer = models.ForeignKey(SemiTrailer,
                                     on_delete=models.CASCADE,
                                     blank=False)
    data_created = models.DateField(auto_created=True)
    data_ended = models.DateField()
    user = models.ForeignKey(CustomUser,
                             on_delete=models.CASCADE,
                             blank=False)

    def __str__(self):
        return self.id