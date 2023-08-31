import os, email, email.mime as mime, smtplib, pathlib
from imap_tools import MailBox, A, NOT, AND, OR

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

    def get_headers(self, filter, query=None):
        folder_list = self.mailbox.folder.list()
        for folder in folder_list:
            print(folder)
        # if user want to see more specific refuts eg.: from_="mail@example.com"
        if query:
            q = self.query_builder(query)
            mails = self.mailbox.fetch(A(filter, q))
        else:
            mails = self.mailbox.fetch(filter)
            print("------------------------")

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

    def filter_builder(self, filter):
        return 

    def query_builder(self,*query):
        q = []
        print(query)
        q.append(OR(deleted=True))
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
    
class Send(Authenticate):
    def __init__(self) -> None:
        self.username = "szopowsky@gmail.com"
        self.password = os.environ["EMAIL_SENDER_PASSWORD"]

    def send(self, to_emails, subject, text, from_email="szopowsky@gmail.com", html=None):

        
        files = []
        assert isinstance(to_emails, list)
        
        msg = mime.multipart.MIMEMultipart()
        msg["Form"] = self.username
        msg["To"] = ", ".join(to_emails)
        msg["Subject"] = subject

        txt_part = mime.text.MIMEText(text, 'plain')
        msg.attach(txt_part)

        if html != None:
            html_part = mime.MIMEText(text, '<h1>Hello!</h1>')
            msg.attach(html_part)

        for path in files:
            part = mime.base.MIMEBase('application', "octet-stream")
            with open(path, 'rb') as file:
                part.set_payload(file.read())
            email.encoders.encode_base64(part)
            part.add_header('Content-Disposition',
                            'attachment; filename={}'.format(pathlib.Path(path).name))
            msg.attach(part)

        msg_str = msg.as_string()
        # login to smtp server
        server = smtplib.SMTP(host="smtp.gmail.com", port = 587)
        server.ehlo()
        server.starttls()
        server.login(self.username, self.password)
        server.sendmail(from_email, to_emails, msg_str)
        server.quit()   