import imaplib
import email
import os

host = 'imap.gmail.com'
username = "szopowsky@gmail.com"

password = os.environ["EMAIL_SENDER_PASSWORD"]
        # <li onClick={(e) => redirect(e)} id="ALL">Odebrane</li>
        # <li onClick={(e) => redirect(e)} id="FLAGGED">Oznaczone gwiazdką</li>
        # <li onClick={(e) => redirect(e)} id="SENT">Wysłane</li>
        # <li onClick={(e) => redirect(e)} id="DRAFT">Wersje robocze</li>
        # <li onClick={(e) => redirect(e)} id="DELETED">Kosz</li>
        # <li onClick={(e) => redirect(e)} id="SPAM">Spam</li>
def get_inbox(filter):
    mail = imaplib.IMAP4_SSL(host)
    mail.login(username, password)
    print(filter, "9876e5467890")
    if filter == "FLAGGED":
        print('eringiotenklbg0942j')
        mail.select("inbox")
        status, search_data = mail.search(None, filter)

    else:
        if filter == "ALL":
            mail.select("[Gmail]/Wszystkie")
        elif filter == "DRAFT":
            mail.select("[Gmail]/Drafts")
        elif filter == "SENT":
            mail.select("[Gmail]/Wys&AUI-ane")
        elif filter == "DELETED":
            mail.select("[Gmail]/Kosz")
        elif filter == "SPAM":
            mail.select("[Gmail]/Spam")
        else:
            mail.select("inbox")
        status, search_data = mail.search(None, "All")

    my_messages = []
    if status == "OK":
        for num in search_data[0].split():
            email_data = {}
            email_data['index'] = str(num)[2:-1]
            _, data = mail.fetch(num, '(RFC822)')
            _, b = data[0]
            email_message = email.message_from_bytes(b)
            for header in ['subject', 'to', 'from', 'date']:
                email_data[header] = email_message[header]
            for part in email_message.walk():
                if part.get_content_type() == 'text/plain':
                    body = part.get_payload(decode=True)
                    email_data["body"] = body.decode()
                elif part.get_content_type() == 'text/html':
                    html_body = part.get_payload(decode=True)
                    email_data["html_body"] = html_body.decode()
            my_messages.append(email_data)

    mail.logout()
    return my_messages
