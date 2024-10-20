from django.urls import path
from .views import register_view, login_view

urlpatterns = [
    path('register/', register_view, name='register-api'),
    path('login/', login_view, name = 'login-api'),
]