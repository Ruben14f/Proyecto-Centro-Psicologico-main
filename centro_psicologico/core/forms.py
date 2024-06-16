from django import forms
from .models import ReservaHora

class ReservationForm(forms.ModelForm):
    class Meta:
        model = ReservaHora
        fields = '__all__'
        labels = {
            'nombre': 'Nombre',
            'apellido': 'Apellido',
            'correo': 'Correo',
            'correo_confirm': 'Confirmar Correo',
            'telefono': 'Teléfono',
            'tipo_consulta': 'Tipo de Terapia',
            'tipo_modalidad': 'Modalidad'
        }
    
    #verificar si esta con sesion iniciada no solicitara el correo del paciente, de lo contrario si solicitara correo
    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user', None)
        super(ReservationForm, self).__init__(*args, **kwargs)
        if user and user.is_authenticated:
            del self.fields['correo']
            del self.fields['correo_confirm']
