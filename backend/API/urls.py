from django.urls import path
from . import views

urlpatterns = [
    path('login', views.UserLogin.as_view()),
    path('logout', views.UserLogout.as_view()),
    path('register', views.UserRegister.as_view()),
    path('user', views.CurrentUser.as_view()),
    path('user/<int:pk>', views.UserView.as_view()),
    path('user/modify/<int:pk>', views.UserView.as_view()),
    path('user/delete/<int:pk>', views.UserDelete.as_view()),
    path('users', views.UsersView.as_view()),
    path('users/<int:pk>', views.UsersView.as_view()),
    path('faults', views.FaultsReports.as_view()),
    path('faults/<int:pk>', views.FaultReport.as_view()),
    path('trucks', views.TruckView.as_view()),
    path('trucks/add', views.TruckAdd.as_view()),
    path('truck/<int:pk>', views.TruckDetail.as_view()),
    path('truck/modify/<int:pk>', views.TruckView.as_view()),
    path('truck-del/<int:pk>', views.TruckDetail.as_view()),
    path('samitrucks', views.SamiTrucksView.as_view()),
    path('samitruck/add', views.SamiTrucksAdd.as_view()),
    path('samitruck/<int:pk>', views.SamiTrucksDetailView.as_view()),
    path('samitruck/modify/<int:pk>', views.SamiTrucksView.as_view()),
    path('samitruck-del/<int:pk>', views.SamiTrucksDetailView.as_view()),
    path('samitrucks-equip', views.SamiTrucksView.as_view()),
    path('trucks-equip', views.TruckEquimpmentView.as_view()),
    path('vehicle-receivements', views.VehicleReceivments.as_view()),
    path('vehicle-receivements/complains', views.VehicleReceivmentsComplains.as_view()),
    path('vehicle-receivements/finish', views.VehicleStatement.as_view()),
    path('vehicle-receivements/active', views.ActiveReceivment.as_view()),
    path('vehicle-receivements/<int:pk>',
         views.VehicleReceivmentDetail.as_view()),
    path('vehicle-receivements/complain/add',
         views.ReceivmentTruckComplain.as_view()),
    path('vehicle-receivements/complain/semitruck/add',
         views.ReceivmentSemiTrailerComplain.as_view(),
         name='SemiTruckComplain'),
    path('vehicle-receivments/complain/equipment/semitrailer',
         views.EquipmentSemiTrailerReceivmentReport.as_view()),
    path('vehicle-receivments/complain/equipment/truck',
         views.EquipmentTruckReceivementReport.as_view()),
]
