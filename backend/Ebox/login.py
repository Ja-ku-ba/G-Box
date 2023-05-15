import imaplib
import os

host = 'imap.gmail.com'

def login(email, password):
    mail = imaplib.IMAP4_SSL('imap.gmail.com')
    try:
        mail.login(username, password)
        return "HTTP_200_OK"
    except:
        return "HTTP_401_UNAUTHORIZED"
