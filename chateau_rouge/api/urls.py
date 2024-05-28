from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('userList/', UserListview.as_view(), name='User_list'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('test/', testEndPoint, name='test'),
    path('camanies/', CamanyView.as_view(), name='camanies'),
    path('clients/', ClientView.as_view(), name='clients'),
    path('buyings/', BuyingView.as_view(), name='buyings'),
    path('balites/', BaliteView.as_view(), name='balites'),
    path('dattes/', DatteView.as_view(), name='dattes'),
    path('vers/', VersView.as_view(), name='vers'),
    path('', getRoutes),
]