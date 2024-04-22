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

    @action(methods=['GET'], detail=True)
    def get_total(self, request, pk=None):
        """
        Calculate total cost of items in cart after applying promotion.
        """
        
        def calculate_total_cost(items_in_cart):
            total_cost = 0
            for item in items_in_cart:
                cost = float(item['product']['price'])
                quantity = int(item['quantity'])
                total_cost += cost * quantity
            
            return total_cost
                
        user_id = pk
        
        user_cart = get_object_or_404(UserCart, user_id=user_id)
        user_cart = UserCartSerializer(user_cart).data
        
        promotion = user_cart['selected_promotion']
        
        items_in_cart = CartItem.items_in_cart_manager.get_items_in_cart(user_id)
        items_in_cart = ItemInCartSerializer(items_in_cart, many=True).data
        
        num_items = len(items_in_cart)
        total_cost = calculate_total_cost(items_in_cart)
        
        discount_percentage = float(promotion['discount_percentage']) / 100
        minimum_cart_price = float(promotion["minimum_cart_price"])
        minimum_cart_quanity = float(promotion["minimum_cart_quanity"])
        
        total_dicount = 0
        
        # Give discount if item count is more than a certain amount.
        if minimum_cart_price != None:
            if total_cost >= minimum_cart_price:
                total_dicount += total_cost * discount_percentage
                
        # Give discount if total is more than a certain amount.
        if minimum_cart_quanity != None:
            if num_items >= minimum_cart_quanity:
                total_dicount += total_cost * discount_percentage

        return Response({
            'cost': round(total_cost, 2),
            'discount': round(total_dicount, 2),
            'total_cost': round(total_cost - total_dicount, 2)
        })        

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
            'user_cart': UserCartSerializer(user_cart).data,
            'items_in_cart': ItemInCartSerializer(items_in_cart, many=True).data,
        })
    
    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    
    def partial_update(self, request, pk=None):
        """
        Update quantity of item in cart.
        """
        cart_item_id = pk
        request_data = request.data
            
        quantity = request_data.get('quantity')
        
        # Check if request body contain quantity.
        if quantity == None:
            return Response({
                'status': 'error',
                'message': 'quantity is required'
            }, status=400)
        
        # Check if quantity is a valid integer.
        try:
            quantity = int(quantity)
        except ValueError:
            return Response({
                'status': 'error',
                'message': 'quantity must be an integer'
            }, status=400)
        
        # Check if quantity is less than or equal to 0.
        if quantity <= 0:
            return Response({
                'status': 'error',
                'message': 'quantity must be greater than 0'
            }, status=400)

        cart_item = get_object_or_404(CartItem, pk=cart_item_id)
        cart_item.quantity = quantity
        cart_item.save()
        
        return Response({
            'status': 'success',
            'message': 'Item quantity updated successfully',
        })

    def create(self, request):
        request_data = request.data
        
        user_id = request_data.get('user_id')
        product_id = request_data.get('product_id')        
        if user_id == None or product_id == None:
            return Response({
                'status': 'error',
                'message': 'user_id and product_id are required'
            }, status=400)
        
        # Check if cart-item already exist
        cart_item = CartItem.objects.filter(user_cart__user_id=user_id, product__pk=product_id).first()
        if cart_item:
            cart_item.quantity += 1
            cart_item.save()
            
            return Response({
                'status': 'success',
                'message': 'Item already in user cart, quantity updated',
            })
        
        user_cart = get_object_or_404(UserCart, user_id=user_id)
        product = get_object_or_404(Product, pk=product_id)
        
        cart_item = CartItem.objects.create(user_cart=user_cart, product=product, quantity=1)
        
        return Response({
            'status': 'success',
            'message': 'Item added to cart successfully',
            'cart_item': ItemInCartSerializer(cart_item).data
        })
    
    def destroy(self, request, pk=None):
        """
        Remove item from cart.
        """
        
        cart_item = get_object_or_404(CartItem, pk=pk)
        cart_item.delete()
        
        return Response({
            'status': 'success',
            'message': 'Item removed from cart successfully'
        })


class PromotionViewSet(viewsets.ModelViewSet):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer

    
