from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from .models import Product, CartItem, UserCart, Promotion
from .serializers import ProductSerializer, UserCartSerializer, PromotionSerializer, CartItemSerializer, ItemInCartSerializer
from django.http import JsonResponse


class UserCartViewSet(viewsets.ModelViewSet):
    queryset = UserCart.objects.all()
    serializer_class = UserCartSerializer
    
    def partial_update(self, request, pk=None):
        """
        Update a user's cart.
        """
        
        user_id = pk
        

    def retrieve(self, request, pk=None):
        """
        Retrieve a user's cart.
        """
           
        user_id = pk
        
        #TODO: check valid user ID
        
        # Get user_cart if exist, if not create one for them.
        (user_cart, is_created) = UserCart.objects.get_or_create(user_id=user_id)
        
        # Get all items in the user's cart.
        items_in_cart = CartItem.items_in_cart_manager.get_items_in_cart(user_id)
        
        return Response({
            'user_cart': UserCartSerializer(user_cart ).data,
            'items_in_cart': ItemInCartSerializer(items_in_cart, many=True).data,
        })
    
    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer


class PromotionViewSet(viewsets.ModelViewSet):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer
