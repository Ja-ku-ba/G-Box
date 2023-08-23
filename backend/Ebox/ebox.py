import os, imap_tools
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
        # if user want to see more specific refuts eg.: from_="mail@example.com"
        if query:
            q = self.query_builder(query)
            mails = self.mailbox.fetch(A(filter, q))
        else:
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

    """
        Query param[0]s:
            # answered: Optional[bool] = None,
            # seen: Optional[bool] = None,
            # flagged: Optional[bool] = None,
            # draft: Optional[bool] = None,
            # deleted: Optional[bool] = None,
            # keyword: Optional[Union[str, List[str]]] = None,
            # no_keyword: Optional[Union[str, List[str]]] = None,
            # from_: Optional[Union[str, List[str]]] = None,
            # to: Optional[Union[str, List[str]]] = None,
            # subject: Optional[Union[str, List[str]]] = None,
            # body: Optional[Union[str, List[str]]] = None,
            # text: Optional[Union[str, List[str]]] = None,
            # bcc: Optional[Union[str, List[str]]] = None,
            # cc: Optional[Union[str, List[str]]] = None,
            # date: Optional[Union[datetime.date, List[datetime.date]]] = None,
            # date_gte: Optional[Union[datetime.date, List[datetime.date]]] = None,
            # date_lt: Optional[Union[datetime.date, List[datetime.date]]] = None,
            # sent_date: Optional[Union[datetime.date, List[datetime.date]]] = None,
            # sent_date_gte: Optional[Union[datetime.date, List[datetime.date]]] = None,
            # sent_date_lt: Optional[Union[datetime.date, List[datetime.date]]] = None,
            # size_gt: Optional[int] = None,
            # size_lt: Optional[int] = None,
            # new: Optional[bool] = None,
            # old: Optional[bool] = None,
            # recent: Optional[bool] = None,
            # all: Optional[bool] = None,  # noqa
            # uid: Optional[Union[str, Iterable[str], UidRange]] = None,
            # header: Optional[Union[Header, List[Header]]] = None,
            # gmail_label: Optional[Union[str, List[str]]] = None):  # todo newline after drop 3.5
    """
    
    def extract_values(*query_values):
        print(dir(query_values[1][0]), "fiuhnbivjodskjbvghuiopjhugv")
        q = []
        for param in query_values[1][0]:
            if "," in param[1]:
                q.append(OR(f'{param[0]}={[v for v in (param[1].replace(" ", "")).split(",")]}'))
            else:
                q.append(OR(f"{param[0]}={param[1]}"))
        print(q)


    def query_builder(self,*query):

        self.extract_values("from", query)
        # if "from_" in query:
        #     q = OR(from_=[email for email in (query[1]["from_"].replace(" ", "")).split(",")])
        # print(q, [email for email in (query[1]["from_"].replace(" ", "")).split(",")], type(q), dir(q), "================1")
        # if "to" in query:
        #     q = AND(q, OR(from_=[email for email in (query[1]["to"].replace(" ", "")).split(",")]))
        # print(q, "================2")
        # if "subject" in query:
        #     q = AND(q, OR(subject=[email for email in (query[1]["subject"].replace(" ", "")).split(",")]))
        # print(q, "================3")
        # if "contains" in query:
        #     q = AND(q, OR(keyword=[email for email in (query[1]["contains"].replace(" ", "")).split(",")]))
        # print(q, "================4")
        # if "exclude" in query:
        #     q = AND(q, OR(no_keyword=[email for email in (query[1]["exclude"].replace(" ", "")).split(",")]))

        return A(from_="wulfrykpierozek@gmail.com")
    
    # def extract_values(*values):
    #     for list_of_queries in values[1]:
    #         for single_query in list_of_queries.items():
    #             if "," in single_query[1]:
    #                 return [ele for ele in (single_query[1].replace(" ", "")).split(",")]
    #             return [single_query[1]]

    # def query_builder(self, *query):
    #     q = []
    #     if "from_" in query:
    #         q.append(OR(from_ = self.extract_values(query))) 
    #     return A(from_="wulfrykpierozek@gmail.com")