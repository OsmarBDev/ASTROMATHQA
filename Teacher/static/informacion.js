let usuarios = [];
let nombres = [];
let apellidos = [];
let puntajes = [];

async function fetchData() {
    try {
        const response = await fetch('https://web-production-a3a36.up.railway.app/Api/getInfoEstudiantes/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Si usas tokens para autenticación
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        usuarios = data.map(item => item.user__username);
        nombres = data.map(item => item.nombre);
        apellidos = data.map(item => `${item.apellidoPaterno} ${item.apellidoMaterno}`);
        puntajes = data.map(item => item.puntaje);

        generarTabla();
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

function generarTabla() {
    const tableContainer = document.querySelector('.table-container');

    tableContainer.innerHTML = '';

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headers = [
        { label: 'Usuario', key: 'usuario' },
        { label: 'Nombre', key: 'nombre' },
        { label: 'Apellidos', key: 'apellido' },
        { label: 'Puntaje', key: 'puntaje' }
    ];

    const trHead = document.createElement('tr');
    headers.forEach((header) => {
        const th = document.createElement('th');
        th.textContent = header.label;
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => ordenarTabla(header.key));
        trHead.appendChild(th);
    });
    thead.appendChild(trHead);

    for (let i = 0; i < usuarios.length; i++) {
        const tr = document.createElement('tr');

        const tdUsuario = document.createElement('td');
        tdUsuario.textContent = usuarios[i];

        const tdNombre = document.createElement('td');
        tdNombre.textContent = nombres[i];

        const tdApellido = document.createElement('td');
        tdApellido.textContent = apellidos[i];

        const tdPuntaje = document.createElement('td');
        tdPuntaje.textContent = puntajes[i];

        tr.appendChild(tdUsuario);
        tr.appendChild(tdNombre);
        tr.appendChild(tdApellido);
        tr.appendChild(tdPuntaje);

        tbody.appendChild(tr);
    }

    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);
}

function ordenarTabla(key) {
    const combinado = usuarios.map((_, i) => ({
        usuario: usuarios[i],
        nombre: nombres[i],
        apellido: apellidos[i],
        puntaje: puntajes[i]
    }));

    combinado.sort((a, b) => {
        if (key === 'puntaje') {
            return a[key] - b[key];
        } else {
            return a[key].localeCompare(b[key]); 
        }
    });

    usuarios = combinado.map(item => item.usuario);
    nombres = combinado.map(item => item.nombre);
    apellidos = combinado.map(item => item.apellido);
    puntajes = combinado.map(item => item.puntaje);

    generarTabla();
}

document.addEventListener('DOMContentLoaded', fetchData);
