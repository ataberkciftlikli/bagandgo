from django.urls import path, include
from rest_framework import routers

<<<<<<< Updated upstream
from .views import register_view, login_view, ProductCategoryViewSet, ProductViewSet
=======
from .views import register_view, login_view, ProductCategoryViewSet, ProductViewSet, add_to_cart, view_cart, checkout, update_user_profile, update_password, logout, get_liked_products, like_product, get_orders, check_order_confirmation, get_user_profile, remove_from_cart
>>>>>>> Stashed changes

router = routers.DefaultRouter()

router.register('product-categories', ProductCategoryViewSet)
router.register('products', ProductViewSet)

urlpatterns = [
    path('product/', include(router.urls)),
    path('register/', register_view, name='register-api'),
    path('login/', login_view, name = 'login-api'),
<<<<<<< Updated upstream
]
=======
    path('profile/', get_user_profile, name='get_user_profile'),
    path('logout/', logout, name='logout'),
    path('cart/add/', add_to_cart, name='add_to_cart'),
    path('cart/remove/', remove_from_cart, name='remove_from_cart'),
    path('cart/view/', view_cart, name='view_cart'),
    path('cart/checkout/', checkout, name='checkout'),
    path('profile/update/', update_user_profile, name='update_profile'),
    path('profile/update-password/', update_password, name='update_password'),
    path('liked-products/', get_liked_products, name='get_liked_products'),
    path('like-product/', like_product, name='like_product'),
    path('orders/', get_orders, name='get_orders'),
    path('check-order-confirmation/', check_order_confirmation, name='check_order_confirmation')
    ]
>>>>>>> Stashed changes
