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
        context['form'] = ReservationForm(user=self.request.user)  
        return context
    
    def post(self, request, *args, **kwargs):
        data = self.get_context_data()
        reservaform = ReservationForm(request.POST, user=request.user)
        if reservaform.is_valid():
            reservaform.save()
            data["mensaje"] = "Reserva guardada con éxito."
        else:
            data["form"] = reservaform
        return self.render_to_response(data)

class QuienesSomosView(TemplateView):
    template_name = "core/quienes-somos.html"

class CarritoView(TemplateView):
    template_name = "core/carrito.html"
    
class PagosView(TemplateView):
    template_name = "core/pagos.html"

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
        form = ReservationForm(instance=reservas)
        form.fields.pop('correo_confirm', None)
    data = {
        'form': ReservationForm(instance=reservas)
    }
    
    
    return render(request, 'core/reserva/modificar.html',data)

def eliminar_reserva(request, id):
    reservas = get_object_or_404(ReservaHora, id=id)
    reservas.delete()
    return redirect('listar_reserva')