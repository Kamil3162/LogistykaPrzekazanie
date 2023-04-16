from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from . import serializers
from rest_framework import permissions, status
from .models import (
					SemiTrailer,
					Truck,
					TruckEquipment,
					SemiTrailerEquipment)
from rest_framework.decorators import api_view

'''
	Login part - 
'''
class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = request.data
		serializer = serializers.UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			user.set_password(request.data.get('password'))
			user.save()
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		serializer = serializers.UserLoginSerializer(data=data)
		if serializer.is_valid():
			user = serializer.check_user(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		serializer = serializers.UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)
"""
	Vehickles part -- 
"""
class TruckView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)

	def get(self, request):
		queryset = Truck.objects.all()
		serializer = serializers.TruckSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)



class TruckDetail(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)

	def get(self, request, pk):
		try:
			queryset = Truck.objects.get(pk=pk)
		except Truck.DoesNotExist:
			return Response({'error': 'Truck not found'}, status=status.HTTP_404_NOT_FOUND)
		serializer = serializers.TruckSerializer(queryset)
		return Response(serializer.data)

class TruckAdd(APIView):
	"""
	Musimy miec serializeer zeby pobierac dane w formacie json/jscript i nastepnie utworzyc dany obiekt
	Bazujac na model musimy utworzyc serializer
	"""
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)

	def post(self, request):
		truck_data = request.data
		serializer = serializers.TruckSerializerAdd(data=truck_data)
		if serializer.is_valid():
			truck = serializer.create(truck_data)
			truck.save()		# save to db
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TruckDelete(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)

	def get(self, request, pk):
		user = request.user
		if user.is_staff and user.is_superuser and user.is_admin:
			try:
				truck = Truck.objects.get(pk=pk)
				serializer = serializers.TruckSerializer()
			except Truck.DoesNotExist:
				return Response({'error': 'Truck not exist'}, status=status.HTTP_404_NOT_FOUND)
			serializer.__delete__(truck)
			return Response(status=status.HTTP_204_NO_CONTENT)


class SamiTrucksView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)

	def get(self, request):
		try:
			print(request.user.is_staff and request.user.is_superuser)
			queryset = SemiTrailer.objects.all()
			serializer = serializers.SemiTrailerSerializer(queryset, many=True)
			return Response(serializer.data, status=status.HTTP_200_OK)
		except TypeError:
			return Response(status=status.HTTP_404_NOT_FOUND)

class SamiTrucksAdd(APIView):
	pass


class TruckEquimpmentView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)

	def get(self, request):
		try:
			print("Truck Equip")
			queryset = TruckEquipment.objects.all()
			serializer = serializers.TruckEqupmentSerializer(queryset, many=True)
			return Response(serializer.data, status=status.HTTP_200_OK)
		except TypeError:
			return Response(status=status.HTTP_404_NOT_FOUND)


class SamiTruckEquipment(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)

	def get(self, request):
		try:
			print("SamiTruck Equip")
			queryset = SemiTrailerEquipment.objects.all()
			serializer = serializers.SemiTrailerEquipSerializer(queryset, many=True)
			return Response(serializer.data, status=status.HTTP_200_OK)
		except TypeError:
			return Response(status=status.HTTP_404_NOT_FOUND)


