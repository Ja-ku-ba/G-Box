# from imap_tools import MailBox, MailMessageFlags
# with MailBox('imap.mail.com').login('szopowsky@gmail.com', 'cfsadqbpuoxsaezo') as mailbox:
#     uids = [msg.uid for msg in mailbox.fetch(mark_seen=False)]
#     mailbox.flag(uids, MailMessageFlags.SEEN, True)


from imap_tools import MailBox, A

# Connect to the IMAP server
with MailBox('imap.mail.com').login('szopowsky@gmail.com', 'cfsadqbpuoxsaezo', initial_folder="Sent") as mailbox:
    # Fetch sent emails
    sent_emails = mailbox.fetch(A())

    # Process retrieved emails
    for email in sent_emails:
        print("Subject:", email.subject)
        print("From:", email.from_)
        print("To:", email.to)
        print("Date:", email.date)
        print("Body:", email.text)
        print("-----------------------")
