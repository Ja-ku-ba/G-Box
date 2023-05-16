from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework import status

from Ebox.inbox import get_inbox
from Ebox.send import send_mail
from Ebox.login import login

import os

# Create your views here.
@api_view(["POST"])
@parser_classes([JSONParser])
def login_user(request):
    email = request.data.get("email")
    code = request.data.get("code")
    return Response(status=login(email, code))

@api_view(["GET"])
def emails(request, filter):
    response = get_inbox(filter)
    return Response(response)

@api_view(["POST"])
@parser_classes([JSONParser])
def send(request):
    to_emails = [request.data.get("to_emails")]
    subject = request.data.get("subject")
    text = request.data.get("text")

    send_mail(to_emails=to_emails, subject=subject, text=text)

    return Response(status=status.HTTP_200_OK)