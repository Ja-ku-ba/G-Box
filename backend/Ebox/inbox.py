import imaplib, email, os, imap_tools
from imap_tools import A, AND, OR, NOT, MailBox


host = 'imap.gmail.com'
username = "szopowsky@gmail.com"

password = os.environ["EMAIL_SENDER_PASSWORD"]
        
# https://github.com/ikvk/imap_tools/blob/master/examples/search.py
def process_query_to_rf3501(query):
    print(query.items(), type(query), dir(query))
    print("==============================")
    q = ""
    if query["from"]:
        q = A(from_=[query["from"]])
    elif query["to"]:
        print("voentibwn")
    elif query["subject"]:
        print("voentibwn")
    elif query["contains"]:
        print("voeintb")
    elif query["contains"]:
        print("voeintb")
    elif query["exclude"]:
        print("voeintb")
        

    return q

def get_inbox(filter, query=None):
    print("Lączenie start", filter, '-----------')
    mail = imaplib.IMAP4_SSL(host)
    mail.login(username, password)
    print("Łączenie koniec\n")

    print("Przetwarzanie query")
    rf3501 = "All"
    if query is not None:
        rf3501 = process_query_to_rf3501(query)
    print("Przetwarzanie query koniec\n")

    print("Wybireanie filtrów")

    if filter == "DRAFT":     
        mail.select('"[Gmail]/Wersje robocze"')
        status, search_data = mail.search(None, "All", rf3501)
    elif filter == "SENT":      
        mail.select('"[Gmail]/Wys&AUI-ane"')
        status, search_data = mail.search(None, "All")
    elif filter == "FLAGGED":    
        print( mail.select('"[Gmail]/Oznaczone gwiazdk&AQU-"'))
        status, search_data = mail.search(None, "ALL")
    elif filter == "DELETED":        
        mail.select('"[Gmail]/Kosz"')
        status, search_data = mail.search(None, "All")
    elif filter == "SPAM":       
        mail.select('"[Gmail]/Spam"')
        status, search_data = mail.search(None, "All")
    else:
        mail.select('"[Gmail]/Wszystkie"')
        status, search_data = mail.search(None, rf3501)

    print("Wybieranie filtrów koniec\n")

    print("Reszta")
    my_messages = []
    if status == "OK":
        print(search_data[0].split())
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
    print("Reszta koniec")

    print("Wylogowanie")
    mail.close()
    mail.logout()
    print("Wylogowanie  koniec")
    return my_messages
