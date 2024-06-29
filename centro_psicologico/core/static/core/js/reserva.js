let reservasFinal = [];

const CLAVE_RESERVAFINAL = "datos_reserva_final";

async function verificar(event) {

    const url = 'https://api.boostr.cl/holidays.json';
    const datePicker = document.getElementById('fecha');
    if (reservasGuardadas.length > 0) {
        alert("Ya tienes una reserva en el carrito. No puedes agregar más.");
        event.preventDefault();
        return;  // Detener la ejecución de la función
    }

    if (datePicker.reportValidity() && datePicker.value) {
        try {
            const solicitud = await fetch(url);
            const datosFeriados = await solicitud.json();
            const feriados = datosFeriados.data;

            const horaSeleccionada = document.querySelector('.hora-btn.selected');
            let esFeriado = undefined;
            const fechaSeleccionada = datePicker.value;
            const fechaSeleccionadaDate = new Date(fechaSeleccionada);

            const esDomingo = fechaSeleccionadaDate.getUTCDay() === 0;

            for (const fecha of feriados) {
                if (fecha.date === fechaSeleccionada) {
                    esFeriado = fecha;
                    break;
                }
            }

            if (!horaSeleccionada) {
                mostrarMensaje('Por favor, seleccione una hora para agendar la cita.');
            } else if (esDomingo) {
                mostrarMensaje('No puede elegir esta fecha ya que es domingo.');
            } else if (esFeriado) {
                mostrarMensaje('No puede elegir esta fecha ya que es feriado: ' + esFeriado.title);
            } else {
                let nombre = document.getElementById('nombreReserva').value.trim();
                let apellido = document.getElementById('apellidoReserva').value.trim();
                let telefono = parseInt(document.getElementById('telefono2').value.trim());
                let tipo = document.getElementById('tipo').value.trim();
                let tipo2 = document.getElementById('tipo2').value.trim();
                let reseteo = document.getElementById("reserva");
                if(
                    nombre === '' ||
                    apellido === '' ||
                    telefono === 0 ||
                    tipo === '0' ||
                    tipo2 === '0'
                ){
                    alert("Debe rellenar todos los datos disponibles")
                }else{
                    if (localStorage.getItem(CLAVE_RESERVA)) {
                        alert("Usted ya tiene una reserva agregada, por lo que debe cancelarla antes de pedir otra")
                        reseteo.reset();
                        event.preventDefault(); 
                    }else {
                        let reservaFinal = {
                            nombre: nombre,
                            apellido: apellido,
                            telefono: telefono,
                            tipo: tipo,
                            tipo2: tipo2,
                            fecha: fechaSeleccionada,
                            hora: horaSeleccionada.innerText
                        };

                        const reservasGuardadas = JSON.parse(localStorage.getItem(CLAVE_RESERVAFINAL)) || [];
                        const horaTomada = reservasGuardadas.some(reserva =>
                            reserva.fecha === reservaFinal.fecha && reserva.hora === reservaFinal.hora
                        );

                        if (horaTomada) {
                            mostrarMensaje('No puede reservar esta fecha y hora porque ya está ocupada.');
                        } else {
                            reservasGuardadas.push(reservaFinal);
                            localStorage.setItem(CLAVE_RESERVAFINAL, JSON.stringify(reservasGuardadas));
                            alert("La reserva ha sido agregada al carrito de compras");
                            actualizarContadorCarrito();  // Actualizar el contador
                            // let cantidadProductos = reservasGuardadas.length;
                            // document.getElementById('cantidad-productos').textContent = cantidadProductos;
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Ocurrió un error al recoger los datos.');
        }
    }
}

document.querySelectorAll('.hora-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.hora-btn').forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    });
});


function guardarReserva() {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_RESERVAFINAL)) || [];
    // Asegúrate de que reservasFinal tenga las reservas más recientes
    guardado.push(...reservasFinal);
    // Guardar el array completo en localStorage
    localStorage.setItem(CLAVE_RESERVAFINAL, JSON.stringify(guardado));
}
console.log(localStorage.getItem(CLAVE_RESERVAFINAL));

function mostrarReservas() {
    const carritoItemsContainer = document.getElementById("carrito-items");
    const reservas = JSON.parse(localStorage.getItem(CLAVE_RESERVAFINAL)) || [];
    carritoItemsContainer.innerHTML = '';

    reservas.forEach(reserva => {
        const reservaElement = document.createElement("div");
        reservaElement.classList.add("carrito-item");
        const contenidoReserva = `
            <h2>Reserva: ${reserva.tipo === '1' ? 'Terapia Individual' : 'Terapia de Parejas'}</h2>
            <p>Nombre de quien reserva: ${reserva.nombre} ${reserva.apellido}</p>
            <p>Télefono: ${reserva.telefono}</p>
            <p>Modalidad: ${reserva.tipo2 === '1' ? 'Presencial' : 'Online'}</p>
            <p>Hora: ${reserva.hora}</p>
            <p>Fecha: ${reserva.fecha}</p>
            <p>Precio: ${reserva.tipo === '1' ? '$24.500' : '$48.000'}</p>
        `;
        reservaElement.innerHTML = contenidoReserva;
        carritoItemsContainer.appendChild(reservaElement);
    });
}

mostrarReservas();


function pasoDePago(event) {
    if (!localStorage.getItem(CLAVE_RESERVAFINAL)) {
        alert("Usted no tiene ninguna reserva, por favor seleccione alguna para continuar su reserva");
        event.preventDefault(); 
    }
}

function limpiarLocalStorage() {
    if (localStorage.getItem(CLAVE_RESERVAFINAL)) {
        localStorage.removeItem(CLAVE_RESERVAFINAL);
        alert("El carrito ha sido vaciado.");
        window.location.reload();
    } else {
        alert("¡UPS! Al parecer, usted no tiene reserva agregada.");
    }
}
function limpiarLocalStorageFIN() {
    if (localStorage.getItem(CLAVE_RESERVAFINAL)) {
        localStorage.removeItem(CLAVE_RESERVAFINAL);
        window.location.reload();
    } else {
        alert("¡UPS! Al parecer, usted no tiene reserva agregada.");
    }
}

console.log(reservasFinal); // Verifica el contenido de reservasFinal antes de guardarlo

function actualizarContadorCarrito() {
    const reservas = JSON.parse(localStorage.getItem(CLAVE_RESERVAFINAL)) || [];
    const cantidadProductos = reservas.length;
    const contadorElemento = document.getElementById('cantidad-productos');
    if (contadorElemento) {
        contadorElemento.textContent = cantidadProductos;
    }
}

actualizarContadorCarrito();

// Función para calcular el precio total de las reservas
function calcularPrecioTotal() {
    let precioTotal = 0;

    // Obtener las reservas guardadas en localStorage
    const reservas = JSON.parse(localStorage.getItem(CLAVE_RESERVAFINAL)) || [];

    // Calcular el precio total sumando los precios de las reservas
    reservas.forEach(reserva => {
        // Asignar precios según el tipo de terapia
        if (reserva.tipo === '1') {
            precioTotal += 24500; 
        } else {
            precioTotal += 48000; 
        }
    });

    // Actualizar el contenido de la etiqueta <span class="carrito-precio-total">
    const carritoPrecioTotalElement = document.querySelector(".carrito-precio-total");
    carritoPrecioTotalElement.textContent = `$${precioTotal}`;
}

// Llamar a la función para calcular el precio total al cargar la página
calcularPrecioTotal();

function pasoDePago(event) {
    // Verificar si el carrito tiene datos o no en el localStorage
    if (!localStorage.getItem(CLAVE_RESERVAFINAL)) {
        alert("Usted no tiene ninguna reserva, por favor seleccione alguna para continuar su reserva");
        event.preventDefault(); 
    } 
}

function enviarReservasAJAX(event) {
    event.preventDefault();

    const reservas = JSON.parse(localStorage.getItem('datos_reserva_final')) || [];

    if (reservas.length === 0) {
        alert("No tienes ninguna reserva seleccionada. Por favor, selecciona una reserva para continuar.");
        event.preventDefault();
        return;  // Detiene la función si no hay reservas para enviar
    }

    fetch('/guardar-reservas/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': '{{ csrf_token }}', // Asegúrate de incluir el token CSRF en la cabecera
        },
        body: JSON.stringify(reservas),
    })
    .then(response => {
        if (response.ok) {
            console.log('Reservas enviadas correctamente al backend.');
            // Opcional: Limpiar localStorage después de enviar las reservas
            localStorage.removeItem('datos_reserva_final');
            // Redirigir u actualizar la interfaz si es necesario
            window.location.reload();
        } else {
            console.error('Error al enviar reservas al backend.');
        }
    })
    .catch(error => {
        console.error('Ocurrió un error al enviar reservas:', error);
    });
}