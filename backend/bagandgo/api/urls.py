from django.urls import path
from .views import register_view, login_view, scan_qr_code

urlpatterns = [
    path('register/', register_view, name='register-api'),
    path('login/', login_view, name = 'login-api'),
    path('scan-qr/', scan_qr_code, name='scan-qr-api'),
]