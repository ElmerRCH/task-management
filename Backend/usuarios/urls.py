from django.urls import path,include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'login',views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('prueba/', views.log_user, name='log_user'),
    path('registrar/', views.registrar_user, name='registrar_user'),
      
]
