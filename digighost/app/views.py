from django.shortcuts import render

# Create your views here.

def home(request):
    return render(request, 'home.html')

def contact(request):
    return render(request, 'contacts.html')

def about(request):
    return render(request, 'about.html')

def terms(request):
    return render(request, 'terms_conditions.html')

def privacy(request):
    return render(request, 'privacy_policy.html')

def services(request):
    return render(request, 'services.html') 