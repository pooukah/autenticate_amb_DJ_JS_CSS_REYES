from django.shortcuts import render, redirect
from .models import Person
from .form import PersonForm, loginForm

# 1. CREATE / REGISTRE
def registre(request):
    form = PersonForm()
    if request.method == "POST":
        form = PersonForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    context = {'formulari':form}
    return render(request, 'registre.html', context)

# 2. LOGIN
def login(request):
    form = loginForm()
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = Person.objects.filter(email=email, password=password).first()

        if user:
            return redirect('rols', roltype='all')
        else:
            return render(request, 'login.html', {'formulari': form, 'error': 'Credencials incorrectes'})
    return render(request, 'login.html', {'formulari':form})

# 3. UPDATE
def update_person(request, pk):
    person_id = Person.objects.get(id=pk)
    form = PersonForm(instance=person_id)
    if request.method == "POST":
        form = PersonForm(request.POST, instance=person_id)
        if form.is_valid():
            form.save()
            return redirect('rols', roltype='all')

    context = {"formulari":form}
    return render(request, 'registre.html', context)

# 4. DELETE
def delete_user(request, pk):
    person_id = Person.objects.get(id=pk)
    if request.method == "POST":
        person_id.delete()
        return redirect('rols', roltype='all')
    context = {'person':person_id}
    return render(request, 'deletePerson.html', context)

# 5. INFO ESPECIFICA
def info(request, pk):
    getUserById = Person.objects.get(id=pk)
    response = {"msg":[getUserById]}
    return render(request, 'info.html', response)

# 6. ROLES
def rols(request, roltype):
    if roltype == "all":
        llistaRols = Person.objects.all()
    else:
        llistaRols = Person.objects.filter(rol = roltype)
    msg = {"msg":llistaRols}
    return render(request, 'rols.html', msg)

# 7. TODOS
def all(request):
    getAll = Person.objects.all()
    response = {"msg":getAll}
    return render(request, 'rols.html', response)

