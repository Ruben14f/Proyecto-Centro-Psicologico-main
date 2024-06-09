from django.shortcuts import render
from django.views.generic.base import TemplateView
# Create your views here.

class InicioPaginaView(TemplateView):
    template_name = "core/index.html"

class TerapiasView(TemplateView):
    template_name = "core/terapias.html"

class QuienesSomosView(TemplateView):
    template_name = "core/quienes-somos.html"