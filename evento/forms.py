from django import forms
from django.forms.models import inlineformset_factory
from .models import Equipo, Participante

# Formulario para el modelo Equipo
class EquipoForm(forms.ModelForm):
    class Meta:
        model = Equipo
        fields = ['nombre', 'logo']

# Formulario personalizado para el modelo Participante
class ParticipanteForm(forms.ModelForm):
    class Meta:
        model = Participante
        fields = ['nombre', 'email', 'nickname']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Hacer que los campos sean obligatorios
        self.fields['nombre'].required = True
        self.fields['email'].required = True
        self.fields['nickname'].required = True

        # Añadir atributo required a los widgets
        self.fields['nombre'].widget.attrs.update({'required': 'required'})
        self.fields['email'].widget.attrs.update({'required': 'required'})
        self.fields['nickname'].widget.attrs.update({'required': 'required'})

# Configuración del FormSet para Participante utilizando el formulario personalizado
ParticipanteFormSet = inlineformset_factory(
    Equipo, Participante, form=ParticipanteForm, extra=1, can_delete=True, max_num=7
)
