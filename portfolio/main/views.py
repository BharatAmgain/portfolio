from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.contrib import messages
from .models import ContactMessage

def home(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message_content = request.POST.get('message')

        # Save to database
        ContactMessage.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message_content
        )

        # Print to console (for testing)
        print("\n" + "="*50)
        print("📧 NEW CONTACT FORM SUBMISSION")
        print("="*50)
        print(f"Name: {name}")
        print(f"Email: {email}")
        print(f"Subject: {subject}")
        print(f"Message: {message_content}")
        print("="*50 + "\n")

        try:
            # Try to send email (will work if Gmail is configured)
            send_mail(
                f'Portfolio Contact: {subject}',
                f'''
Name: {name}
Email: {email}
Subject: {subject}

Message:
{message_content}

---
This message was sent from your portfolio contact form.
                ''',
                'amgaibharat46@gmail.com',
                ['amgaibharat46@gmail.com'],
                fail_silently=True,  # Don't show error if email fails
            )
            messages.success(request, 'Your message has been sent successfully! I will get back to you soon.')
        except Exception as e:
            # Still show success even if email fails
            messages.success(request, 'Your message has been received! I will get back to you soon.')
            print(f"Email error (but message saved): {e}")

        return redirect('success')

    return render(request, 'main/index.html')

def success(request):
    return render(request, 'main/success.html')