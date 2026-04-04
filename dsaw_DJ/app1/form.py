from django.forms import ModelForm
from .models import Person

class PersonForm(ModelForm):
    class Meta:
        model = Person
        fields = '__all__'

class loginForm(ModelForm):
    class Meta:
        model = Person
        fields = ['email', 'password']