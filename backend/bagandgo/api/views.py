from django.contrib.auth.models import User
from django.http.response import JsonResponse
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt


from django.utils import timezone
from django.shortcuts import redirect, render

from rest_framework import filters, generics, status, viewsets, mixins, permissions
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny


import json
import io
import random
import os

from .models import AuthToken, UserProfile, ProductCategory, Product, Bag, Order
from .serializer import UserSerializer, UserProfileSerializer, RegisterSerializer, LoginSerializer, ProductCategorySerializer, ProductSerializer

 
@api_view(['POST'])
@permission_classes([AllowAny])  # Allows any user to access this endpoint
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password.'},
                        status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(username=username, password=password)
    
    if user is not None:
        login(request, user)
<<<<<<< Updated upstream
        return Response({'message': 'Login successful.'}, status=status.HTTP_200_OK)
=======
        try:
            Token.objects.get(user=user).delete()
        except Exception:
            pass
        drf_token = Token.objects.create(user=user)
        token = AuthToken.objects.create(user=user, token=drf_token.key)
        return Response({
            'user': UserSerializer(user).data,
            'enail': user.email,
            'token': token.token
            }, status=status.HTTP_200_OK)
>>>>>>> Stashed changes
    else:
        return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
   

@api_view(['POST'])
@permission_classes([AllowAny])  # Allows any user to access this endpoint
def register_view(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    # Validate input data
    if not username or not email or not password:
        return Response(
            {'error': 'All fields are required.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Check if username or email is already taken
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username is already taken.'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email is already taken.'}, status=status.HTTP_400_BAD_REQUEST)

    # Create new user
    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)

class ProductCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProductCategory.objects.all().order_by('id')
    serializer_class = ProductCategorySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['id', 'name']
    ordering_fields = ['id', 'name']
    filter_fields = ['id', 'name']

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all().order_by('id')
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
<<<<<<< Updated upstream
    search_fields = ['id', 'name', 'category__name', 'price', 'stock', 'barcode']
    ordering_fields = ['id', 'name', 'category', 'price', 'stock', 'barcode']
    filter_fields = ['id', 'name', 'category', 'price', 'stock', 'barcode']
=======
    search_fields = ['id', 'name', 'category__name', 'price', 'old_price', 'is_discounted', 'stock', 'barcode']
    ordering_fields = ['id', 'name', 'category', 'price', 'old_price', 'is_discounted', 'stock', 'barcode']
    filter_fields = ['id', 'name', 'category', 'price', 'old_price', 'is_discounted', 'stock', 'barcode']

    @action(detail=False, methods=['get'], url_path='product_images/(?P<filename>[^/]+)')
    def image(self, request, filename=None):
        file_path = os.path.join(settings.MEDIA_ROOT, 'product_images', filename)
        if os.path.exists(file_path):
            return FileResponse(open(file_path, 'rb'), content_type='image/jpeg')
        else:
            return Response({'error': 'Image not found.'}, status=status.HTTP_404_NOT_FOUND)
        

#View Cart
@api_view(['POST'])
@permission_classes([AllowAny])
def view_cart(request):
    token = request.data.get('token')
    if not token:
        return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = AuthToken.objects.get(token=token).user
    except AuthToken.DoesNotExist:
        return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        cart_items = Bag.objects.filter(user=user)
        serializer = BagSerializer(cart_items, many=True)
        if not cart_items:
            return Response({'error': 'Cart is empty.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Bag.DoesNotExist:
        return Response({'error': 'Cart is empty.'}, status=status.HTTP_404_NOT_FOUND)
    

#Add to Cart
@api_view(['POST'])
@permission_classes([AllowAny])
def add_to_cart(request):
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity')
    user = request.data.get('token')

    if not product_id:
        return Response({'error': 'Product ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
    if not quantity:
        return Response({'error': 'Quantity is required.'}, status=status.HTTP_400_BAD_REQUEST)
    if not user:
        return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    if product.stock < quantity:
        return Response({'error': 'Not enough stock.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = AuthToken.objects.get(token=user).user
    except AuthToken.DoesNotExist:
        return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        cart_item = Bag.objects.get(user=user, product=product)
        if cart_item.product.stock < cart_item.quantity + quantity:
            return Response({'error': 'Not enough stock.'}, status=status.HTTP_400_BAD_REQUEST)
        cart_item.quantity += quantity
        cart_item.save()
    except Bag.DoesNotExist:
        cart_item = Bag.objects.create(user=user, product=product, quantity=quantity)

    return Response({'message': 'Product added to cart successfully.'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def remove_from_cart(request):
    product_id = request.data.get('product_id')
    user = request.data.get('token')

    if not product_id:
        return Response({'error': 'Product ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
    if not user:
        return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        user = AuthToken.objects.get(token=user).user
    except AuthToken.DoesNotExist:
        return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        cart_item = Bag.objects.get(user=user, product=product)
        cart_item.delete()
    except Bag.DoesNotExist:
        return Response({'error': 'Product not found in cart.'}, status=status.HTTP_404_NOT_FOUND)
    
    return Response({'message': 'Product removed from cart successfully.'}, status=status.HTTP_200_OK)

    
#Checkout
@api_view(['POST'])
@permission_classes([AllowAny])
def checkout(request):
    user = request.data.get('token')
    if not user:
        return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = AuthToken.objects.get(token=user).user
    except AuthToken.DoesNotExist:
        return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)
    
    cart_items = Bag.objects.filter(user=user)
    if not cart_items:
        return Response({'error': 'Cart is empty.'}, status=status.HTTP_404_NOT_FOUND)
    
    total_price = 0
    for cart_item in cart_items:
        total_price += cart_item.product.price * cart_item.quantity

    user_profile = UserProfile.objects.get(user=user)

    if user_profile.balance < total_price:
        return Response({'error': 'Not enough balance.'}, status=status.HTTP_400_BAD_REQUEST)
    
    order = Order.objects.create(user=user, total_price=total_price)
    for cart_item in cart_items:
        order.products.add(cart_item.product)
        cart_item.product.stock -= cart_item.quantity
        cart_item.delete()
    
    user_profile.balance -= total_price
    user_profile.save()

    order_serialized = OrderSerializer(order).data
    
    return Response({'message': 'Order placed successfully.', 'order': order_serialized}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def logout(request):
    token = request.data.get('token')
    if not token:
        return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = AuthToken.objects.get(token=token).user
    except AuthToken.DoesNotExist:
        return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        Token.objects.get(user=user).delete()
    except Exception:
        pass
    return Response({'message': 'Logged out successfully.'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def get_liked_products(request):
    user = request.data.get('token')
    if not user:
        return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = AuthToken.objects.get(token=user).user
    except AuthToken.DoesNotExist:
        return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)
    
    liked_products = LikedProduct.objects.filter(user=user)
    if not liked_products:
        return Response({'error': 'No liked products found.'}, status=status.HTTP_404_NOT_FOUND)
    
    products = [liked_product.product for liked_product in liked_products]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def like_product(request):
    product_id = request.data.get('product_id')
    user = request.data.get('token')

    if not user:
        return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = AuthToken.objects.get(token=user).user
    except AuthToken.DoesNotExist:
        return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)

    if not product_id:
        return Response({'error': 'Product ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    if LikedProduct.objects.filter(user=user, product=product).exists():
        LikedProduct.objects.filter(user=user, product=product).delete()
        return Response({'message': 'Product unliked successfully.'}, status=status.HTTP_200_OK)
    

    LikedProduct.objects.create(user=user, product=product)
    return Response({'message': 'Product liked successfully.'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def get_orders(request):
    user = request.data.get('token')
    if not user:
        return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = AuthToken.objects.get(token=user).user
    except AuthToken.DoesNotExist:
        return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)
    
    orders = Order.objects.filter(user=user)
    if not orders:
        return Response({'error': 'No orders found.'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def check_order_confirmation(request):
    confirmation_code = request.data.get('code')
    user = request.data.get('token')

    if not user:
        return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = AuthToken.objects.get(token=user).user
    except AuthToken.DoesNotExist:
        return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)

    user_admin = user.is_superuser

    if not user_admin:
        return Response({'error': 'You are not authorized to access this endpoint.'}, status=status.HTTP_401_UNAUTHORIZED)

    if not confirmation_code:
        return Response({'error': 'Confirmation code is required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        order = Order.objects.get(confirmation_code=confirmation_code)
    except Order.DoesNotExist:
        return Response({'error': 'Order not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def get_user_profile(request):
    user = request.data.get('token')
    if not user:
        return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = AuthToken.objects.get(token=user).user
    except AuthToken.DoesNotExist:
        return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)
    
    user_profile = UserProfile.objects.get(user=user)
    serializer = UserProfileSerializer(user_profile)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def update_user_profile(request):
    user = request.data.get('token')
    address = request.data.get('address')
    tc = request.data.get('tc')
    birth_year = request.data.get('birth_year')

    if not user:
        return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = AuthToken.objects.get(token=user).user
    except AuthToken.DoesNotExist:
        return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)
    
    user_profile = UserProfile.objects.get(user=user)
    if address:
        user_profile.address = address
    if tc:
        user_profile.tc = tc
    if birth_year:
        user_profile.birth_year = birth_year

    user_profile.save()
    serializer = UserProfileSerializer(user_profile)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def update_password(request):
    user = request.data.get('token')
    old_password = request.data.get('old_password')
    new_password = request.data.get('new_password')

    if not user:
        return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = AuthToken.objects.get(token=user).user
    except AuthToken.DoesNotExist:
        return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)
    
    if not old_password or not new_password:
        return Response({'error': 'Both old and new passwords are required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    if not user.check_password(old_password):
        return Response({'error': 'Invalid old password.'}, status=status.HTTP_400_BAD_REQUEST)
    
    user.set_password(new_password)
    user.save()
    return Response({'message': 'Password updated successfully.'}, status=status.HTTP_200_OK)
>>>>>>> Stashed changes
