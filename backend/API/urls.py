from django.urls import path
from . import views

urlpatterns = [
    path('login', views.UserLogin.as_view()),
    path('logout', views.UserLogout.as_view()),
    path('register', views.UserRegister.as_view()),
    path('user', views.UserView.as_view()),
    path('trucks', views.TruckView.as_view()),
    path('truck/add', views.TruckAdd.as_view()),
    path('truck/<int:pk>', views.TruckDetail.as_view()),
    path('truck-del/<int:pk>', views.TruckDelete.as_view()),
    path('samitrucks', views.SamiTrucksView.as_view()),
    path('samitruck/add', views.SamiTrucksAdd.as_view()),
    path('samitruck/<int:pk>', views.SamiTrucksDetailView.as_view()),
    path('samitrucks-equip', views.SamiTrucksView.as_view()),
    path('trucks-equip', views.TruckEquimpmentView.as_view()),
    path('vehicle-receivements', views.VehicleReceivments.as_view()),
    path('vehicle-receivements/<int:pk>',
         views.VehicleReceivmentDetail.as_view()),
    path('vehicle-receivements/complain/add',
         views.ReceivmentTruckComplain.as_view()),
    path('vehicle-receivements/complain/semitruck/add',
         views.ReceivmentSemiTrailerComplain.as_view(), name='SemiTruckComplain')
    # photo add tuck
    # photo add semitruck
]
