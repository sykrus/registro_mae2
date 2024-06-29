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
        fields = ['nombre', 'email', 'nickname', 'discord', 'nacionalidad', 'edad']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Hacer que los campos no sean requeridos inicialmente
        for field_name, field in self.fields.items():
            field.required = False
            field.widget.attrs.update({'required': ''})  # Eliminar el atributo required si se añadió

# Configuración del FormSet para Participante utilizando el formulario personalizado
ParticipanteFormSet = inlineformset_factory(
    Equipo, Participante, form=ParticipanteForm, extra=1, can_delete=True, max_num=7
)
