from django.urls import path
from .views import InicioPaginaView,TerapiasView, QuienesSomosView, CarritoView, PagosView, listar_reserva, modificar_reserva, eliminar_reserva

urlpatterns = [
    path('', InicioPaginaView.as_view(), name="index"),
    path('terapias', TerapiasView.as_view(), name="terapias"),
    path('quienes-somos/', QuienesSomosView.as_view(), name="quienes-somos"),
    path('carrito/', CarritoView.as_view(), name="carrito"),
    path('pagos/', PagosView.as_view(), name="pagos"),
    path('listar-productos/', listar_reserva, name="listar_reserva"),
    path('modificar-productos/<id>/', modificar_reserva, name="modificar_reserva"),
    path('eliminar-productos/<id>/', eliminar_reserva, name="eliminar_reserva"),
]