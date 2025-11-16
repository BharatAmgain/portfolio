# main/views.py
from django.shortcuts import render, redirect
from django.core.mail import send_mail, EmailMessage
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.contrib import messages
from django.utils import timezone
from .models import ContactMessage
import os


def home(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message_content = request.POST.get('message')

        # Save to database
        contact_message = ContactMessage.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message_content
        )

        # Print to console (for testing)
        print("\n" + "=" * 50)
        print("📧 NEW CONTACT FORM SUBMISSION")
        print("=" * 50)
        print(f"Name: {name}")
        print(f"Email: {email}")
        print(f"Subject: {subject}")
        print(f"Message: {message_content}")
        print("=" * 50 + "\n")

        try:
            # Send notification email to yourself
            send_notification_email(name, email, subject, message_content)

            # Send confirmation email to the user
            send_confirmation_email(name, email)

            messages.success(request, 'Your message has been sent successfully! I will get back to you soon.')

        except Exception as e:
            # Still show success even if email fails
            messages.success(request, 'Your message has been received! I will get back to you soon.')
            print(f"Email error (but message saved): {e}")

        return redirect('success')

    return render(request, 'main/index.html')


def send_notification_email(name, email, subject, message_content):
    """Send email notification to yourself when someone contacts you"""

    # HTML email content
    html_message = render_to_string('main/email_notification.html', {
        'name': name,
        'email': email,
        'subject': subject,
        'message': message_content,
        'timestamp': timezone.now().strftime("%Y-%m-%d %H:%M:%S")
    })

    # Plain text version
    plain_message = f"""
    New Contact Form Submission

    From: {name}
    Email: {email}
    Subject: {subject}
    Time: {timezone.now().strftime("%Y-%m-%d %H:%M:%S")}

    Message:
    {message_content}

    ---
    This message was sent from your portfolio contact form.
    """

    # Send email
    send_mail(
        subject=f'📧 Portfolio Contact: {subject}',
        message=plain_message,
        html_message=html_message,
        from_email='amgaibharat46@gmail.com',
        recipient_list=['amgaibharat46@gmail.com'],  # Your email
        fail_silently=False,
    )


def send_confirmation_email(name, email):
    """Send confirmation email to the person who contacted you"""

    html_message = render_to_string('main/email_confirmation.html', {
        'name': name,
    })

    plain_message = f"""
    Thank you for your message, {name}!

    I have received your message and will get back to you as soon as possible.

    Best regards,
    Bharat Amgain
    Python & Full Stack Developer

    This is an automated confirmation email.
    """

    send_mail(
        subject='✅ Message Received - Bharat Amgain',
        message=plain_message,
        html_message=html_message,
        from_email='amgaibharat46@gmail.com',
        recipient_list=[email],
        fail_silently=False,
    )


def success(request):
    return render(request, 'main/success.html')