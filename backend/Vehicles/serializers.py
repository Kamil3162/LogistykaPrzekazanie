from rest_framework import serializers
from .models import (Truck,
                     TruckEquipment,
                     SemiTrailer,
                     SemiTrailerEquipment)

class TruckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Truck
        fields = '__all__'



class TruckEqupmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TruckEquipment
        fields = '__all__'

class SemiTrailerSerializer(serializers.ModelSerializer):
    class Meta:
        model = SemiTrailer
        fields = ('brand', 'model')

class SemiTrailerEquipSerializer(serializers.ModelSerializer):
    class Meta:
        model = SemiTrailerEquipment
        fields = '__all__'