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

def process_query_to_rf3501(query):
    # try to use imap tools, then use query builder
    pass

def get_inbox(filter, query=None):
    print("Lączenie start")
    mail = imaplib.IMAP4_SSL(host)
    mail.login(username, password)
    print("Łączenie koniec\n")

    print("Przetwarzanie query")
    rf3501 = ""
    if query is not None:
        rf3501 = process_query_to_rf3501(query)
    print("Przetwarzanie query koniec\n")

    print("Wybireanie filtrów")
    if filter == "FLAGGED":
        mail.select("inbox")
        status, search_data = mail.search(None, filter)

    else:
        if filter == "ALL":        
            mail.select("[Gmail]/Wszystkie")
            status, search_data = mail.search(None, "ALL")
        elif filter == "DRAFT":        
            mail.select("[Gmail]/Drafts")
            status, search_data = mail.search(None, "All")
        elif filter == "SENT":        
            mail.select("[Gmail]/Wys&AUI-ane")
            status, search_data = mail.search(None, "All")
        elif filter == "DELETED":        
            mail.select("[Gmail]/Kosz")
            status, search_data = mail.search(None, "All")
        elif filter == "SPAM":        
            mail.select("[Gmail]/Spam")
            status, search_data = mail.search(None, "All")
        else:
            mail.select("inbox")
            status, search_data = mail.search(None, filter)
    print("Wybieranie filtrów koniec\n")

    print("Reszta")
    my_messages = []
    if status == "OK":
        print(search_data[0].split())
        for num in search_data[0].split():
            print(num)
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
    print("Reszta koniec")

    print("Wylogowanie")
    mail.logout()
    print("Wylogowanie  koniec")
    return my_messages
