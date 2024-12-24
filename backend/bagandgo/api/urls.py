from django.urls import path, include
from rest_framework import routers

from .views import register_view, login_view, ProductCategoryViewSet, ProductViewSet

router = routers.DefaultRouter()

router.register('product-categories', ProductCategoryViewSet)
router.register('products', ProductViewSet)

urlpatterns = [
    path('product/', include(router.urls)),
    path('register/', register_view, name='register-api'),
    path('login/', login_view, name = 'login-api'),
]