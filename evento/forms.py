from django import forms
from django.forms.models import inlineformset_factory
from .models import Equipo, Participante

class EquipoForm(forms.ModelForm):
    class Meta:
        model = Equipo
        fields = ['nombre', 'logo']

ParticipanteFormSet = inlineformset_factory(
    Equipo, Participante, fields=['nombre', 'email', 'nickname'], extra=1, can_delete=True, max_num=7
)
