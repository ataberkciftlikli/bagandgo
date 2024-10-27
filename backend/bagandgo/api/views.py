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

from bs4 import BeautifulSoup
import requests
import logging

import json
import io
import random
import os

from .models import AuthToken, UserProfile, ProductCategory, Product, Bag, Order
from .serializer import UserSerializer, UserProfileSerializer, RegisterSerializer, LoginSerializer, ProductCategorySerializer, ProductSerializer
from django.http import FileResponse
from django.conf import settings
from django.urls import path

 
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
        try:
            Token.objects.get(user=user).delete()
        except Exception:
            pass
        drf_token = Token.objects.create(user=user)
        token = AuthToken.objects.create(user=user, token=drf_token.key)
        return Response({
            'user': UserSerializer(user).data,
            'token': token.token
            }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
   

@api_view(['POST'])
@permission_classes([AllowAny])  # Allows any user to access this endpoint
def register_view(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    firstname = request.data.get('first_name')
    lastname = request.data.get('last_name')
    address = request.data.get('address')
    tc = request.data.get('tc')
    birth_year = request.data.get('birth_year')


    # Validate input data
    if not username or not email or not password or not firstname or not lastname or not address or not tc or not birth_year:
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
    user = User.objects.create_user(username=username, email=email, password=password, first_name=firstname, last_name=lastname)
    
    drf_token = Token.objects.create(user=user)
    token = AuthToken.objects.create(token=drf_token.key, user=user)
    try:
        new_profile = UserProfile.objects.create(user=user, address=address, tc=tc, birth_year=birth_year, balance=0)
        new_profile.save()
    except Exception as e:
        user.delete()
        return Response({'error': 'Failed to create user profile.'}, status=status.HTTP_400_BAD_REQUEST)
    
    # T.C. identity verification request
    # body = f"""<?xml version="1.0" encoding="UTF-8"?>
    # <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    # <soap:Body>
    #     <TCKimlikNoDogrula xmlns="http://tckimlik.nvi.gov.tr/WS">
    #     <TCKimlikNo>{int(tc)}</TCKimlikNo>
    #     <Ad>{str(firstname)}</Ad>
    #     <Soyad>{str(lastname)}</Soyad>
    #     <DogumYili>{int(birth_year)}</DogumYili>
    #     </TCKimlikNoDogrula>
    # </soap:Body>
    # </soap:Envelope>"""

    # headers = {
    #     'content-type': 'text/xml; charset=UTF-8',
    #     'host': 'tckimlik.nvi.gov.tr',
    # }

    # try:
    #     r = requests.post(
    #         "https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx?WSDL",
    #         headers=headers, data=body.encode('utf-8')
    #     )
    #     xml = BeautifulSoup(r.content, 'xml')
    #     result = xml.find('soap:Body').text

    #     if result != "true":
    #         user.delete()
    #         return Response({"error": "Invalid TC number or user data"}, status=status.HTTP_400_BAD_REQUEST)

    # except Exception as e:
    #     user.delete()
    #     return Response({'error': 'Failed to verify TC number.'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({
        "user": UserSerializer(user).data,
        "token": token.token
        }, status=status.HTTP_201_CREATED)

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
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def view_cart(request):
    user = request.user
    cart_items = Bag.objects.filter(user=user)
    cart_data = [
        {
            'product': ProductSerializer(item.product).data,
            'quantity': item.quantity
        }
        for item in cart_items
    ]
    return Response({'cart': cart_data}, status=status.HTTP_200_OK)

#Add to Cart
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def add_to_cart(request):
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity', 1)
    user = request.user

    try:
        product = Product.objects.get(id=product_id)
        bag, created = Bag.objects.get_or_create(user=user, product=product)
        bag.quantity += quantity
        bag.save()
        return Response({'message': 'Product added to cart successfully.'}, status=status.HTTP_200_OK)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)
    
#Checkout
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def checkout(request):
    user = request.user
    cart_items = Bag.objects.filter(user=user)

    if not cart_items:
        return Response({'error': 'Your cart is empty.'}, status=status.HTTP_400_BAD_REQUEST)

    order = Order.objects.create(user=user)
    for item in cart_items:
        order.products.add(item.product)
        item.delete()  # Remove item from cart after adding to order
    
    return Response({'message': 'Checkout successful. Your order has been placed.'}, status=status.HTTP_200_OK)


