from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework import status

from django.contrib.auth.hashers import make_password, check_password

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User

from Ebox.inbox import get_inbox
from Ebox.send import send_mail
from Ebox.login import login
from Ebox.mail import get_mail

import os

# Create your views here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        # ...
        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(["POST"])
@parser_classes([JSONParser])
def login_user(request):
    email = request.data.get("email")
    code = request.data.get("code")
    response = login(email, code)
    if response == 200:
        User.objects.create(
            email=email, 
            code=code
        )
    return Response(status=response)

@api_view(["POST"])
def logout(request):
    user = User.objects.all()
    user.delete()
    return Response(status=status.HTTP_100_CONTINUE)

@api_view(["GET"])
def emails(request, filter):
    response = get_inbox(filter)
    return Response(response)

@api_view(["GET"])
def get_target_mail(request, pk):
    response = get_mail(pk)
    return Response(response)

@api_view(["GET"])
def get_username(request):
    try:
        username = User.objects.order_by('-id')[0]
        return Response(username.email, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_100_CONTINUE)

@api_view(["POST"])
@parser_classes([JSONParser])
def send(request):
    to_emails = [request.data.get("to_emails")]
    subject = request.data.get("subject")
    text = request.data.get("text")

    send_mail(to_emails=to_emails, subject=subject, text=text)

    return Response(status=status.HTTP_200_OK)