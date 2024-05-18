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

            for (const fecha of feriados) {
                if (fecha.date == fechaSeleccionada) {
                    esFeriado = fecha;
                    break;
                }
            }

            if (!horaSeleccionada) {
                mostrarMensaje('Por favor, seleccione una hora para agendar la cita.');
            } else if (esFeriado) {
                mostrarMensaje('No puede elegir esta fecha ya que es feriado:');
            } else {
                const reservaExitosaModal = new bootstrap.Modal(document.getElementById('modal-reserva-exitosa'));
                reservaExitosaModal.show();
            }

        } catch (error) {
            mostrarMensaje('Ocurrió un error al recoger los datos.')
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


