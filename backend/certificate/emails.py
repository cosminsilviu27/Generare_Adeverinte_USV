import os

from sendgrid import SendGridAPIClient, Email, To, Content
from sendgrid.helpers.mail import Mail


def send_email(to_email, subject, message):
    from_email = Email(os.environ.get('EMAIL_HOST_USER'))
    to_emails = To(to_email)
    plain_text_content = Content("text/plain", message)

    mail = Mail(from_email, to_emails, subject, plain_text_content)

    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(mail)
        print(response.status_code)
        print(response.body)
        print(response.headers)

    except Exception as e:
        print(str(e))


