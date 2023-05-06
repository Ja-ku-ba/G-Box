from rest_framework.decorators import api_view
from rest_framework.response import Response

from Ebox.inbox import get_inbox
from Ebox.send import send_mail
import os

# Create your views here.
@api_view(["GET"])
def emails(request, filter):
    response = get_inbox(filter)
    return Response(response)

@api_view(["POST"])
def send(request, data):
    if data.html:
        send = send_mail(to_emails=data.to_emails, subject=data.subject, html=data.html)
    else:
        send = send_mail(to_emails=data.to_emails, subject=data.subject, text=data.text)
    return Response(send)