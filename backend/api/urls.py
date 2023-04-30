from django.urls import path

from . import views

urlpatterns = [
    path('inbox/<str:filter>', views.emails)
]