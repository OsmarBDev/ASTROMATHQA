let preguntaActual = 1;
const totalPreguntas = 5;
let respuestaCorrecta;
let respuestasCorrectas = 0;
let contadorSegundos = 0;
let cronometro;
const nextProblemButton = document.querySelector('.next-problem');

const applesToPutElement = document.querySelector('.apples-to-put');
const questionCounter = document.querySelector('.question-counter');
const titleInstruction = document.querySelector('.title-instruction');
const instructions = document.querySelector('.instructions');

const confirmExit = document.getElementById("confirm-exit");
const exitConfirmed = document.getElementById("exit-confirmed");
const continueLevel = document.getElementById("continue-level");
document.addEventListener("DOMContentLoaded", function() {
   

    window.addEventListener("popstate", function(event) {
        confirmExit.style.display = "block";
        document.querySelector('.principal-container').style.pointerEvents= 'none';
        document.querySelector('.principal-container').style.opacity= '0.3';
        exitVerification();
    });

    exitConfirmed.addEventListener("click", function() {
        window.location.href = pantallaMundos;
    });

    continueLevel.addEventListener("click", function() {
        confirmExit.style.display = "none";
        document.querySelector('.principal-container').style.pointerEvents= 'all';
        document.querySelector('.principal-container').style.opacity= '1';
        exitVerification();
        history.pushState(null, null, window.location.href);
    });

    history.pushState(null, null, window.location.href);
});
window.onload = () => {
    console.log(localStorage.getItem('nivelSeleccionado'));
    console.log(localStorage.getItem('titulo-mundo'));
    seleccionarDificultad();
    manejarRespuesta();
    iniciarCronometro(); 
    
};
document.querySelector('.exit-button').addEventListener('click',function(){
    confirmExit.style.display = "block";
    document.querySelector('.principal-container').style.pointerEvents= 'none';
    document.querySelector('.principal-container').style.opacity= '0.3';
    exitVerification();
});
function exitVerification(){
    if(confirmExit.style.display==='block'){
        
        document.querySelector('.principal-container').style.opacity= '0.3';
        const opciones = document.querySelectorAll('.option');
        opciones.forEach(opcion => {
            opcion.style.pointerEvents = 'none';
        });
    }else{
        document.querySelector('.principal-container').style.opacity= '1';
        const opciones = document.querySelectorAll('.option');
        opciones.forEach(opcion => {
            opcion.style.pointerEvents = 'all';
        });
    }
}

function iniciarCronometro() {
    contadorSegundos = 0; 
    cronometro = setInterval(() => {
        contadorSegundos++;
    }, 1000);
}

function detenerCronometro() {
    clearInterval(cronometro); 

    const horas = Math.floor(contadorSegundos / 3600);
    const minutos = Math.floor((contadorSegundos % 3600) / 60);
    const segundos = contadorSegundos % 60;

    let tiempoFormateado = '';
    if (horas > 0) {
        tiempoFormateado += `${horas.toString().padStart(2, '0')}:`;
    }
    tiempoFormateado += `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

    localStorage.setItem('tiempo-tomado', tiempoFormateado);
    localStorage.setItem('respuestas-correctas', respuestasCorrectas);

    window.location.href = 'Resultados';
}




function generarEjercicioFacil() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    respuestaCorrecta = num1 + num2;

    let respuestas = [respuestaCorrecta];
    while (respuestas.length < 4) {
        let respuestaIncorrecta = Math.floor(Math.random() * 10) + 1;
        if (!respuestas.includes(respuestaIncorrecta)) {
            respuestas.push(respuestaIncorrecta);
        }
    }

    respuestas = respuestas.sort(() => Math.random() - 0.5);

    const questionElement = document.getElementById('question');
    if (questionElement) {
        questionElement.textContent = `${num1} + ${num2} = ?`;
    }

    const optionElements = [
        document.getElementById('option1'),
        document.getElementById('option2'),
        document.getElementById('option3'),
        document.getElementById('option4')
    ];

    optionElements.forEach((option, index) => {
        if (option) {
            option.textContent = respuestas[index];
        }
    });

    actualizarContador();
}

function generarEjercicioMedio() {
    let num1, num2;
    do {
        num1 = Math.floor(Math.random() * 80) + 10; 
        num2 = Math.floor(Math.random() * 80) + 10;
        respuestaCorrecta = num1 + num2;
    } while (respuestaCorrecta >= 100);

    let respuestas = [respuestaCorrecta];
    while (respuestas.length < 4) {
        let respuestaIncorrecta = Math.floor(Math.random() * 90) + 10; 
        if (!respuestas.includes(respuestaIncorrecta)) {
            respuestas.push(respuestaIncorrecta);
        }
    }

    respuestas = respuestas.sort(() => Math.random() - 0.5);

    const questionElement = document.getElementById('question');
    if (questionElement) {
        questionElement.textContent = `${num1} + ${num2} = ?`;
    }

    const optionElements = [
        document.getElementById('option1'),
        document.getElementById('option2'),
        document.getElementById('option3'),
        document.getElementById('option4')
    ];

    optionElements.forEach((option, index) => {
        if (option) {
            option.textContent = respuestas[index];
        }
    });

    actualizarContador();
}

function generarEjercicioDificil() {
    let num1, num2;

    
    do {
        num1 = Math.floor(Math.random() * 800) + 100; 
        num2 = Math.floor(Math.random() * 800) + 100;
        respuestaCorrecta = num1 + num2;
    } while (respuestaCorrecta >= 1000);

    let respuestas = [respuestaCorrecta];
    while (respuestas.length < 4) {
        let respuestaIncorrecta = Math.floor(Math.random() * 900) + 100; 
        if (!respuestas.includes(respuestaIncorrecta)) {
            respuestas.push(respuestaIncorrecta);
        }
    }

    respuestas = respuestas.sort(() => Math.random() - 0.5);

    const questionElement = document.getElementById('question');
    if (questionElement) {
        questionElement.textContent = `${num1} + ${num2} = ?`;
    }

    const optionElements = [
        document.getElementById('option1'),
        document.getElementById('option2'),
        document.getElementById('option3'),
        document.getElementById('option4')
    ];

    optionElements.forEach((option, index) => {
        if (option) {
            option.textContent = respuestas[index];
        }
    });

    actualizarContador();
}


function manejarRespuesta() {
    const opciones = document.querySelectorAll('.option');

    opciones.forEach(opcion => {
        opcion.addEventListener('click', () => {
            const valorSeleccionado = parseInt(opcion.textContent, 10);

            opciones.forEach(opt => {
                opt.style.pointerEvents = 'none';
                opt.classList.remove('hover-efecto');
            });

            if (valorSeleccionado === respuestaCorrecta) {
                opcion.classList.add('correct');
                respuestasCorrectas++;
            } else {
                opcion.classList.add('incorrect');
            }

            opciones.forEach(opt => {
                if (opt !== opcion) {
                    opt.classList.add('disabled');
                }
            });

            setTimeout(() => {
                siguientePregunta();
            }, 3000);
        });
    });
}

function actualizarContador() {
    const contadorElement = document.querySelector('.question-counter');
    if (contadorElement) {
        contadorElement.textContent = `${preguntaActual}/${totalPreguntas}`;
    }
}

function quitarEfectos(){
    nextProblemButton.classList.remove('button-deactive');
    document.querySelector('.body').classList.remove('wrong-answer');
    document.querySelector('.body').classList.remove('correct-answer');
    document.querySelector('.next-problem').classList.remove('button-wrong-answer');
    instructions.classList.remove('wrong-answer');
    titleInstruction.classList.remove('wrong-answer');
    questionCounter.classList.remove('wrong-answer');
    questionCounter.classList.remove('wrong-answer-count');
    applesToPutElement.classList.remove('wrong-answer');
    document.querySelector('.drop-area').classList.remove('wrong-answer-drop');

    instructions.classList.remove('correct-answer');
    titleInstruction.classList.remove('correct-answer');
    questionCounter.classList.remove('correct-answer');
    questionCounter.classList.remove('correct-answer-count');
    applesToPutElement.classList.remove('correct-answer');
    document.querySelector('.drop-area').classList.remove('correct-answer-drop');
}

function siguientePregunta() {
    quitarEfectos();
    mostrarEjercicioAleatorio();
    if (preguntaActual < totalPreguntas) {
        preguntaActual++;
        seleccionarDificultad();
        const opciones = document.querySelectorAll('.option');
        opciones.forEach(opcion => {
            opcion.classList.remove('correct', 'incorrect', 'disabled');
            opcion.style.pointerEvents = 'auto';
        });
    } else {
        detenerCronometro(); 
    }
}







const basket = document.querySelector('.basket');
const dropArea = document.querySelector('.drop-area');

let isDragging = false; 
let apple = null;

basket.addEventListener('click', (e) => {
    isDragging = true; 

    apple = document.createElement('img');
    apple.src = imageUrl;
    apple.classList.add('apple');
    apple.style.position = 'absolute';
    apple.style.zIndex = '1000';
    document.body.appendChild(apple);

    const moveApple = (event) => {
        if (isDragging) {
            apple.style.left = `${event.pageX - 25}px`;
            apple.style.top = `${event.pageY - 25}px`;
        }
    };

    document.addEventListener('mousemove', moveApple);

    const dropApple = (event) => {
        if (isDragging) {
            isDragging = false; 
            document.removeEventListener('mousemove', moveApple);

            const dropRect = dropArea.getBoundingClientRect();
            if (
                event.clientX > dropRect.left &&
                event.clientX < dropRect.right &&
                event.clientY > dropRect.top &&
                event.clientY < dropRect.bottom
            ) {
                const droppedApple = apple.cloneNode();
                dropArea.appendChild(droppedApple);

                const dropOffsetX = event.clientX - dropRect.left;
                const dropOffsetY = event.clientY - dropRect.top;
                droppedApple.style.left = `${dropOffsetX - 25}px`;
                droppedApple.style.top = `${dropOffsetY - 25}px`;

                droppedApple.addEventListener('mousedown', (e) => {
                    e.stopPropagation();
                });
            }

            document.body.removeChild(apple);
            apple = null;
        }

        document.removeEventListener('mouseup', dropApple);
    };

    document.addEventListener('mouseup', dropApple);
});

function generarEjercicioDeManzanas() {
    const numeroManzanas = Math.floor(Math.random() * 10) + 1;
    

    if (applesToPutElement) {
        applesToPutElement.textContent = `${numeroManzanas}`;
    }

    
    if (dropArea) {
        dropArea.innerHTML = '';
    }

   
    if (nextProblemButton) {
        nextProblemButton.onclick = () => {
            verificarCantidadManzanas(numeroManzanas);
            nextProblemButton.classList.add('button-deactive');
        };
    }
}

function verificarCantidadManzanas(numeroManzanasEsperadas) {
    if (dropArea) {
        const manzanasEnCuadro = dropArea.querySelectorAll('.apple').length;

        
        if (manzanasEnCuadro === numeroManzanasEsperadas) {
            respuestasCorrectas++;
            document.querySelector('.body').classList.toggle('correct-answer');
            instructions.classList.toggle('correct-answer');
            titleInstruction.classList.toggle('correct-answer');
            questionCounter.classList.toggle('correct-answer');
            questionCounter.classList.toggle('correct-answer-count');
            applesToPutElement.classList.toggle('correct-answer');
            document.querySelector('.drop-area').classList.toggle('correct-answer-drop');

            setTimeout(() => {
                siguientePregunta();
            }, 3000);
        } else {
            document.querySelector('.body').classList.toggle('wrong-answer');
            document.querySelector('.next-problem').classList.toggle('button-wrong-answer');
            
            instructions.classList.toggle('wrong-answer');
            titleInstruction.classList.toggle('wrong-answer');
            questionCounter.classList.toggle('wrong-answer');
            questionCounter.classList.toggle('wrong-answer-count');
            applesToPutElement.classList.toggle('wrong-answer');
            document.querySelector('.drop-area').classList.toggle('wrong-answer-drop');


            setTimeout(() => {
                siguientePregunta();
            }, 3000);
        }
    }
}

function mostrarEjercicioAleatorio() {
    const ejercicioPregunta = document.querySelector('.question');
    const respuestas = document.querySelector('.answers');
    const resultBox = document.querySelector('#result-box');
    const dragDropSection = document.querySelector('.drag-drop-section');

    ejercicioPregunta.style.display = 'none';
    respuestas.style.display = 'none';
    dragDropSection.style.display = 'none';

    const tipoEjercicio = Math.floor(Math.random() * 2);

    if (tipoEjercicio === 0) {
        ejercicioPregunta.style.display = 'flex';
        respuestas.style.display = 'flex';
        seleccionarDificultad();
    } else {
        dragDropSection.style.display = 'flex';
        generarEjercicioDeManzanas();
    }
}




mostrarEjercicioAleatorio();

function seleccionarDificultad(){
    

        const nivelSeleccionado = parseInt(localStorage.getItem('nivelSeleccionado'));
        if (nivelSeleccionado >= 1 && nivelSeleccionado <= 5) {
            generarEjercicioFacil();
        } else if (nivelSeleccionado >= 6 && nivelSeleccionado <= 10) {
            generarEjercicioMedio();
        } else if (nivelSeleccionado >= 11 && nivelSeleccionado <= 15) {
            generarEjercicioDificil();
        }
}


