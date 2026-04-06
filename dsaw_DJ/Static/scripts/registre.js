//////////////////////////////////////////////// DOM
const form = document.querySelector("form");
const inputs = document.querySelectorAll('input');
const tipusDocument = document.querySelector('#id_document');
const numDocument = document.querySelector('#id_numDoc');

//////////////////////////////////////////////// VARIABLES
const emailInput = document.querySelector('#id_email');
const telefonInput = document.querySelector('#id_telefon');
const postalInput = document.querySelector('#id_codiPostal');
const dataInput = document.querySelector('#id_dataNaix');
const passwordInput = document.querySelector('#id_password');

//////////////////////////////////////////////// REGLES
const regles = {
    nom: {
        regex: /^[A-Za-zÀ-ÿ\s]{2,}$/,
        error: 'El nom ha de tenir almenys 2 caràcters'
    },
    email: {
        regex: /^[\w\.-]+@[\w\.-]+\.\w{2,4}$/,
        error: 'Format incorrecte. Exemple: usuari@domini.cat'
    },
    dataNaix: {
        regex: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
        error: 'Format incorrecte. Ha de ser mm/dd/yyyy'
    },
    telefon: {
        regex:  /^[6789]\d{8}$/,
        error: 'Ha de començar per 6, 7, 8 o 9 i tenir 9 dígits'
    },
    codiPostal: {
        regex: /^\d{5}$/,
        error: 'Ha de tindre exactament 5 digits'
    },
    password: {
        regex: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        error: 'Mínim 8 caràcters, una majúscula, un número, i un caràcter especial'
    }
}

//////////////////////////////////////////////// FUNCIONES
// mostra error als inputs
const mostrarError = function(input, msg){
    let errorSpan = input.parentElement.querySelector('.error');
    if(!errorSpan){
        errorSpan = document.createElement('span');
        errorSpan.className = 'error';
        input.parentElement.appendChild(errorSpan);
    }
    errorSpan.textContent = msg;
    input.classList.add('error-input');
}

// esborra l'error del input
const esborrarError = function(input){
    let errorSpan = input.parentElement.querySelector('.error');
    if(errorSpan){
        errorSpan.textContent = '';
    }
    input.classList.remove('error-input');
}

// valida el document
const validarDoc = function(){
    const tipus = document.getElementById('id_document').value;
    const valor = document.getElementById('id_numDoc').value;

    let patro;
    if(tipus === 'NIE'){
        patro = /^[XZ]\d{7}[A-Z]$/;
    }else if(tipus === 'DNI'){
        patro = /^\d{8}[A-Z]$/;
    }else if(tipus === 'PASSPORT'){
        patro = /^[A-Z]{3}\d{6}$/;
    }

    if(!patro.test(valor.toUpperCase())){
        mostrarError(numDocument, `Format incorrecte per a ${tipus}`);
        return false;
    }
    esborrarError(numDocument);
    return true;
}

// per a validar els camps
const validarCamp = function(input){
    const nom = input.name;

    if(!input.value.trim()){
        mostrarError(input, 'Aquest camp es obligatori');
        return false;
    }
    if(regles[nom] && !regles[nom].regex.test(input.value)){
        mostrarError(input, regles[nom].error);
        return false;
    }
    esborrarError(input);
    return true;
}

// placeholder dels documents
const docPlaceholder = function(){
    const tipus = tipusDocument.value;
    if (tipus === 'DNI') {
        numDocument.placeholder = 'Exemple: 12345678A';
    } else if (tipus === 'NIE') {
        numDocument.placeholder = 'Exemple: X1234567A';
    } else if (tipus === 'PASSPORT') {
        numDocument.placeholder = 'Exemple: ABC123456';
    }
}

// funcio per placeholder
const init = function(){
    if(emailInput) emailInput.placeholder = 'exemple@domini.cat';
    if(telefonInput) telefonInput.placeholder = '612345678';
    if(postalInput) postalInput.placeholder = '08001';
    if(dataInput) dataInput.placeholder = 'mm/dd/yyyy';
    if(passwordInput) passwordInput.placeholder = 'Abc123!@';
    docPlaceholder();
}

//////////////////////////////////////////////// ADD EVENT LISTENERS
init();

if(tipusDocument){
    tipusDocument.addEventListener('change', docPlaceholder);
}

inputs.forEach(input => {
    if(input.type==='hidden' || input.type==='submit') return;
    input.addEventListener('blur', () => validarCamp(input));
});

if(numDocument){
    numDocument.addEventListener('blur', () => validarDoc());
}
if(tipusDocument){
    tipusDocument.addEventListener('change', () => validarDoc());
}

form.addEventListener('submit', (e) => {
    let valid = true;

    inputs.forEach(input => {
        if(input.type ==='hidden' || input.type === 'submit') return;
        if(!validarCamp(input)) valid = false;
    });

    if(!validarDoc()) valid = false;
    if(!valid) e.preventDefault();
});