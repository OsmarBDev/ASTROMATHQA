const images = document.querySelectorAll('.imagen');
let activeIndex = 0;
const flechaIzquierda = document.querySelector('.flecha.izquierda');
const flechaDerecha = document.querySelector('.flecha.derecha');
const nombreMundo = document.querySelector('.nombre-mundo');

const tituloMundo = document.querySelector('.titulo-mundo');




document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("popstate", function(event) {
      window.location.href = "http://127.0.0.1:8000";
    });
    history.pushState(null, null, window.location.href);
});


function updateCarousel() {
  const isResponsive = window.innerWidth <= 1080; 

  images.forEach((img, index) => {
    img.classList.remove('activa', 'siguiente', 'anterior', 'inactiva');

    if (index === activeIndex) {
      img.classList.add('activa');
      changeBubbleClasses(activeIndex);
      updateWorldName(activeIndex);
    } else if (index === activeIndex - 1) {
      img.classList.add('anterior');
    } else if (index === activeIndex + 1) {
      img.classList.add('siguiente');
    } else {
      img.classList.add('inactiva');
    }
  });
  flechaIzquierda.style.display = isResponsive && activeIndex > 0 ? 'flex' : 'none';
  flechaDerecha.style.display = isResponsive && activeIndex < images.length - 1 ? 'flex' : 'none';
}
function updateWorldName(index) {
  if (index === 0) {
    nombreMundo.textContent = 'Mundo de las Sumas';
  } else if (index === 1) {
    nombreMundo.textContent = 'Mundo de las Restas';
  } else if (index === 2) {
    nombreMundo.textContent = 'Mundo de las Multiplicaciones';
  }
  tituloMundo.textContent = nombreMundo.textContent;
}
function changeBubbleClasses(index) {
  const bubbles = document.querySelectorAll('.bubbles span');
  const button = document.querySelector('.button-choose');

  bubbles.forEach(bubble => {
    bubble.classList.toggle('bubbles-aqua', 'bubbles-green', 'bubbles-grey');
  });

  if (index === 0) {
    bubbles.forEach(bubble => bubble.classList.add('bubbles-aqua'));
    bubbles.forEach(bubble => bubble.classList.remove('bubbles-green', 'bubbles-grey'));
    button.classList.add('first-world');
    button.classList.remove('second-world', 'third-world');
  } else if (index === 1) {
    bubbles.forEach(bubble => bubble.classList.add('bubbles-green'));
    bubbles.forEach(bubble => bubble.classList.remove('bubbles-aqua', 'bubbles-grey'));
    button.classList.add('second-world');
    button.classList.remove('first-world', 'third-world');
  } else if (index === 2) {
    bubbles.forEach(bubble => bubble.classList.add('bubbles-grey'));
    bubbles.forEach(bubble => bubble.classList.remove('bubbles-aqua', 'bubbles-green'));
    button.classList.add('third-world');
    button.classList.remove('first-world', 'second-world');
  }
}

images.forEach((img, index) => {
  img.addEventListener('click', () => {
    if (index === activeIndex + 1 || index === activeIndex - 1) {
      activeIndex = index;
      updateCarousel();
    }
  });
});

flechaIzquierda.addEventListener('click', () => {
  if (activeIndex > 0) {
    activeIndex--;
    updateCarousel();
  }
});

flechaDerecha.addEventListener('click', () => {
  if (activeIndex < images.length - 1) {
    activeIndex++;
    updateCarousel();
  }
});

window.addEventListener('resize', updateCarousel);

updateCarousel();



/*NIVELES*/
const botonElegir = document.querySelector('.button-choose');
const main = document.querySelector('main');
const niveles = document.querySelector('.niveles');
const nivelesOverlay = document.querySelector('.niveles-overlay');

botonElegir.addEventListener('click', () => {
  main.classList.add('desenfocado');
  niveles.style.display = 'block'; 
  nivelesOverlay.style.display = 'block'; 
  if (tituloMundo.textContent === 'Mundo de las Sumas') {
    getInfoEjercicio(1);
  }else if (tituloMundo.textContent === 'Mundo de las Restas') {
    getInfoEjercicio(2);
  }else if(tituloMundo.textContent === 'Mundo de las Multiplicaciones'){
    getInfoEjercicio(3);
  }
  
});

nivelesOverlay.addEventListener('click', () => {
  main.classList.remove('desenfocado'); 
  niveles.style.display = 'none';
  nivelesOverlay.style.display = 'none'; 
});

const nivelCuadros = document.querySelectorAll('.nivel-cuadro');

nivelCuadros.forEach((cuadro, index) => {
  const numero = index + 1; 
  cuadro.querySelector('.nivel-numero').textContent = numero;
});


const getInfoEjercicio = async (idEjercicio) => {
  const url = `http://127.0.0.1:8000/Api/getInfo/${idEjercicio}/`; // Asegúrate de que coincide con tu configuración de URLs.
  try {
      const response = await fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          }
      });
      if (!response.ok) {
          throw new Error('Error al obtener la información');
      }
      const data = await response.json();
      console.log('Datos del ejercicio:', data);
      renderTemplate(data.data); // Llama al renderizado con `data.data` como parámetro.
  } catch (error) {
      console.error('Error:', error);
  }
};

//PARTE QUE GENERA EL TEMPLATE

const renderTemplate = (data) => {
  const nivelContainer = document.querySelector('.nivel'); // Selecciona el contenedor donde se insertará el template.
  nivelContainer.innerHTML = ""; // Limpia el contenido existente.

  data.forEach((item, index) => {
      let template;

      // Caso: Si el campo "estrellas" existe
      if (item.estrellas !== undefined) {
          template = `
              <div class="nivel-cuadro hab">
                  <p class="nivel-numero">${index + 1}</p>
                  <p class="nivel-tiempo">Tiempo: ${item.tiempo}</p>
                  <div class="nivel-estrellas">
                      ${renderStars(item.estrellas)}
                  </div>
              </div>`;
      } else {
          // Caso: Sin el campo "estrellas"
          template = `
              <div class="nivel-cuadro">
                  <p class="nivel-numero">${index + 1}</p>
                  <p class="nivel-tiempo">Requiere más estrellas</p>
              </div>`;
      }

      // Agregar el template al contenedor
      nivelContainer.innerHTML += template;
      clickEjercicio()
  });
};

// Función para renderizar las estrellas
const renderStars = (numEstrellas) => {
  let starsTemplate = "";
  for (let i = 0; i < 5; i++) {
      if (i < numEstrellas) {
          starsTemplate += `<img src="${estrellaAmarilla}" alt="Estrella" class="estrella">`;
      } else {
          starsTemplate += `<img src="${estrellaGris}" alt="Estrella" class="estrella">`;
      }
  }
  return starsTemplate;
};
