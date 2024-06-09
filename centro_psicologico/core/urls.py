from django.urls import path
from .views import InicioPaginaView,TerapiasView, QuienesSomosView

urlpatterns = [
    path('', InicioPaginaView.as_view(), name="index"),
    path('terapias', TerapiasView.as_view(), name="terapias"),
    path('quienes-somos/', QuienesSomosView.as_view(), name="quienes-somos"),
]