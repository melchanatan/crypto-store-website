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

    @action(detail=True, methods=['GET'])
    def get_user_cart(self, request, pk=True):

        # If the user does not have a cart, create one for them.
        user_id = pk
        if not UserCart.objects.filter(user_id=user_id).exists():
             UserCart.objects.create(user_id=user_id)

        items_in_cart = CartItem.items_in_cart_manager.get_items_in_cart(user_id)
        
        return Response({
             'items_in_cart': ItemInCartSerializer(items_in_cart, many=True).data,
            #  'total_price': sum([item.product.price * item.quantity for item in items_in_cart])
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
