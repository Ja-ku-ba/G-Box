from rest_framework.decorators import api_view
from rest_framework.response import Response

from Ebox.inbox import get_inbox
import os

# Create your views here.
@api_view(["GET"])
def emails(request, filter):
    response = get_inbox(filter)
    print(filter, '---------------')
    return Response(response)
