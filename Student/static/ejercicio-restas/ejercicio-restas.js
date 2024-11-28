let preguntaActual = 1;
const totalPreguntas = 5;
let respuestaCorrecta;
let respuestasCorrectas = 0;
let contadorSegundos = 0;
let cronometro;

const nextProblemButton = document.querySelector('.next-problem');
const questionCounter = document.querySelector('.question-counter');


const confirmExit = document.querySelector("#confirm-exit");
const exitConfirmed = document.querySelector("#exit-confirmed");
const continueLevel = document.querySelector("#continue-level");

const dragDropTitle = document.querySelector(".drag-drop-title");
const dropBox = document.querySelectorAll(".drop-box");
const operator = document.querySelectorAll(".operator");

document.addEventListener("DOMContentLoaded", function() {
   
    generarManzanas();
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



function generarRestaFacil() {
    const num1 = Math.floor(Math.random() * (9-1+1)) + 1;
    const num2 = Math.floor(Math.random() * (num1-0+1)) + 0;
    respuestaCorrecta = num1 - num2;

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
        questionElement.textContent = `${num1} - ${num2} = ?`;
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

function generarRestaMedio() {
    let num1, num2;
    do {
        num1 = Math.floor(Math.random() * 80) + 10; 
        num2 = Math.floor(Math.random() * (num1-10+1)) + 10;
        respuestaCorrecta = num1 - num2;
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
        questionElement.textContent = `${num1} - ${num2} = ?`;
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

function generarRestaDificil() {
    let num1, num2;
    do {
        num1 = Math.floor(Math.random() * 800) + 100; 
        num2 = Math.floor(Math.random() * (num1-100+1)) + 100;
        respuestaCorrecta = num1 - num2;
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
        questionElement.textContent = `${num1} - ${num2} = ?`;
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
let resultadoCorrecto; 

function generarManzanas() {
    const box1 = document.getElementById("box1");
    const box2 = document.getElementById("box2");

    const cantidadBox1 = Math.floor(Math.random() * 7) + 2;
    const cantidadBox2 = Math.floor(Math.random() * (cantidadBox1 - 1)) + 1;
    if (dropArea) {
        dropArea.innerHTML = '';
    }
    agregarManzanas(box1, cantidadBox1);
    agregarManzanas(box2, cantidadBox2);

    resultadoCorrecto = cantidadBox1 - cantidadBox2; 
}
function quitarEfectos(){
    dragDropTitle.style.color = 'white';
       
    dropBox.forEach(box => {
        box.style.border = '1px solid white';
    });
    operator.forEach(op => {
        op.style.color = 'white';
    });

    document.querySelector('.drop-area').style.border = '1px dashed white';
}
function ponerEfectos(){
    dragDropTitle.style.color = 'green';
       
    dropBox.forEach(box => {
        box.style.border = '1px solid green';
    });
    operator.forEach(op => {
        op.style.color = 'green';
    });

    document.querySelector('.drop-area').style.border = '1px dashed green';
}
document.querySelector(".next-problem").addEventListener("click", () => {
    const manzanasEnDropArea = dropArea.getElementsByClassName("apple").length;

    if (manzanasEnDropArea === resultadoCorrecto) {
        respuestasCorrectas++;
        ponerEfectos();
        setTimeout(() => {
            siguientePregunta();
        }, 3000);
    } else {
        dragDropTitle.style.color = 'red';
       
        dropBox.forEach(box => {
            box.style.border = '1px solid red';
        });
        operator.forEach(op => {
            op.style.color = 'red';
        });

        document.querySelector('.drop-area').style.border = '1px dashed red';


        setTimeout(() => {
            siguientePregunta();
        }, 3000);
    }
});

function agregarManzanas(container, cantidad) {
    container.innerHTML = "";
    container.style.position = "relative"; 

    for (let i = 0; i < cantidad; i++) {
        const manzana = document.createElement("img");
        manzana.src = imageUrl; 
        manzana.alt = "Misil";
        manzana.classList.add("manzana");

        const randomX = Math.random() * (container.clientWidth - 30); 
        const randomY = Math.random() * (container.clientHeight - 30); 
        manzana.style.position = "absolute";
        manzana.style.left = `${randomX}px`;
        manzana.style.top = `${randomY}px`;

        container.appendChild(manzana);
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



function siguientePregunta() {
    quitarEfectos();
    mostrarEjercicioAleatorio();
    if (preguntaActual < totalPreguntas) {
        preguntaActual++;
        seleccionarDificultad(); /*GENERAR EJERCICIO*/
        const opciones = document.querySelectorAll('.option');
        opciones.forEach(opcion => {
            opcion.classList.remove('correct', 'incorrect', 'disabled');
            opcion.style.pointerEvents = 'auto';
        });
    } else {
        detenerCronometro(); 
    }
}


function mostrarEjercicioAleatorio() {
    const ejercicioPregunta = document.querySelector('.question');
    const respuestas = document.querySelector('.answers');
    const dragDropSection = document.querySelector('.drag-drop-section');
    const tipoEjercicio = Math.floor(Math.random() * 2);


    ejercicioPregunta.style.display = 'flex';
    respuestas.style.display = 'flex';
        

    if (tipoEjercicio === 0) {
        ejercicioPregunta.style.display = 'flex';
        respuestas.style.display = 'flex';

        dragDropSection.style.display = 'none';
        seleccionarDificultad();
    } else {
        dragDropSection.style.display = 'flex';
        ejercicioPregunta.style.display = 'none';
        respuestas.style.display = 'none';
        generarManzanas();
    }
}




mostrarEjercicioAleatorio();

function seleccionarDificultad(){
    const nivelSeleccionado = parseInt(localStorage.getItem('nivelSeleccionado'));
    if (nivelSeleccionado >= 1 && nivelSeleccionado <= 5) {
        generarRestaFacil();
    } else if (nivelSeleccionado >= 6 && nivelSeleccionado <= 10) {
        generarRestaMedio();
    } else if (nivelSeleccionado >= 11 && nivelSeleccionado <= 15) {
        generarRestaDificil();
    }
}


