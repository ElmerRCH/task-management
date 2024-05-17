from django.urls import path,include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'login-test',views.UserViewSet)

urlpatterns = [
    
    path('', include(router.urls)),
    path('registrar/', views.registrar_user, name='registrar_user'),
    path('login/', views.login_user, name='login_user'),
    path('desencript/', views.desencript, name='desencript'),
    path('verificar-email/', views.verificar_email, name='verificar_email'),
    
]
