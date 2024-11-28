
let numeroNivelTexto = localStorage.getItem('nivelSeleccionado');
let nombreMundo = localStorage.getItem('titulo-mundo');
numeroNivel = Number(numeroNivelTexto)
let numeroMundo;
if(nombreMundo==='Mundo de las Sumas'){
    numeroMundo = 1;
    numeroNivel = numeroNivel
}else if(nombreMundo==='Mundo de las Restas'){
    numeroMundo = 2;
    numeroNivel = numeroNivel + 15
}else{
    numeroMundo = 3;
    numeroNivel = numeroNivel + 30
}

const tiempoTomado = localStorage.getItem('tiempo-tomado');
const respuestasCorrectas = parseInt(localStorage.getItem('respuestas-correctas'), 10);



console.log('Numero de Mundo: ',numeroMundo);
console.log('Nombre del Mundo: ',nombreMundo);
console.log('Numero de Nivel: ',numeroNivel);
console.log('Tiempo: ',tiempoTomado);
console.log('Respuestas correctas: ',respuestasCorrectas);


document.addEventListener("DOMContentLoaded", function() {
   
    

    const timeTakenElement = document.getElementById('time-taken');
    if (timeTakenElement) {
        timeTakenElement.textContent = `Tu tiempo: ${tiempoTomado}`;
    }

    const starElements = document.querySelectorAll('.star-score');
    starElements.forEach((star, index) => {
        if (index < respuestasCorrectas) {
            star.classList.add('yellow-star');
            star.classList.remove('black-star');
        } else {
            star.classList.add('black-star');
            star.classList.remove('yellow-star');
        }
    });

    const emotionalImageElement = document.querySelector('.emotional-image');
    const emotionalPhrase = document.querySelector('.phrase');
    
    if (emotionalImageElement && emotionalPhrase) {
        if (respuestasCorrectas >= 4) {
            emotionalImageElement.src = bueno;
        } else if (respuestasCorrectas <= 2) {
            emotionalImageElement.src = malo;
        } else{
            emotionalImageElement.src = intermedio;
        }

        switch (respuestasCorrectas) {
            case 0:
                emotionalPhrase.textContent = 'Sigue practicando';
                break;
            case 1:
                emotionalPhrase.textContent = 'No te rindas';
                break;
            case 2:
                emotionalPhrase.textContent = 'Vas mejorando';
                break;
            case 3:
                emotionalPhrase.textContent = 'Lo haces bien';
                break;
            case 4:
                emotionalPhrase.textContent = 'Eres genial';
                break;
            case 5:
                emotionalPhrase.textContent = '¡¡¡PERFECTO!!!';
                break;
        }
    }
    const buttonExit = document.getElementById('button-exit');
    buttonExit.addEventListener('click', function() {
        window.location.href = pantallaMundos;
        sendInfoEjercicio(numeroNivel, respuestasCorrectas, tiempoTomado);
    });

    const buttonReload = document.getElementById('button-reload');
    buttonReload.addEventListener('click', function() {
        const tituloMundo = localStorage.getItem('titulo-mundo');
        if (tituloMundo === 'Mundo de las Sumas') {
            window.location.href = SumaUrl;
        } else if (tituloMundo === 'Mundo de las Restas') {
            window.location.href = RestaUrl;
        } else {
            window.location.href = MultiplicacionUrl;
        }
    });
    const confirmExit = document.getElementById("confirm-exit");
    const exitConfirmed = document.getElementById("exit-confirmed");
    const continueLevel = document.getElementById("continue-level");

    window.addEventListener("popstate", function(event) {
        confirmExit.style.display = "block";
    });

    exitConfirmed.addEventListener("click", function() {
        window.location.href = pantallaMundos;
    });

    continueLevel.addEventListener("click", function() {
        confirmExit.style.display = "none";
        history.pushState(null, null, window.location.href);
    });

    history.pushState(null, null, window.location.href);

    //CONSUMO DE LA API
    async function sendInfoEjercicio(idEjercicio, estrellas, tiempo) {
        const url = 'http://127.0.0.1:8000/Api/addInfo/'; // Reemplaza con la URL real de tu API
        const data = {
            id_ejercicio: numeroNivel, // ID del ejercicio que se quiere registrar
            estrellas: estrellas,      // Cantidad de estrellas (de 1 a 5)
            tiempo: "00:" + tiempo // Tiempo en formato "HH:MM:SS"
        };
        console.log(numeroNivel)
        try {
            // Enviar solicitud POST con fetch
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken') // Si usas CSRF protection en Django
                },
                body: JSON.stringify(data),
                credentials: 'include' // Incluir cookies para autenticación
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log('Registro exitoso:', result);
            } else {
                console.error('Error al registrar:', response.status, await response.text());
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    }
    
    // Función para obtener cookies (necesaria si usas CSRF tokens en Django)
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    
});