import imaplib
import email
import os

host = 'imap.gmail.com'
username = "szopowsky@gmail.com"

password = os.environ["EMAIL_SENDER_PASSWORD"]

def get_inbox(filter="ALL"):
    mail = imaplib.IMAP4_SSL(host)
    mail.login(username, password)
    mail.select("inbox")

    my_messages = []
    _, search_data = mail.search(None, filter)
    for num in search_data[0].split():
        email_data = {}
        email_data['index'] = str(num)[2:-1]
        _, data = mail.fetch(num, '(RFC822)')
        _, b = data[0]
        email_message = email.message_from_bytes(b)
        # for header in ['subject', 'to', 'from', 'date']:
        for header in ['date']:
            email_data["header"] = email_message[header]
            email_data[header] = email_message[header]
        # for part in email_message.walk():
        #     if part.get_content_type() == 'text/plain':
        #         body = part.get_payload(decode=True)
        #         email_data["body"] = body.decode()
        #     elif part.get_content_type() == 'text/html':
        #         html_body = part.get_payload(decode=True)
        #         email_data["html_body"] = html_body.decode()
        my_messages.append(email_data)
    return my_messages


if __name__ == "__main__":
    my_inbox = get_inbox()