from django.test import TestCase
from .views import register_view, login_view, ProductCategoryViewSet, ProductViewSet, add_to_cart, view_cart, checkout, update_user_profile, update_password, logout, get_liked_products, like_product, get_orders, check_order_confirmation, get_user_profile, remove_from_cart
from rest_framework.test import APIRequestFactory
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User
from .models import ProductCategory, Product, Bag, Order, LikedProduct
from rest_framework.authtoken.models import Token

class TestRegisterView(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = register_view
        self.url = reverse('register-api')
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.data = {
            'username': 'testuser',
            'password': 'testpassword',
            'first_name': 'test',
            'last_name': 'user',
            'email': 'test@test.com'
        }
    def test_register_view(self):
        request = self.factory.post(self.url, self.data)
        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)

class TestLoginView(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = login_view
        self.url = reverse('login-api')
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.data = {
            'username': 'testuser',
            'password': 'testpassword'
        }
    def test_login_view(self):
        request = self.factory.post(self.url, self.data)
        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('token' in response.data)
        self.assertTrue('user' in response.data)

class TestProductCategoryViewSet(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = ProductCategoryViewSet.as_view({'get': 'list'})
        self.url = reverse('productcategory-list')
        self.category = ProductCategory.objects.create(name='testcategory')
    def test_product_category_viewset(self):
        request = self.factory.get(self.url)
        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'testcategory')

class TestProductViewSet(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = ProductViewSet.as_view({'get': 'list'})
        self.url = reverse('product-list')
        self.category = ProductCategory.objects.create(name='testcategory')
        self.product = Product.objects.create(name='testproduct', category=self.category, price=100, stock=10, barcode='123456')
    def test_product_viewset(self):
        request = self.factory.get(self.url)
        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'testproduct')
    
class TestAddToCart(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = add_to_cart
        self.url = reverse('add_to_cart')
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.category = ProductCategory.objects.create(name='testcategory')
        self.product = Product.objects.create(name='testproduct', category=self.category, price=100, stock=10, barcode='123456')
        self.data = {
            'product_id': self.product.id,
            'quantity': 5
        }
    def test_add_to_cart(self):
        request = self.factory.post(self.url, self.data)
        request.user = self.user
        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Bag.objects.count(), 1)
        self.assertEqual(Bag.objects.first().quantity, 5)

class TestViewCart(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = view_cart
        self.url = reverse('view_cart')
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.category = ProductCategory.objects.create(name='testcategory')
        self.product = Product.objects.create(name='testproduct', category=self.category, price=100, stock=10, barcode='123456')
        self.bag = Bag.objects.create(user=self.user, product=self.product, quantity=5)
    def test_view_cart(self):
        request = self.factory.get(self.url)
        request.user = self.user
        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['product']['name'], 'testproduct')
        self.assertEqual(response.data[0]['quantity'], 5)

class TestCheckout(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = checkout
        self.url = reverse('checkout')
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.category = ProductCategory.objects.create(name='testcategory')
        self.product = Product.objects.create(name='testproduct', category=self.category, price=100, stock=10, barcode='123456')
        self.bag = Bag.objects.create(user=self.user, product=self.product, quantity=5)
        self.data = {
            'address': 'test address',
            'tc': '12345678901'
        }
    def test_checkout(self):
        request = self.factory.post(self.url, self.data)
        request.user = self.user
        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Order.objects.count(), 1)
        self.assertEqual(Order.objects.first().products.count(), 1)
        self.assertEqual(Order.objects.first().total_price, 500)
        self.assertEqual(Bag.objects.count(), 0)

class TestUpdateUserProfile(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = update_user_profile
        self.url = reverse('update_profile')
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.data = {
            'first_name': 'test',
            'last_name': 'user',
            'email': 'test2@test.com'
        }
    def test_update_user_profile(self):
        request = self.factory.post(self.url, self.data)
        request.user = self.user
        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(User.objects.first().email, 'test2@test.com')

class TestUpdatePassword(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = update_password
        self.url = reverse('update_password')
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.data = {
            'old_password': 'testpassword',
            'new_password': 'testpassword2'
        }
    def test_update_password(self):
        request = self.factory.post(self.url, self.data)
        request.user = self.user
        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(User.objects.first().check_password('testpassword2'))

class TestLogout(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = logout
        self.url = reverse('logout')
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.token = Token.objects.create(user=self.user)
    def test_logout(self):
        request = self.factory.post(self.url)
        request.user = self.user
        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Token.objects.filter(user=self.user).exists())

class TestGetLikedProducts(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = get_liked_products
        self.url = reverse('get_liked_products')
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.category = ProductCategory.objects.create(name='testcategory')
        self.product = Product.objects.create(name='testproduct', category=self.category, price=100, stock=10, barcode='123456')
        self.liked_product = LikedProduct.objects.create(user=self.user, product=self.product)
    def test_get_liked_products(self):
        request = self.factory.get(self.url)
        request.user = self.user
        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['product']['name'], 'testproduct')

class TestLikeProduct(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = like_product
        self.url = reverse('like_product')
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.category = ProductCategory.objects.create(name='testcategory')
        self.product = Product.objects.create(name='testproduct', category=self.category, price=100, stock=10, barcode='123456')
        self.data = {
            'product_id': self.product.id
        }
    def test_like_product(self):
        request = self.factory.post(self.url, self.data)
        request.user = self.user
        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(LikedProduct.objects.count(), 1)

class TestGetOrders(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = get_orders
        self.url = reverse('get_orders')
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.category = ProductCategory.objects.create(name='testcategory')
        self.product = Product.objects.create(name='testproduct', category=self.category, price=100, stock=10, barcode='123456')
        self.order = Order.objects.create(user=self.user, total_price=100)
        self.order.products.add(self.product)
    def test_get_orders(self):
        request = self.factory.get(self.url)
        request.user = self.user
        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['products'][0]['name'], 'testproduct')

class TestCheckOrderConfirmation(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = check_order_confirmation
        self.url = reverse('check_order_confirmation')
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.category = ProductCategory.objects.create(name='testcategory')
        self.product = Product.objects.create(name='testproduct', category=self.category, price=100, stock=10, barcode='123456')
        self.order = Order.objects.create(user=self.user, total_price=100)
    def test_check_order_confirmation(self):
        request = self.factory.post(self.url, {'confirmation_code': self.order.confirmation_code})
        request.user = self.user
        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['confirmed'])
        self.assertEqual(Order.objects.first().confirmed, True)

class TestGetUserProfile(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = get_user_profile
        self.url = reverse('get_user_profile')
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.user_profile = UserProfile.objects.create(user=self.user, tc='12345678901', address='test address', birth_year=1990)
    def test_get_user_profile(self):
        request = self.factory.get(self.url)
        request.user = self.user
        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['tc'], '12345678901')
        self.assertEqual(response.data['address'], 'test address')
        self.assertEqual(response.data['birth_year'], 1990)

class TestRemoveFromCart(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = remove_from_cart
        self.url = reverse('remove_from_cart')
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.category = ProductCategory.objects.create(name='testcategory')
        self.product = Product.objects.create(name='testproduct', category=self.category, price=100, stock=10, barcode='123456')
        self.bag = Bag.objects.create(user=self.user, product=self.product, quantity=5)
        self.data = {
            'product_id': self.product.id
        }
    def test_remove_from_cart(self):
        request = self.factory.post(self.url, self.data)
        request.user = self.user
        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Bag.objects.count(), 0)
