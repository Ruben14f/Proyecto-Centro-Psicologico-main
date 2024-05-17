function mostrarMensaje(mensaje){
    const textP = document.querySelector('#modal-mensaje p');
    textP.innerText = mensaje;

    const bModal = new bootstrap.Modal('#modal-mensaje',{});
    bModal.show();
}


async function verificar(){

    const btn = document.getElementById('btn-verificar');
    btn.setAttribute('disabled',true);

    const url = 'https://api.boostr.cl/holidays.json';
    
    const datePicker = document.getElementById('fecha');
    if(datePicker.reportValidity() && datePicker.value){
        try {

            const solicitud = await fetch(url);
            
            const datosFeriados = await solicitud.json();

            const feriados = datosFeriados.data;

            let esFeriado = undefined;
            const fechaSeleccionada = datePicker.value;

            for (const fecha of feriados) {
                if(fecha.date == fechaSeleccionada){
                    esFeriado = fecha;
                    break;
                }
            }

            if(esFeriado){

                console.log(esFeriado);

                mostrarMensaje('No puede elegir esta fecha ya que es feriado:')
            }


        } catch (error) {
            mostrarMensaje('Ocurrió un error al recoger los datos.')
        }
    }

    btn.removeAttribute('disabled');
}


//validacion de formulario
let selectedHora = null;

  function seleccionarHora(hora) {
      selectedHora = hora;
      alert("Hora seleccionada: " + hora);
  }

  function validarCorreo(correo) {
      const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return re.test(correo);
  }

  function validarTelefono(telefono) {
      return Number.isInteger(telefono) && telefono.toString().length === 8;
  }

  function reservaHora() {
      try {
          let nombres = document.getElementById("nombre").value.trim();
          let apellidos = document.getElementById("apellido").value.trim();
          let telefono = parseInt(document.getElementById("telefono").value.trim());
          let modalidad = document.getElementById("modalidad").value.trim();
          let correo = document.getElementById("email").value.trim();
          let fecha = document.getElementById("fecha").value;

          if (nombres === '' || apellidos === '' || correo === '' || modalidad === '' || fecha === '' || selectedHora === null) {
              alert("Debe rellenar todos los datos disponibles");
          } else {
              if (!validarCorreo(correo)) {
                  alert("Correo electrónico no válido. Por favor, ingrese un correo electrónico válido");
                  return;
              } else if (!validarTelefono(telefono)) {
                  alert("Indique un número de 8 dígitos");
                  return;
              } else {
                  // Crear un nuevo registro
                  let nuevaReservaHora = {
                      nombres: nombres,
                      apellidos: apellidos,
                      telefono: telefono,
                      modalidad: modalidad,
                      correo: correo,
                      fecha: fecha,
                      hora: selectedHora
                  };

                  // Supongamos que tienes un array llamado paciente para almacenar las reservas
                  paciente.push(nuevaReservaHora);
                  guardarHora(); // Implementa esta función según tu lógica de almacenamiento
              }
          }
      } catch (error) {
          console.error("Error al procesar el formulario de registro:", error);
      }
  }