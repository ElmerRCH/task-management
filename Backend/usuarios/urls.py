from django.urls import path,include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'login-test',views.UserViewSet)

"""class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        # Puedes añadir datos adicionales al payload del token aquí
        data.update({'email': self.user.email})
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

"""
urlpatterns = [
    
    path('', include(router.urls)),
    path('registrar/', views.registrar_user, name='registrar_user'),
    path('login/', views.login_user, name='login_user'),
    path('set_session_data/', views.set_session_data, name='set_session_data'),
    
    path('verificar-email/', views.verificar_email, name='verificar_email'),
    
    # path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair')
    
]
