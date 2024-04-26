from datetime import date, datetime

import imap_tools
from imap_tools import AND, OR, A, MailBox

date_limit = datetime(2024, 4, 25)


class Authenticate:
    def __init__(self) -> None:
        self.mailbox = MailBox("imap.gmail.com")
        self.user_email = "szopowsky@gmail.com"
        self.passcode = "cfsadqbpuoxsaezo"
        # self.passcode = os.environ["EMAIL_SENDER_PASSWORD"]

    def login(self):
        return self.mailbox.login(self.user_email, self.passcode)


class Mails(Authenticate):
    def __init__(self) -> None:
        super().__init__()

    def get_headers(self, filter, query=None):
        # if user want to see more specific refuts eg.: from_="mail@example.com"
        if query:
            q = self.query_builder(query)
            mails = self.mailbox.fetch(A(filter, q), bulk=True)
        else:
            mails = self.mailbox.fetch(AND(from_="szopowsky@gmail.com"))

        r = []
        for e in mails:
            if e.subject:
                if len(e.subject) > 50:
                    r.append(
                        {
                            "uid": e.uid,
                            "from": e.headers["from"][0],
                            "date": e.date,
                            "subject": f"{e.subject[:50]}...",
                        }
                    )
                else:
                    r.append(
                        {
                            "uid": e.uid,
                            "from": e.headers["from"][0],
                            "date": e.date,
                            "subject": e.subject,
                        }
                    )
            else:
                r.append(
                    {
                        "uid": e.uid,
                        "from": e.headers["from"][0],
                        "date": e.date,
                        "subject": f"{e.text[:50]}...",
                    }
                )

        return sorted(r, key=lambda x: (x["date"]), reverse=True)

    def get_mail(self, id):
        mail = next(self.mailbox.fetch(A(uid=f"{id}")))
        if mail.html:
            return {"headers": mail.headers, "html_body": mail.html}
        else:
            return {
                "headers": mail.headers,
                "body": mail.text,
            }

    def query_builder(self, *query):
        q = []
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
