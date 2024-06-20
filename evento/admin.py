from django.contrib import admin
from .models import Equipo, Participante
from .forms import EquipoForm, ParticipanteFormSet

class ParticipanteInline(admin.TabularInline):
    model = Participante
    formset = ParticipanteFormSet
    extra = 1
    max_num = 7

class EquipoAdmin(admin.ModelAdmin):
    form = EquipoForm
    inlines = [ParticipanteInline]

admin.site.register(Equipo, EquipoAdmin)
