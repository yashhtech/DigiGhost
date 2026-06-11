from django.shortcuts import render
from django.contrib import messages
from .models import NewsletterSubscriber
from django.shortcuts import redirect
from .models import ContactInquiry

# Create your views here.

def home(request):
    return render(request, 'home.html')


def newsletter_subscribe(request):
    if request.method == "POST":
        email = request.POST.get("email")

        if email:
            NewsletterSubscriber.objects.get_or_create(
                email=email
            )

        return redirect(request.META.get('HTTP_REFERER', '/'))
  

def contact(request):
    return render(request, 'contacts.html')

def contact_submit(request):

    if request.method == "POST":

        ContactInquiry.objects.create(
            name=request.POST.get("name"),
            email=request.POST.get("email"),
            phone=request.POST.get("phone"),
            message=request.POST.get("message")
        )
        messages.success(
            request,
            "Thank you! We have received your inquiry."
        )

        return redirect("contact")

    return redirect("contact")
    

def about(request):
    return render(request, 'about.html')

def terms(request):
    return render(request, 'terms_conditions.html')

def privacy(request):
    return render(request, 'privacy_policy.html')

def services(request):
    return render(request, 'services.html') 

def work(request):
    return render(request, 'work.html') 