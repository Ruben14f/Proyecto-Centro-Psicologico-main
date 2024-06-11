from django import forms
from .models import ReservaHora


class ReservationForm(forms.ModelForm):
    class Meta:
        model = ReservaHora
        fields = '__all__'