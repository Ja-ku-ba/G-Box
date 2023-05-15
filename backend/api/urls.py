from django.urls import path

from . import views

urlpatterns = [
    path('login/', views.send),
    path('inbox/<str:filter>', views.emails),
    path('send/', views.send),
]