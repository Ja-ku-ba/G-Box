from django.urls import path

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from . import views
from .views import MyTokenObtainPairView

urlpatterns = [
    path('login/', views.login),
    path('inbox/<str:filter>', views.emails),
    path('send/', views.send),
    path('mail/<str:pk>', views.get_target_mail),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]   