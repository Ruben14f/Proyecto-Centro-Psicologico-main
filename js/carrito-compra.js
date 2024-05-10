let reservas = [

];

const CLAVE_RESERVA = "datos_reserva";

function reserva(){
    try{
        let nombre = document.getElementById("nombreReserva").value.trim();
        let apellido = document.getElementById("apellidoReserva").value.trim();
        let correo =  document.getElementById("correoReserva").value.trim();
        let correoConf = document.getElementById("correo-registro-confirmacionReserva").value.trim();
        if(
            nombre === '' ||
            apellido === '' ||
            correo === '' ||
            correoConf === ''
        ){
            alert("Debe rellenar todos los datos disponibles")
        }else{
            if(!validarCorreo(correo)){
                alert("Correo electronico no válido. Por favor, ingrese un correo electronico")
                return;
            }
            else {
                // Crear nueva reserva
                let nuevaReserva = {
                    nombre: nombre,
                    apellido: apellido,
                    correo: correo,
                };
                reservas.push(nuevaReserva);
                guardarReserva();
                alert("La reserva ha sido agregada al carrito de compras");
                let reseteo = document.getElementById("reserva");
                reseteo.reset();
                let cantidadProductos = reservas.length; // Obtenemos la cantidad de reservas en el carrito
                document.getElementById('cantidad-productos').textContent = cantidadProductos;
                window.location.reload();
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
function guardarReserva() {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_RESERVA)) || [];
    // Agregar los nuevos registros al array existente
    guardado.push(...reservas);
    // Guardar el array completo en localStorage
    localStorage.setItem(CLAVE_RESERVA, JSON.stringify(guardado));
    localStorage.setItem("cantidadReservas", reservas.length);
}
console.log(localStorage.getItem(CLAVE_RESERVA));
//-------------------------------------------------------
//Reservas (Diferencias entre individual y pareja)
document.getElementById('carrito-compra').addEventListener('click', function() {
    // Aquí puedes ejecutar la lógica que deseas cuando se hace clic en el carrito de compras
    alert('El carrito de compras ha sido clickeado');
});
const cuentaCarritoElement = document.getElementById("cantidad-productos");
function actualizarNumeroCarrito(){
    const guardado = JSON.parse(localStorage.getItem(CLAVE_RESERVA)) || []; // Obtener reservas guardadas
    const cuenta = guardado.length; // Contar el número de reservas
    cuentaCarritoElement.innerText = cuenta; // Actualizar el número en el carrito
}
window.onload = function() {
    actualizarNumeroCarrito();
};
actualizarNumeroCarrito();

// Función para manejar la reserva individual
function reservaIndividual() {
    let contadorIndividual = localStorage.getItem('contadorIndividual') || 0;

    if (contadorIndividual > 0) {
        return;
    } else {
        contadorIndividual++;
        localStorage.setItem('contadorIndividual', contadorIndividual);
        alert('Reserva individual confirmada.');
    }
}

// Función para manejar la reserva de pareja
function reservaPareja() {
    let contadorPareja = localStorage.getItem('contadorPareja') || 0;

    if (contadorPareja > 0) {
        return;
    } else {
        contadorPareja++;
        localStorage.setItem('contadorPareja', contadorPareja);
        alert('Reserva de pareja confirmada.');
    }
}
 