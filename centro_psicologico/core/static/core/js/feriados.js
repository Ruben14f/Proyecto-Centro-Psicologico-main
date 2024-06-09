let reservasFinal = [

];

const CLAVE_RESERVAFINAL = "datos_reserva_final";


function mostrarMensaje(mensaje) {
    const textP = document.querySelector('#modal-mensaje p');
    textP.innerText = mensaje;

    const bModal = new bootstrap.Modal('#modal-mensaje', {});
    bModal.show();
}


async function verificar() {
    const btn = document.getElementById('btn-verificar');
    btn.setAttribute('disabled', true);

    const url = 'https://api.boostr.cl/holidays.json';
    const datePicker = document.getElementById('fecha');

    if (datePicker.reportValidity() && datePicker.value) {
        try {
            const solicitud = await fetch(url);
            const datosFeriados = await solicitud.json();
            const feriados = datosFeriados.data;

            const horaSeleccionada = document.querySelector('.hora-btn.selected');
            let esFeriado = undefined;
            const fechaSeleccionada = datePicker.value;
            const fechaSeleccionadaDate = new Date(fechaSeleccionada);

            // Verificar si es domingo
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
                let reservaFinal = {
                    fecha: fechaSeleccionada,
                    hora: horaSeleccionada.innerText
                };
                const reservasGuardadas = JSON.parse(localStorage.getItem(CLAVE_RESERVAFINAL)) || [];
                const horaTomada = reservasGuardadas.some(reserva =>
                    reserva.fecha === reservaFinal.fecha && reserva.hora === reservaFinal.hora
                );

                if (horaTomada) {
                    mostrarMensaje('No puede reservar esta fecha y hora porque ya está ocupada.');
                } if (!localStorage.getItem(CLAVE_RESERVA)) {
                    mostrarMensaje("Usted no tiene ninguna reserva, por lo que no puede tomar ninguna hora");
                } else {
                    reservasFinal.push(reservaFinal);
                    guardarReservaFinal();

                    const reservaExitosaModal = new bootstrap.Modal(document.getElementById('modal-reserva-exitosa'));
                    limpiarLocalStorageFIN();
                    reservaExitosaModal.show();
                }
            }

        } catch (error) {
            mostrarMensaje('Ocurrió un error al recoger los datos.');
        }
    }

    btn.removeAttribute('disabled');
}


document.querySelectorAll('.hora-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.hora-btn').forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    });
});

//validacion de formulario
document.getElementById('reserva-form').addEventListener('submit', function (event) {
    event.preventDefault();
    verificar();
});

function cargo(){
    window.location.reload();
}

function guardarReservaFinal() {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_RESERVAFINAL)) || [];
    guardado.push(...reservasFinal);
    localStorage.setItem(CLAVE_RESERVAFINAL, JSON.stringify(guardado));
    reservasFinal = []; // Limpiar el array temporal
}
console.log(localStorage.getItem(CLAVE_RESERVAFINAL));