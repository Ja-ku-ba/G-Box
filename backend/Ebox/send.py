import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from pathlib import Path

username = "szopowsky@gmail.com"
password = os.environ["EMAIL_SENDER_PASSWORD"]
files = []
def send_mail(to_emails, subject, text, from_email=username, html=None):
    assert isinstance(to_emails, list)
    
    msg = MIMEMultipart()
    msg["Form"] = from_email
    msg["To"] = ", ".join(to_emails)
    msg["Subject"] = subject

    txt_part = MIMEText(text, 'plain')
    msg.attach(txt_part)

    if html != None:
        html_part = MIMEText(text, '<h1>Hello!</h1>')
        msg.attach(html_part)

    for path in files:
        part = MIMEBase('application', "octet-stream")
        with open(path, 'rb') as file:
            part.set_payload(file.read())
        encoders.encode_base64(part)
        part.add_header('Content-Disposition',
                        'attachment; filename={}'.format(Path(path).name))
        msg.attach(part)

    msg_str = msg.as_string()
    # login to smtp server
    server = smtplib.SMTP(host="smtp.gmail.com", port = 587)
    server.ehlo()
    server.starttls()
    server.login(username, password)
    server.sendmail(from_email, to_emails, msg_str)
    server.quit()