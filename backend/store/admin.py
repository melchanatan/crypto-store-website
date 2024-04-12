from django.contrib import admin
from .models import Product, UserCart, Promotion, CartItem

admin.site.register(Product)
admin.site.register(UserCart)
admin.site.register(Promotion)
admin.site.register(CartItem)
# Register your models here.
