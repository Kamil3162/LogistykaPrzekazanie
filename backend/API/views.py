import random
from django.contrib.auth import login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from django.db import IntegrityError
from . import serializers
from rest_framework import permissions, status
from .models import (
					SemiTrailer,
					Truck,
					TruckEquipment,
					SemiTrailerEquipment,
					VehicleReceivment,
					TruckComplainPhoto,
					SemiTrailerComplainPhoto,
					AppUser,
					FaultReportPhoto)
import datetime
from django.contrib.auth import get_user_model
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
		print(request.data)
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)

	def get(self, request):
		serializer = serializers.UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)

class UsersView(APIView):
	permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser)
	authentication_classes = (SessionAuthentication,)

	def get(self, request):
		queryset = AppUser.objects.all()
		serializer = serializers.UserSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)


class UserDelete(APIView):
	permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser)
	authentication_classes = (SessionAuthentication,)

	def post(self, request, pk):
		print(request)
		try:
			user = AppUser.objects.get(pk=pk)
			user.delete()
			return Response(status=status.HTTP_200_OK)
		except user.DoesNotExist:
			return Response(status=status.HTTP_404_NOT_FOUND)
		except Exception as e:
			return Response({"error":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)

	def post(self, request):
		"""
			First we need to parse data to serializer
			Next check those this object exists in our db
			If exist return status 40.
			If not return status 201 or 200
		"""
		try:
			information = request.data
			serializer = serializers.SemiTrailerSerializer(data=information)
			if serializer.is_valid():
				serializer.save()
				return Response(serializer.data, status=status.HTTP_201_CREATED)
			else:
				return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
		except Exception as e:
			return Response({"error":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class SamiTrucksDetailView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)

	def get(self, request, pk):
		try:
			queryset = SemiTrailer.objects.get(pk=pk)
			serializer = serializers.SemiTrailerSerializer(queryset)
			return Response(serializer.data, status=status.HTTP_200_OK)
		except queryset.DoesNotExist:
			return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

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

class VehicleReceivments(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)

	def get(self, request):
		queryset = VehicleReceivment.objects.filter(
			user=request.user, data_ended=None)
		serializer = serializers.VehicleReceivmentSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

	def post(self, request):
		"""
			I think that kierownik will be choose automatticly - totaly
			if user have permissions staff etc - director and he can make action
			Brac lastlogin kiedy natapic np w tym dniu to znaczy ze jest w pracy

			-----------------------
			I have to add auto assigment according to truck
		"""
		information = request.data
		print(information.get('truck'))
		print(information.get('semi_trailer'))
		try:
			directors = AppUser.active_users.today_active_directors()
			director = random.choice(directors)
			trucks_num = list(Truck.objects.filter(avaiable="Woln"))
			truck_num = random.choice(trucks_num)
			semi_trailer = get_object_or_404(
				SemiTrailer, registration_number=information.get('semi_trailer'))
			date_today = str(datetime.datetime.today()).split(" ")[0]
			if information.get('truck') is True:
				information['truck'] = truck_num.pk
			else:
				information['truck'] = None
			information['data_created'] = date_today
			information['user'] = request.user.pk
			information['sender'] = director.pk
			information['semi_trailer'] = semi_trailer.pk
			serializer = serializers.VehicleReceivmentSerializer(data=information)
			if serializer.is_valid():
				if information['truck'] is None:
					information['truck'] = None
				else:
					information['truck'] = truck_num
				information['semi_trailer'] = semi_trailer
				information['user'] = request.user
				information['sender'] = director
				try:
					receivment = serializer.create(information)
					receivment.save()
					return Response(serializer.data, status=status.HTTP_201_CREATED)
				except IntegrityError as e:
					return Response({"error":"Something bad with data or duplication"}, status=status.HTTP_409_CONFLICT)
			return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		except Exception as e:
			return Response({"error":str(e)}, status=status.HTTP_424_FAILED_DEPENDENCY)

class VehicleStatement(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)

	def get(self, request):
		return Response(status=status.HTTP_200_OK)

	def post(self, request):
		user = request.user
		information = request.data
		try:
			date_today = str(datetime.datetime.today()).split(" ")[0]
			directors = AppUser.active_users.today_active_directors()
			print(directors)
			director = random.choice(directors)
			receivment_back = VehicleReceivment.objects.get(
				user=user,
				data_ended=None
			)
			print('esa')
			receivment_back.data_ended = datetime.datetime.now()
			receivment_back.save()
			truck = receivment_back.truck
			semi_trailer = receivment_back.semi_trailer
			information['data_created'] = date_today
			information['data_ended'] = date_today
			information['truck'] = truck.pk
			information['semi_trailer'] = semi_trailer.pk
			information['sender'] = user.pk
			information['user'] = director.pk
			serializer = serializers.VehicleReceivmentSerializer(data=information)
			if serializer.is_valid():
				information['truck'] = truck
				information['semi_trailer'] = semi_trailer
				information['sender'] = user
				information['user'] = director
				print("test 1 test 2")
				serializer.finish_action(information)
				return Response(serializer.data, status=status.HTTP_201_CREATED)
			else:
				return Response(serializer.errors, status=status.HTTP_409_CONFLICT)
		except Exception as e:
			return Response({"error":str(e)},
							status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class VehicleReceivmentDetail(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)

	def get(self, request, pk):
		try:
			queryset = VehicleReceivment.objects.get(pk=pk)
			serializer = serializers.VehicleReceivmentSerializer(queryset)
			return Response(serializer.data, status=status.HTTP_200_OK)
		except Exception as e:
			return Response({'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

	def post(self, request, pk):
		try:
			information = request.data
			information['complain'] = 'A'
			description = information.get('description')
			print(description)
			photos = request.FILES.getlist('photo')
			queryset = VehicleReceivment.objects.get(pk=pk)
			queryset.story = description
			if queryset.story and queryset.complain is "A":
				pass
			truck = queryset.truck
			truck.avaiable = 'Awar'
			truck.save()
			semi_trailer = queryset.semi_trailer
			semi_trailer.avaiable = 'Awar'
			semi_trailer.save()
			serializer = serializers.VehicleReceivmentSerializer(queryset)
			serializer.update_complain_state(queryset, information)
			for photo in photos:
				context = {
					'receivment': queryset.pk,
					'photo': photo
				}
				fault_serializer = serializers.FaultReportSerializer(data=context)
				if fault_serializer.is_valid():
					context['receivment'] = queryset
					fault_serializer.create(context)
					fault_serializer.save()
					return Response(fault_serializer.data, status=status.HTTP_201_CREATED)
			return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
		except Exception as e:
			return Response({'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ReceivmentTruckComplain(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	parser_classes = [MultiPartParser, FormParser]

	def get(self, request):
		queryset = TruckComplainPhoto.objects.all()
		serializer = serializers.TruckPhotoComplainSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

	def post(self, request):
		information = request.data
		receivment = get_object_or_404(VehicleReceivment,
									   user=request.user,
									   data_ended=None)
		information['receivment'] = receivment.pk
		serializer = serializers.TruckPhotoComplainSerializer(data=information)
		if serializer.is_valid():
			try:
				information['receivment'] = receivment
				print(information['receivment'])
				complain = serializer.create(information)
				receivment.complain = "T"
				receivment.save()
				complain.save()
				return Response(serializer.data, status=status.HTTP_201_CREATED)
			except Exception as e:
				print(str(e))
				return Response({"error":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		else:
			print(serializer.errors)
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReceivmentSemiTrailerComplain(APIView):
	authentication_classes = (SessionAuthentication,)
	permission_classes = (permissions.IsAuthenticated,)
	parser_classes = [MultiPartParser, FormParser]

	def get(self, request):
		queryset = SemiTrailerComplainPhoto.objects.all()
		serializer = serializers.SemiTrailerComplainSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

	def post(self, request):
		"""
			Now we send a data:
			1. Photo those we want to share
			2. We have to get currect receivment of user
			3. In receivment we can only one receivment with status none for user
			4. He can make a couples in one time it is impossible
			5. In request we have also attributes like request.auth and request.user
		"""
		try:
			information = request.data
			queryset = get_object_or_404(VehicleReceivment,
										 data_ended=None,
										 user=request.user)
			information['receivment'] = queryset.pk
			serializer = serializers.SemiTrailerComplainSerializer(data=information)
			if serializer.is_valid():
				information['receivment'] = queryset
				semi_trailer_photo = serializer.create(information)
				semi_trailer_photo.save()
				return Response(serializer.data, status=status.HTTP_201_CREATED)
			else:
				print(serializer.errors)
				return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
		except Exception as e:
			print(str(e))
			return Response({"error": str(e)},
							status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class EquipmentTruckReceivementReport(APIView):
	authentication_classes = (SessionAuthentication,)
	permission_classes = (permissions.IsAuthenticated,)

	def get(self, request):
		try:
			receivment = VehicleReceivment.objects.get(
				user=request.user,
				data_ended=None
			)
			queryset = TruckEquipment.objects.filter(truck=receivment.truck)
			serializer = serializers.TruckEqupmentSerializer(
				queryset, many=True)
			return Response(serializer.data, status=status.HTTP_200_OK)
		except Exception as e:
			return Response({"error":(str(e))}, status=status.HTTP_400_BAD_REQUEST)

	def post(self, request):
		"""
			if equipment exist with truck is ok but
			1. We have to create a limit to do this only ones if receive exist
			2. If receivment exist we have to check equipment
			3. And check a number and assocication
		"""
		receivment = VehicleReceivment.objects.get(
			user=request.user,
			data_ended=None
		)
		print("this is receimvnet")
		truck = receivment.truck
		try:
			queryset = TruckEquipment.objects.get(
				truck=truck,
				receivment=receivment
			)
			print('queryset')
			return Response({"error":"Your data already exist"},
							status=status.HTTP_409_CONFLICT)
		except TruckEquipment.DoesNotExist:
			information = request.data
			information['truck'] = truck.pk
			information['receivment'] = receivment.pk
			serializer = serializers.TruckEqupmentSerializer(
				data=information)
			print('esa')
			if serializer.is_valid():
				information['truck'] = truck
				information['receivment'] = receivment
				equipment = serializer.create(information)
				equipment.status_checker()
				equipment.save()
				return Response(serializer.data, status=status.HTTP_201_CREATED)
			else:
				return Response(serializer.errors,
								status=status.HTTP_406_NOT_ACCEPTABLE)


class EquipmentSemiTrailerReceivmentReport(APIView):
	authentication_classes = (SessionAuthentication,)
	permission_classes = (permissions.IsAuthenticated,)

	def get(self, request):
		try:
			receivment = VehicleReceivment.objects.get(
				user=request.user,
				data_ended=None
			)

			queryset = SemiTrailerEquipment.objects.filter(receivment=receivment)
			serializer = serializers.SemiTrailerEquipSerializer(
				queryset, many=True)
			return Response(serializer.data,
							status=status.HTTP_200_OK)
		except Exception as e:
			return Response({"error":str(e)},
							status=status.HTTP_500_INTERNAL_SERVER_ERROR)

	def post(self, request):
		user = request.user
		receivment = VehicleReceivment.objects.get(
			user=request.user,
			data_ended=None
		)
		semi_trailer = receivment.semi_trailer
		try:
			queryset = SemiTrailerEquipment.objects.get(
				receivment=receivment,
				semi_trailer=semi_trailer
			)
			print("esa")
			return Response({"error":"data exist in db"},
							status=status.HTTP_400_BAD_REQUEST)
		except SemiTrailerEquipment.DoesNotExist:
			information = request.data
			information['semi_trailer'] = semi_trailer.pk
			information['receivment'] = receivment.pk
			serializer = serializers.SemiTrailerEquipSerializer(data=information)
			if serializer.is_valid():
				information['semi_trailer'] = semi_trailer
				information['receivment'] = receivment
				equipment = serializer.create(information)
				return Response(serializer.data,
								status=status.HTTP_201_CREATED)
			else:
				print(serializer.errors)
				return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ActiveReceivment(APIView):
	authentication_classes = (SessionAuthentication,)
	permission_classes = (permissions.IsAuthenticated,)

	def get(self, request):
		try:
			user = request.user
			receivment = VehicleReceivment.objects.get(
				user=user, data_ended=None)
			serializer = serializers.VehicleReceivmentSerializer(receivment)
			return Response(serializer.data, status=status.HTTP_200_OK)
		except VehicleReceivment.DoesNotExist:
			return Response({"error":"You havent active Recivments"},
							status=status.HTTP_200_OK)

class ReceivmentsApproval(APIView):
	authentication_classes = (SessionAuthentication,)
	permission_classes = (permissions.IsAuthenticated,)

	def get(self, request):
		user = request.user
		pass

	def post(self, request): pass

class FaultsReports(APIView):
	authentication_classes = (SessionAuthentication,)
	permission_classes = (permissions.IsAuthenticated,)

	def get(self, request):
		queryset = FaultReportPhoto.objects.all()
		serializer = serializers.FaultReportSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

	def post(self, request):
		pass
"""
	tworzymy odbior dla naszego kierowcy -
	Mamy można tak powiedziecx chyba dwie opcje
	1. Zdajemy samochod do firmy
	2. Oddajemy samochód do firmy
	3. Zakonczenie z poziomu kierowcy - zapytanie do VehiReceivemnts
	ze daata ended  = datatime.datatime.now()
	4. Znana stanu samochodu po przekzaiu czyli
	Truck zmienia swój stan na zajęty lub wolny lub awaria
	5. Dodawanie zdjec przy odbiorze czy coś się zgadza
	6. DOdawanie zdjec w trasie jak coś sie zniszczy
"""
