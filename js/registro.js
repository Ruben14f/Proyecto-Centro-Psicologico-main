//FALTA SOLAMENTE VALIDARLO PARA QUE EN CASO DE QUE SEA IGUAL EL CORREO O EL TELEFONO, TIRE ERROR Y MANDE "USTED YA TIENE CUENTA"

let paciente = [

];

const CLAVE_PACIENTE = "datos-paciente";
cargarPaciente();


function registrarse(){
    try{
        let nombre = document.getElementById("nombre").value.trim();
        let apellido = document.getElementById("apellido").value.trim();
        let telefono = parseInt(document.getElementById("telefono").value.trim());
        let direccion = document.getElementById("direccion").value.trim();
        let correo = document.getElementById("correo-registro").value.trim();
        let correoConf = document.getElementById("correo-registro-confirmacion").value.trim();
        let contraseña = document.getElementById("contraseña-registro").value.trim();
        let contraseñaConf = document.getElementById("contraseña-registro-confirmacion").value.trim();

        if(
            nombre === '' ||
            apellido === '' ||
            direccion === '' ||
            correo === '' ||
            correoConf === '' ||
            contraseña === '' ||
            contraseñaConf === ''
        ){
            alert("Debe rellenar todos los datos disponibles")
        }else{
            if(!validarCorreo(correo)){
                alert("Correo electronico no válido. Por favor, ingrese un correo electronico")
                return;
            }
            else if(!validarContraseña(contraseña)){
                alert("La contraseña debe tener al menos 6 caracteres.")
                return;
            }else if(!validarTelefono(telefono)){
                alert("Indique un número de 8 números")
                return;
            }else{
                // Crear un nuevo registro
                let nuevoRegistro = {
                    nombre: nombre,
                    apellido: apellido,
                    telefono: telefono,
                    direccion: direccion,
                    correo: correo,
                    contraseña: contraseña
                };

                paciente.push(nuevoRegistro);
                guardarPaciente();
            }
        }
        
    }catch(error){
        console.error("Error al procesar el formulario de registro:", error);
    }
}
function validarCorreo(correo){
    //Estandar de verificacion
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (correo.length > 254) {
        return false;
    }

    if (!regexCorreo.test(correo)) {
        return false;
    }

    if (correo.trim() !== correo) {
        return false;
    }

    return true;
}

function validarContraseña(contraseña){
    //Contraseña de cualquier forma pero mayor a 6 caracteres/numeros
    return contraseña.length >= 6;
}

function validarTelefono(telefono) {

    const regexTelefono = /^\d{8,}$/;
    return regexTelefono.test(telefono);
}


function guardarPaciente() {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_PACIENTE)) || [];
    // Agregar los nuevos registros al array existente
    guardado.push(...paciente);
    // Guardar el array completo en localStorage
    localStorage.setItem(CLAVE_PACIENTE, JSON.stringify(guardado));
}

function cargarPaciente() {
    const guardado = localStorage.getItem(CLAVE_PACIENTE);
    if (guardado) {
        paciente = JSON.parse(guardado);
    }
}
//--------------------------------------------------------------------------------------------------
//Para inicio de sesion(No pude colocarlo en otro js, fue mucha pajitaaa)
function iniciarSesion() {
    let correo = document.getElementById("correo-inicio-sesion").value.trim();
    let contraseña = document.getElementById("contraseña-inicio-sesion").value.trim();
    if (correo === '' || contraseña === '') {
        alert("Por favor, ingrese el correo y la contraseña.");
        return;
    }

    let usuarioEncontrado = false;

        // Verificar si el correo y la contraseña coinciden con algún usuario registrado
    for (let i = 0; i < paciente.length; i++) {
        if (paciente[i].correo === correo && paciente[i].contraseña === contraseña) {
            usuarioEncontrado = true;
            alert("Inicio de sesión exitoso!");
            window.location.reload();
        }
    }

    if (!usuarioEncontrado) {
        alert("Correo o contraseña incorrectos. Por favor, inténtelo de nuevo.")
    }
}

console.log(localStorage.getItem(CLAVE_PACIENTE));
