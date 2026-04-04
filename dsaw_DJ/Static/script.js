const regles = {
    email: {
        // \w+      uno o mas caracteres
        // @        el arroba xd
        // \.       el punto
        regex: /\w+@\w+\.\w+/,
        error: 'Format incorrecte. Exemple: usuari@domini.cat'
    },
    dataNaix: {
        // \d{2}    2 digitos
        // \/       la barra de /
        // \d{4}    4 digitos
        regex: /\d{2}\/\d{2}\/\d{4}/,
        error: 'Format incorrecte. Ha de ser dd/mm/yyyy'
    },
    telefon: {
        // [6789]   que empiece por uno de estos nums
        // \d{8}    seguido de 8 digitos mas
        regex: /[6789]\d{8}/,
        error: 'Ha de començar per 6, 7, 8 o 9 i tenir 9 dígits'
    },
    codiPostal: {
        // \d{5}    5 digitos
        regex: /\d{5}/,
        error: 'Ha de tindre exactament 5 digits'
    },
    password: {
        // [A-Za-z\d!@#$%^&*] cualquier mayuscula, minuscula, y caracter especial
        // {8, 20}  entre 8 y 20 caracteres
        regex: /[A-Za-z\d!@#$%^&*]{8,20}/,
        error: 'Mínim 8 caràcters, una majúscula, un número, i un caràcter especial'
    }
}