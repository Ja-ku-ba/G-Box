import os, imap_tools
from imap_tools import MailBox, A, NOT, AND

class Authenticate():
    def __init__(self) -> None:
        self.mailbox = MailBox('imap.gmail.com')
        self.user_email = "szopowsky@gmail.com"
        self.passcode = os.environ["EMAIL_SENDER_PASSWORD"]
    
    def login(self):
        return self.mailbox.login(self.user_email, self.passcode)

class Mails(Authenticate):
    def __init__(self) -> None:
        super().__init__()

    def get_headers(self, filter):
        mails = self.mailbox.fetch(filter)
        r = []
        for e in mails:
            if e.subject:
                r.append(
                    {
                        'uid': e.uid,
                        'from': e.from_,
                        'date': e.date_str,
                        'subject': f'{e.subject[:50]}...',
                     }
                )
            else:
                r.append(
                    {
                        'uid': e.uid,
                        'from': e.from_,
                        'date': e.date_str,
                        'subject': f'{e.text[:50]}...'
                     }
                )
        return r
    
    def get_mail(self, id):
        mail =  next(self.mailbox.fetch(A(uid=f"{id}")))
        if mail.html:
            return {
                "headers": mail.headers,
                "html_body": mail.html  
            }
        else: 
            return {
                "headers": mail.headers,
                "body": mail.text,
            }


