import os
from imap_tools import MailBox, AND, OR
from django.contrib.auth.models import User
from rest_framework import status
class AuthenticateUser():
    def __init__(self) -> None:
        self.mailbox = MailBox('imap.gmail.com')

    def register(self, user_email, passcode):
        try:
            self.mailbox.login(user_email, passcode)
            return status.HTTP_200_OK
        except:
            return status.HTTP_404_NOT_FOUND
        
    def login_user(self):
        user_ = User.objects.all().first()
        return self.mailbox.login(user_.username, user_.password)

class Mails(AuthenticateUser):
    def __init__(self) -> None:
        super().__init__()

    def get_headers(self, filter, query=None):
        # if user want to see more specific refuts eg.: from_="mail@example.com"
        if query:
            q = self.query_builder(query)
            mails = self.mailbox.fetch(AND(filter, q))
        else:
            mails = self.mailbox.fetch(filter)

        r = []
        for e in mails:
            if e.subject:
                if len(e.subject) > 50:
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
                            'subject': e.subject,
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
        mail =  next(self.mailbox.fetch(AND(uid=f"{id}")))
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
        

    def query_builder(self,*query):
        q = []
        print(query)
        if "from" in query[0]:
            q.append(OR(from_=query[0]["from"]))
        if "to" in query[0]:
            q.append(OR(to=query[0]["to"]))
        if "subject" in query[0]:
            q.append(OR(subject=query[0]["subject"]))
        if "contains" in query[0]:
            q.append(OR(keyword=query[0]["contains"]))
        if "exclude" in query[0]:
            q.append(OR(no_keyword=query[0]["exclude"]))
        return AND(*q)