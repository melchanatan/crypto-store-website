from django.shortcuts import render,get_object_or_404
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
    
    @action(methods=['PATCH'], detail=True)
    def update_promotion(self, request, pk=None):
        """
        Update promotion for user cart.
        """
    
        user_id = pk
        request_data = request.data
        
        promotion_id = request_data.get('promotion_id')
        if promotion_id == None:
            return Response({'error': 'promotion_id is required'}, status=400)
                
        # Handle user remove promotion using "-" as parameter.
        user_cart = get_object_or_404(UserCart, user_id=user_id)
        if (promotion_id == "-"):
            user_cart.selected_promotion = None
            user_cart.save()
        
            return Response({
                'status': 'success',
                'message': 'Promotion removed successfully',
                'user_cart': UserCartSerializer(user_cart).data
            })
        else:
            # Add Promotion to user cart
            
            # Get user cart and promotion object
            promotion_object = get_object_or_404(Promotion, pk=promotion_id)
            
            user_cart.selected_promotion = promotion_object
            user_cart.save()
            
            return Response({
                'user_cart': UserCartSerializer(user_cart).data,
            })


    def retrieve(self, request, pk=None):
        """        
        Get User cart infos, if user is not registered create one for them.
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
    serializer_class = ItemInCartSerializer
    

class PromotionViewSet(viewsets.ModelViewSet):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer
