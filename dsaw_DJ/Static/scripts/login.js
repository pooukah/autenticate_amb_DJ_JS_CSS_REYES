//////////////////////////////////////////////// DOM
const form = document.querySelector("form");
const emailInput = document.querySelector('#id_email');
const passwordInput = document.querySelector('#id_password');
const inputs = document.querySelectorAll('input');

//////////////////////////////////////////////// REGLES
const regles = {
    email: {
        regex: /^[\w\.-]+@[\w\.-]+\.\w{2,4}$/,
        error: 'Format incorrecte. Exemple: usuari@domini.cat'
    },
    password: {
        regex: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        error: 'Mínim 8 caràcters, una majúscula, un número, i un caràcter especial'
    }
};

//////////////////////////////////////////////// FUNCIONS
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

//////////////////////////////////////////////// ADD EVENT LISTENERS
// BLUR EN INPUTS (es menys molest)
inputs.forEach(input => {
    if(input.type === 'hidden' || input.type === 'submit') return;
    input.addEventListener('blur', () => validarCamp(input));
});

// SUBMIT
form.addEventListener('submit', (e) => {
    let valid = true;

    inputs.forEach(input => {
        if(input.type === 'hidden' || input.type === 'submit') return;
        if(!validarCamp(input)) valid = false;
    });
    if(!valid) e.preventDefault();
});