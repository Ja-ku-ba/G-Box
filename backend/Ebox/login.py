import imaplib

from rest_framework import status

def login_user(email, password):
    mail = imaplib.IMAP4_SSL('imap.gmail.com')
    try:
        mail.login(email, password)
        mail.logout()
        return status.HTTP_200_OK
    except:
        return status.HTTP_401_UNAUTHORIZED