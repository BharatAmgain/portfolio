from django.urls import path
from . import views
from django.http import JsonResponse
from django.views.decorators.http import require_GET

@require_GET
def health_check(request):
    return JsonResponse({"status": "healthy", "message": "Service is running"})

urlpatterns = [
    path('', views.home, name='home'),
    path('success/', views.success, name='success'),
    path('health/', health_check, name='health-check'),
]