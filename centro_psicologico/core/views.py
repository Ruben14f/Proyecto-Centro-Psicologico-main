from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic.base import TemplateView
from .forms import ReservationForm
from .models import ReservaHora
# Create your views here.

class InicioPaginaView(TemplateView):
    template_name = "core/index.html"

class TerapiasView(TemplateView):
    template_name = "core/terapias.html"
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['form'] = ReservationForm()
        return context
    
    def post(self, request, *args, **kwargs):
        reservaform = ReservationForm(request.POST)
        if reservaform.is_valid():
            reserva = reservaform.save()  # Guardar la reserva y obtener el objeto
            return redirect('pagos', reserva_id=reserva.id)  # Redirigir a la vista de pagos con el ID de la reserva
        return self.render_to_response(self.get_context_data(form=reservaform))

class QuienesSomosView(TemplateView):
    template_name = "core/quienes-somos.html"

class CarritoView(TemplateView):
    template_name = "core/carrito.html"
    
    def get(self, request, reserva_id):
        reserva = get_object_or_404(ReservaHora, pk=reserva_id)
        context = {
            'reserva': reserva,
            'reserva_id': reserva_id
        }
        return render(request, self.template_name, context)


class PagosView(TemplateView):
    template_name = "core/pagos.html"
    
    def get(self, request, reserva_id):
        reserva = get_object_or_404(ReservaHora, pk=reserva_id)
        context = {
            'reserva': reserva,
            'reserva_id': reserva_id
        }
        return render(request, self.template_name, context)
    
    
def listar_reserva(request):
    
    reservas = ReservaHora.objects.all()
    data = {
        'reservas': reservas
    }
    return render(request, 'core/reserva/listar.html', data)
def modificar_reserva(request, id):
    
    reservas = get_object_or_404(ReservaHora, id=id)
    
    if request.method == 'POST':
        formulario = ReservationForm(data=request.POST, instance=reservas)
        if formulario.is_valid():
            formulario.save()
            return redirect('listar_reserva')
    else:
        formulario = ReservationForm(instance=reservas)
        
    data = {
        'form': ReservationForm(instance=reservas)
    }
    
    return render(request, 'core/reserva/modificar.html',data)

def eliminar_reserva(request, id):
    reservas = get_object_or_404(ReservaHora, id=id)
    reservas.delete()
    return redirect('listar_reserva')