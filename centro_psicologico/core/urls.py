from django.urls import path
from .views import InicioPaginaView, TerapiasView, QuienesSomosView, CarritoView, PagosView, listar_reserva, modificar_reserva, eliminar_reserva

urlpatterns = [
    path('', InicioPaginaView.as_view(), name="index"),
    path('terapias', TerapiasView.as_view(), name="terapias"),
    path('quienes-somos/', QuienesSomosView.as_view(), name="quienes-somos"),
    path('carrito/', CarritoView.as_view(), name="carrito"),
    path('carrito/<int:reserva_id>/', CarritoView.as_view(), name="carrito"),
    path('pagos/<int:reserva_id>/', PagosView.as_view(), name="pagos"),
    path('listar-reservas/', listar_reserva, name="listar_reserva"),
    path('modificar-reservas/<id>/', modificar_reserva, name="modificar_reserva"),
    path('eliminar-reservas/<id>/', eliminar_reserva, name="eliminar_reserva"),
]
