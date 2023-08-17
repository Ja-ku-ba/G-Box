import imaplib
import email
import os

host = 'imap.gmail.com'
username = "szopowsky@gmail.com"

password = os.environ["EMAIL_SENDER_PASSWORD"]
        
def process_query_to_rf3501(query):
    # try to use imap tools, then use query builder
    pass

def get_inbox(filter, query=None):
    print("Lączenie start", filter, '-----------')
    mail = imaplib.IMAP4_SSL(host)
    mail.login(username, password)
    print("Łączenie koniec\n")

    print("Przetwarzanie query")
    rf3501 = ""
    if query is not None:
        rf3501 = process_query_to_rf3501(query)
    print("Przetwarzanie query koniec\n")

    print("Wybireanie filtrów")

    """
    b'(\\HasNoChildren) "/" "INBOX"', 
    b'(\\Noselect \\HasChildren) "/" "[Gmail]"',
    b'(\\HasNoChildren \\All) "/" "[Gmail]/All Mail"', 
    b'(\\HasNoChildren \\Drafts) "/" "[Gmail]/Drafts"', 
    b'(\\HasNoChildren \\Important) "/" "[Gmail]/Important"', 
    b'(\\HasNoChildren \\Sent) "/" "[Gmail]/Sent Mail"', 
    b'(\\HasNoChildren \\Junk) "/" "[Gmail]/Spam"', 
    b'(\\HasNoChildren \\Flagged) "/" "[Gmail]/Starred"', 
    b'(\\HasNoChildren \\Trash) "/" "[Gmail]/Trash"'

    b'(\\HasNoChildren) "/" "INBOX"'
    b'(\\HasChildren \\Noselect) "/" "[Gmail]"'
    b'(\\HasNoChildren \\Trash) "/" "[Gmail]/Kosz"'
    b'(\\Flagged \\HasNoChildren) "/" "[Gmail]/Oznaczone gwiazdk&AQU-"'
    b'(\\HasNoChildren \\Junk) "/" "[Gmail]/Spam"'
    b'(\\HasNoChildren \\Important) "/" "[Gmail]/Wa&AXw-ne"'
    b'(\\Drafts \\HasNoChildren) "/" "[Gmail]/Wersje robocze"'
    b'(\\All \\HasNoChildren) "/" "[Gmail]/Wszystkie"'
    b'(\\HasNoChildren \\Sent) "/" "[Gmail]/Wys&AUI-ane"'
    """

    if filter == "ALL":        
        print(mail.select('"[Gmail]/Wszystkie"'))
        status, search_data = mail.search(None, "ALL")
    elif filter == "DRAFT":     
        print(mail.select('"[Gmail]/Wersje robocze"'))
        status, search_data = mail.search(None, "All")
    elif filter == "SENT":      
        print(mail.select('"[Gmail]/Wys&AUI-ane"'))
        status, search_data = mail.search(None, "All")
    elif filter == "FLAGGED":    
        print( print(mail.select('"[Gmail]/Wa&AXw-ne"')))
        status, search_data = mail.search(None, "ALL")
    elif filter == "DELETED":        
        print(mail.select("[Gmail]/Kosz"))
        status, search_data = mail.search(None, "All")
    elif filter == "SPAM":       
        print(mail.select("[Gmail]/Spam"))
        status, search_data = mail.search(None, "All")
    else:
        print("Nie tym razem")
        return []
    
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
