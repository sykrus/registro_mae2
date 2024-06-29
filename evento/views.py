from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib import messages

from evento.models import Participante
from .forms import EquipoForm, ParticipanteFormSet

def index(request):
    return render(request, 'evento/index.html')

def bienvenido(request):
    return render(request, 'evento/bienvenido.html')

from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import EquipoForm, ParticipanteFormSet

def equipo_create(request):
    if request.method == 'POST':
        form = EquipoForm(request.POST, request.FILES)
        formset = ParticipanteFormSet(request.POST, request.FILES)
        if form.is_valid() and formset.is_valid():
            equipo = form.save()
            participantes = formset.save(commit=False)
            for participante in participantes:
                participante.equipo = equipo
                participante.save()
            formset.save_m2m()
            messages.success(request, 'Guardado exitosamente')
            return render(request, 'evento/equipo_success.html')
    else:
        form = EquipoForm()
        formset = ParticipanteFormSet(queryset=Participante.objects.none())
        
        # Configurar el sexto formulario adicional para que no sea requerido
        if formset.total_form_count() > 1:
            formset.forms[1].empty_permitted = True
        
        formset.extra = 6
    
    return render(request, 'evento/equipo_form.html', {'form': form, 'formset': formset})
