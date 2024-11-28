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
   
    //generarManzanas();
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
document.querySelector('.exit-button').addEventListener('click',function(){
    confirmExit.style.display = "block";
    document.querySelector('.principal-container').style.pointerEvents= 'none';
    document.querySelector('.principal-container').style.opacity= '0.3';
    exitVerification();
});
window.onload = () => {
    console.log(localStorage.getItem('nivelSeleccionado'));
    console.log(localStorage.getItem('titulo-mundo'));
    if(ejercicio1){
        body.classList.add('ejercicio1');
        body.classList.remove('ejercicio2');
    }else{
        body.classList.remove('ejercicio1');
        body.classList.add('ejercicio2');
    }
    seleccionarDificultad();
    manejarRespuesta();
    iniciarCronometro(); 
    
};


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





function generarMultiplicacionFacil() {
    const num1 = Math.floor(Math.random() * (9-1+1)) + 1;
    const num2 = Math.floor(Math.random() * (9-1+1)) + 1;
    respuestaCorrecta = num1 * num2;

    let respuestas = [respuestaCorrecta];
    while (respuestas.length < 4) {
        let respuestaIncorrecta = Math.floor(Math.random() * ((respuestaCorrecta+5)-(respuestaCorrecta-3)+1)) + (respuestaCorrecta-3);
        if (!respuestas.includes(respuestaIncorrecta)) {
            respuestas.push(respuestaIncorrecta);
        }
    }

    respuestas = respuestas.sort(() => Math.random() - 0.5);

    const questionElement = document.getElementById('question');
    if (questionElement) {
        questionElement.innerHTML = `&nbsp;&nbsp;${num2}<br>x&nbsp;${num1}<br>-----<br>&nbsp;&nbsp;?`;
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

function generarMultiplicacionMedio() {
   
    
    const num1 = Math.floor(Math.random() * (9-1+1)) + 1;
    const num2 = Math.floor(Math.random() * (99-10+1)) + 10;
    respuestaCorrecta = num1 * num2;
    let respuestas = [respuestaCorrecta];
    while (respuestas.length < 4) {
        let respuestaIncorrecta = Math.floor(Math.random() * ((respuestaCorrecta+5)-(respuestaCorrecta-3)+1)) + (respuestaCorrecta-3);
        if (!respuestas.includes(respuestaIncorrecta)) {
            respuestas.push(respuestaIncorrecta);
        }
    }

    respuestas = respuestas.sort(() => Math.random() - 0.5);

    const questionElement = document.getElementById('question');
    if (questionElement) {
        questionElement.innerHTML = `&nbsp;&nbsp;${num2}<br>x&nbsp; ${num1}<br>-----<br>&nbsp;&nbsp;?`;
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

function generarMultiplicacionDificil() {
    const num1 = Math.floor(Math.random() * (99-10+1)) + 10;
    const num2 = Math.floor(Math.random() * (99-10+1)) + 10;
    respuestaCorrecta = num1 * num2;
    let respuestas = [respuestaCorrecta];
    while (respuestas.length < 4) {
        let respuestaIncorrecta = Math.floor(Math.random() * ((respuestaCorrecta+5)-(respuestaCorrecta-3)+1)) + (respuestaCorrecta-3);
        if (!respuestas.includes(respuestaIncorrecta)) {
            respuestas.push(respuestaIncorrecta);
        }
    }

    respuestas = respuestas.sort(() => Math.random() - 0.5);

    const questionElement = document.getElementById('question');
    if (questionElement) {
        // Suponiendo que `num1` y `num2` son los números generados para la pregunta
        questionElement.innerHTML = `&nbsp;&nbsp;${num2}<br>x&nbsp;${num1}<br>-----<br>&nbsp;&nbsp;?`;

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
    if (validarRespuestas()) {
        if(contarRespuestas()===10){
            respuestasCorrectas++;
            setTimeout(() => {
                siguientePregunta();
            }, 3000);
        }else{
            setTimeout(() => {
                siguientePregunta();
            }, 3000);
        }
    } 
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
let ejercicio1 = true;
const body = document.querySelector('.body');

function siguientePregunta() {
    if(ejercicio1){
        body.classList.add('ejercicio1');
        body.classList.remove('ejercicio2');
    }else{
        body.classList.remove('ejercicio1');
        body.classList.add('ejercicio2');
    }
    //quitarEfectos();
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
    const tablasMultiplicar = document.querySelector('.tablas-multiplicar');
    const pizarra = document.querySelector('.pizarra-container');
    const mostrar = document.querySelector('.mostrar');
    const tipoEjercicio = Math.floor(Math.random() * 4);
    


    ejercicioPregunta.style.display = 'flex';
    respuestas.style.display = 'flex';
        

    if (tipoEjercicio === 0 || tipoEjercicio === 1 || tipoEjercicio === 2) {
        mostrar.style.display = 'flex';
        tablasMultiplicar.style.display = 'none';
        ejercicio1 = true;
        seleccionarDificultad();
    } else {
        ejercicioPregunta.style.display = 'none';
        respuestas.style.display = 'none';
        pizarra.style.display = 'none';
        mostrar.style.display = 'none';
        tablasMultiplicar.style.display = 'flex';
        ejercicio1 = false;
        generarTablaMultiplicar();
    }
}




mostrarEjercicioAleatorio();

function seleccionarDificultad(){
    if(ejercicio1){
        body.classList.add('ejercicio1');
        body.classList.remove('ejercicio2');
    }else{
        body.classList.remove('ejercicio1');
        body.classList.add('ejercicio2');
    }
    const nivelSeleccionado = parseInt(localStorage.getItem('nivelSeleccionado'));
    if (nivelSeleccionado >= 1 && nivelSeleccionado <= 5) {
        generarMultiplicacionFacil();
    } else if (nivelSeleccionado >= 6 && nivelSeleccionado <= 10) {
        generarMultiplicacionMedio();
    } else if (nivelSeleccionado >= 11 && nivelSeleccionado <= 15) {
        generarMultiplicacionDificil();
    }
}


const canvas = document.getElementById('pizarra');
const ctx = canvas.getContext('2d');
const eraserCursor = document.getElementById('eraser-cursor');

let isDrawing = false;
let currentColor = '#000000';
let isErasing = false;
let eraserSize = 30; 
let eraserColor = '#d3d3d3'; 
let trazos = []; 

function setEraserSize(size) {
    eraserSize = size;
    eraserCursor.style.width = `${eraserSize}px`;
    eraserCursor.style.height = `${eraserSize}px`;
    eraserCursor.style.backgroundColor = eraserColor; 
}

canvas.addEventListener('mousemove', (event) => {
    if (isErasing) {
        canvas.style.cursor = 'none'; 
        eraserCursor.style.display = 'block';
        eraserCursor.style.left = `${event.clientX - eraserSize / 2}px`;
        eraserCursor.style.top = `${event.clientY - eraserSize / 2}px`;
    } else {
        canvas.style.cursor = 'crosshair'; 
        eraserCursor.style.display = 'none';
    }
});

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    if (isErasing) {
        eraseCircle(event);
    } else {
        const pos = getMousePos(event);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);

        trazos.push({
            color: currentColor,
            lineWidth: 3,
            points: [{ x: pos.x, y: pos.y }]
        });
    }
});

canvas.addEventListener('mousemove', (event) => {
    if (isDrawing && isErasing) {
        eraseCircle(event);
    } else if (isDrawing) {
        const pos = getMousePos(event);
        ctx.lineTo(pos.x, pos.y);
        
        const lastTrazo = trazos[trazos.length - 1];
        lastTrazo.points.push({ x: pos.x, y: pos.y });

        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 3;
        ctx.stroke();
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    ctx.closePath();
});

canvas.addEventListener('mouseout', () => {
    isDrawing = false;
    ctx.closePath();
});

document.querySelectorAll('.color-button').forEach(button => {
    button.addEventListener('click', () => {
        currentColor = button.getAttribute('data-color');
        isErasing = false;
        eraserCursor.style.display = 'none'; 
    });
});

document.querySelector('.eraser-button').addEventListener('click', () => {
    isErasing = true;
    eraserCursor.style.backgroundColor = eraserColor; 
});

function eraseCircle(event) {
    const pos = getMousePos(event);
    ctx.save();
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, eraserSize / 2, 0, Math.PI * 2, false);
    ctx.clip();
    ctx.clearRect(pos.x - eraserSize / 2, pos.y - eraserSize / 2, eraserSize, eraserSize);
    ctx.restore();
}

function getMousePos(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (event.clientX - rect.left) * (canvas.width / rect.width),
        y: (event.clientY - rect.top) * (canvas.height / rect.height)
    };
}

const pizarraContainer = document.querySelector('.pizarra-container');

pizarraContainer.addEventListener('mouseleave', () => {
    eraserCursor.style.display = 'none';
});

pizarraContainer.addEventListener('mouseenter', () => {
    if (isErasing) { 
      eraserCursor.style.display = 'block';
   }
});

function redrawCanvas() {
   ctx.clearRect(0, 0, canvas.width, canvas.height); 
   trazos.forEach(trazo => {
       ctx.beginPath();
       ctx.strokeStyle = trazo.color;
       ctx.lineWidth = trazo.lineWidth;

       trazo.points.forEach((point, index) => {
           if (index === 0) {
               ctx.moveTo(point.x, point.y);
           } else {
               ctx.lineTo(point.x, point.y);
           }
       });

       ctx.stroke();
   });
}

document.addEventListener('keydown', (event) => {
   if (event.ctrlKey && event.key === 'z') {
       event.preventDefault(); 
       trazos.pop(); 
       redrawCanvas(); 
   }
});





let respuestaSeleccionada = null; 
let respuestaOriginal = null; 
let respuestaColocada = null; 

function generarTablaMultiplicar() {
    const numeroAleatorio = Math.floor(Math.random() * 9) + 1;
    const tablaContainer = document.getElementById('tabla-container');
    const respuestasContainer = document.getElementById('respuestas-container');
    
    tablaContainer.innerHTML = '';
    respuestasContainer.innerHTML = '';

    const respuestas = [];
    for (let i = 1; i <= 10; i++) {
        const resultado = numeroAleatorio * i;
        respuestas.push(resultado);

        const tablaItem = document.createElement('div');
        tablaItem.classList.add('tabla-item');
        tablaItem.innerHTML = `${numeroAleatorio} x ${i} = `;
        
        const input = document.createElement('div');
        input.classList.add('input');
        input.classList.add('no-respondido');
        input.classList.remove('respondido');
        input.dataset.resultadoCorrecto = resultado;
        tablaItem.appendChild(input);

        tablaContainer.appendChild(tablaItem);
    }

    respuestas.sort(() => Math.random() - 0.5);
    respuestas.forEach(respuesta => {
        const respuestaItem = document.createElement('div');
        respuestaItem.classList.add('respuesta');
        respuestaItem.textContent = respuesta;

        respuestaItem.addEventListener('click', () => {
            respuestaSeleccionada = respuestaItem.textContent;
            respuestaOriginal = respuestaItem;
            respuestaItem.classList.add('respuesta-seleccionada');
            respuestaItem.textContent = ''; 
            respuestaItem.style.border = '1px dashed #ccc'; 
        });

        respuestasContainer.appendChild(respuestaItem);
    });

    const inputs = document.querySelectorAll('.input');
    inputs.forEach(input => {
        input.addEventListener('click', () => {
            if (input.textContent !== '') {
                if (!respuestaSeleccionada) {
                    respuestaColocada = input.textContent;
                    input.textContent = ''; 

                    const respuestaOriginalItem = Array.from(document.querySelectorAll('.respuesta')).find(
                        item => item.textContent === '' && item.classList.contains('respuesta-seleccionada')
                    );
                    
                    if (respuestaOriginalItem) {
                        respuestaOriginalItem.classList.remove('respuesta-seleccionada');
                        respuestaOriginalItem.classList.remove('respuesta-vacia');
                        input.classList.add('no-respondido');
                        input.classList.remove('respondido');
                        respuestaOriginalItem.textContent = respuestaColocada;
                        respuestaOriginalItem.style.border = '1px solid #ccc';
                    }

                    respuestaColocada = null;
                }
                return;
            }

            if (respuestaSeleccionada) {
                input.textContent = respuestaSeleccionada;

                respuestaOriginal.classList.add('respuesta-vacia');
                input.classList.add('respondido');
                input.classList.remove('no-respondido');
                respuestaOriginal.style.border = '1px dashed #ccc';
                
                respuestaSeleccionada = null;
                respuestaOriginal = null;
            }
        });
    });
}
function validarRespuestas() {
    const inputs = document.querySelectorAll('.input');
    let allResponded = true;

    inputs.forEach(input => {
        if (!input.classList.contains('respondido')) {
            allResponded = false;
            input.style.border = '2px solid red';
            setTimeout(() => {
                input.style.border = '1px solid white';
            }, 3000);
        }
    });

    return allResponded;
}

// Función para contar respuestas correctas
function contarRespuestas() {
    const inputs = document.querySelectorAll('.input');
    let correctas = 0;

    inputs.forEach(input => {
        const respuestaCorrecta = input.dataset.resultadoCorrecto;
        console.log(respuestaCorrecta);
        if (input.textContent === respuestaCorrecta) {
            correctas++;
            input.style.backgroundColor = 'green'; // Verde si es correcta
        } else {
            input.style.backgroundColor = 'red'; // Rojo si es incorrecta
        }
    });
    return correctas;
}

// Evento para el botón de "Aceptar"
