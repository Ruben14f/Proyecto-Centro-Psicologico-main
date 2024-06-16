from django.urls import path
from .views import InicioPaginaView,TerapiasView, QuienesSomosView, CarritoView, PagosView

urlpatterns = [
    path('', InicioPaginaView.as_view(), name="index"),
    path('terapias', TerapiasView.as_view(), name="terapias"),
    path('quienes-somos/', QuienesSomosView.as_view(), name="quienes-somos"),
    path('carrito/', CarritoView.as_view(), name="carrito"),
    path('pagos/', PagosView.as_view(), name="pagos"),
]