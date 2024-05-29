from django.urls import path,include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'get-task',views.TaskViewset)

urlpatterns = [
    
    path('', include(router.urls)),
    path('token/', views.add_task, name='add_task'),
    path('verific-exist/', views.verific_exist, name='verific_exist'),
    path('edit-task/', views.edit_task, name='edit_task'),
    path('delete-task/', views.delete_task, name='delete_task'),
  
]
