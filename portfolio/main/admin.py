from django.contrib import admin
from django.core.mail import send_mail
from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at', 'is_read', 'responded']
    list_filter = ['is_read', 'responded', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['created_at']
    list_editable = ['is_read', 'responded']
    actions = ['mark_as_read', 'mark_as_responded', 'send_response']

    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)
        self.message_user(request, f"{queryset.count()} messages marked as read.")

    mark_as_read.short_description = "Mark selected messages as read"

    def mark_as_responded(self, request, queryset):
        queryset.update(responded=True)
        self.message_user(request, f"{queryset.count()} messages marked as responded.")

    mark_as_responded.short_description = "Mark selected messages as responded"

    def send_response(self, request, queryset):
        for message in queryset:
            try:
                send_mail(
                    f'Re: {message.subject}',
                    'Thank you for your message. This is an automated response to let you know I have received your message and will get back to you soon.',
                    'amgaibharat46@gmail.com',
                    [message.email],
                    fail_silently=False,
                )
                message.responded = True
                message.save()
            except Exception as e:
                self.message_user(request, f"Failed to send response to {message.email}: {str(e)}", level='ERROR')

        self.message_user(request, f"Responses sent to {queryset.count()} messages.")

    send_response.short_description = "Send automated response to selected messages"