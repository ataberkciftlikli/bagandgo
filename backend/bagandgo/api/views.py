from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from django.contrib.auth import authenticate, login
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from pyzbar.pyzbar import decode
from PIL import Image
import io

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
        return Response({'message': 'Login successful.'}, status=status.HTTP_200_OK)
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


@api_view(['POST'])
@permission_classes([AllowAny])  # Allows any user to access this endpoint
def scan_qr_code(request):
    if 'qr_code_image' not in request.FILES:
        return Response({'error': 'Please upload a QR code image.'}, status=status.HTTP_400_BAD_REQUEST)

    qr_code_image = request.FILES['qr_code_image']

    try:
        # Open the uploaded image
        img = Image.open(qr_code_image)

        # Decode the QR code using pyzbar
        decoded_objects = decode(img)

        if not decoded_objects:
            return Response({'error': 'No QR code detected.'}, status=status.HTTP_400_BAD_REQUEST)

        # Extract data from the first decoded QR code
        qr_data = decoded_objects[0].data.decode('utf-8')

        # Respond with the QR code data
        return Response({'message': 'QR code scanned successfully.', 'qr_data': qr_data}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({'error': 'Failed to process QR code image.', 'details': str(e)},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)
