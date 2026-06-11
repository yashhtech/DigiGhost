from django.contrib import admin
from .models import NewsletterSubscriber
from .models import ContactInquiry

@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ['email', 'subscribed_at']
    search_fields = ['email']

@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "email",
        "phone",
        "created_at"
    )

    search_fields = (
        "name",
        "email",
        "phone"
    )

    list_filter = ("created_at",)