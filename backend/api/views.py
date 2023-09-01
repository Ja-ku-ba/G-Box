from django.contrib.auth.models import User

from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

# from .models import MyUser

from Ebox.send import send_mail

from Ebox.ebox import AuthenticateUser, Mails

# Create your views here.
@api_view(["POST"])
@parser_classes([JSONParser])
def login(request):
    username = request.data.get("username")
    code = request.data.get("password")

    response = AuthenticateUser().register(username, code)

    if response == status.HTTP_200_OK:
        # user already exists in db
        try:
            user = User.objects.get(username = username)

            return Response(
                {
                    # access is a refresh token only because that way its work
                    "access": str(RefreshToken.for_user(user).access_token),
                    "refresh": str(MyTokenObtainPairSerializer().get_token(user))
                },
                status=status.HTTP_200_OK
            )
        
        # new user whants to log in
        except:
            # to save last logedin user data 
            User.objects.all().delete()
            user = User.objects.create(
                password=code,
                username=username
            )
            token = MyTokenObtainPairSerializer().get_token(user)
            refresh_token = str(RefreshToken.for_user(user).access_token)

            return Response(
                {
                    "access": str(token),
                    "refresh": refresh_token
                },
                status=status.HTTP_200_OK
            )
    # there is no user in gmail with that username or passcode
    return Response(
        {
            "access": "NO_USER_WITH_THIS_CRIDENTIALS"
        },
        status=status.HTTP_400_BAD_REQUEST
    )

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.username
        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
def emails(request, filter, query=""):
    process = Mails()
    process.login_user()
    return Response(process.get_headers(filter, request.query_params))

@api_view(["GET"])
def get_target_mail(request, pk):
    process = Mails()
    process.login_user()
    return Response(process.get_mail(pk))

@api_view(["POST"])
@parser_classes([JSONParser])
def send(request):
    to_emails = [request.data.get("to_emails")]
    subject = request.data.get("subject")
    text = request.data.get("text")

    send_mail(to_emails=to_emails, subject=subject, text=text)

    return Response(status=status.HTTP_200_OK)