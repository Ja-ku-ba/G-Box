import imaplib
import email
import os

host = 'imap.gmail.com'
username = "szopowsky@gmail.com"

password = os.environ["EMAIL_SENDER_PASSWORD"]

def get_mail(index):
    mail = imaplib.IMAP4_SSL(host)
    mail.login(username, password)
    mail.select("inbox")

    email_data = {}
    _, data = mail.fetch(index, '(RFC822)')
    _, b = data[0]
    email_message = email.message_from_bytes(b)
    for header in ['subject', 'to', 'from', 'date']:
        email_data["header"] = email_message[header]
        email_data[header] = email_message[header]
    for part in email_message.walk():
        if part.get_content_type() == 'text/plain':
            body = part.get_payload(decode=True)
            email_data["body"] = body.decode()
        elif part.get_content_type() == 'text/html':
            html_body = part.get_payload(decode=True)
            email_data["html_body"] = html_body.decode()
    return email_data
