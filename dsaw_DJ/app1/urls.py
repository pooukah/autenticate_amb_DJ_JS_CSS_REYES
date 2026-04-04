from django.urls import path
from . import views

urlpatterns = [
    path("", views.login, name="login"), # iniciar sesion
    path("users/registre/", views.registre, name="registre"), # crear cuenta
    path("users/rols/<str:roltype>", views.rols, name="rols"), # roles con botones y link mes info...
    path("info/<int:pk>", views.info, name="info"), # info específica de un usuario
    path("updateUser/<int:pk>", views.update_person, name="update"), # actualizar info de un usuario
    path("deleteUser/<int:pk>", views.delete_user, name="delete"), # borrar usuario
]