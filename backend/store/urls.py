from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'product', views.ProductViewSet, basename='product')
router.register(r'cart-item', views.CartItemViewSet, basename='cart-item')
router.register(r'user-cart', views.UserCartViewSet, basename='user-cart')
router.register(r'promotion', views.PromotionViewSet, basename='promotion')

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
