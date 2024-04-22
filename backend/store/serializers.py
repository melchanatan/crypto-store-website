from rest_framework import serializers
from .models import Product, CartItem, UserCart, Promotion

class PromotionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Promotion
        fields = "__all__"
      

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields =  "__all__"  


class UserCartSerializer(serializers.ModelSerializer):
    selected_promotion = PromotionSerializer(read_only=True)
    
    def create(self, validated_data):
        return UserCart.objects.create(**validated_data)

    class Meta:
        model = UserCart
        fields = "__all__"
        
        
class CartItemSerializer(serializers.ModelSerializer):
    user_cart = UserCartSerializer(read_only=True)
    product = ProductSerializer(read_only=True)
    
    def create(self, validated_data):
        return CartItem.objects.create(**validated_data)

    class Meta:
        model = CartItem
        fields = "__all__"

class ItemInCartSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    
    class Meta:
        model = CartItem
        fields = ("product", "quantity", "id")

        