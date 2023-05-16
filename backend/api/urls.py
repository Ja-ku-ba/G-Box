from django.urls import path

from . import views

urlpatterns = [
    path('login/', views.login_user),
    path('inbox/<str:filter>', views.emails),
    path('send/', views.send),
]