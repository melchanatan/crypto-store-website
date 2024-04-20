import uuid
from django.db import models


class Promotion(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    discount_percentage = models.DecimalField(max_digits=10, decimal_places=2)
    minimum_cart_quanity = models.IntegerField()
    minimum_cart_price = models.DecimalField(
        max_digits=10, decimal_places=2, default=0
    )


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity_on_hand = models.IntegerField()
    created_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-id"]


class UserCart(models.Model):
    user_id = models.CharField(max_length=255)
    created_date = models.DateTimeField(auto_now=True)
    selected_promotion = models.ForeignKey(
        Promotion, on_delete=models.SET_NULL, null=True)
    objects = models.Manager()

    def __str__(self):
        return str(self.user_id)
    
    
class ItemsInCartManager(models.Manager):
    # get all items in specific user cart
    def get_items_in_cart(self, user_id):
        return super().get_queryset().filter(user_cart__user_id=user_id)

class CartItem(models.Model):
    user_cart = models.ForeignKey(UserCart, on_delete=models.CASCADE, default=None)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    items_in_cart_manager = ItemsInCartManager()
    objects = models.Manager()

    def __str__(self):
        return str(self.product.name)

    class Meta:
        ordering = ["-id"] 
    


