from django.shortcuts import render
from django.views.generic.base import TemplateView
from .forms import ReservationForm
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
        data = self.get_context_data()
        reservaform = ReservationForm(data=request.POST)
        if reservaform.is_valid():
            reservaform.save()
            data["mensaje"] = "contacto guardado"
        else:
            data["form"] = reservaform
        return self.render_to_response(data)

class QuienesSomosView(TemplateView):
    template_name = "core/quienes-somos.html"

