let reservas = [

];

const CLAVE_RESERVA = "datos_reserva";

function reserva(){
    try{
        let nombre = document.getElementById("nombreReserva").value.trim();
        let apellido = document.getElementById("apellidoReserva").value.trim();
        let correo =  document.getElementById("correoReserva").value.trim();
        let correoConf = document.getElementById("correo-registro-confirmacionReserva").value.trim();
        let tipo = document.getElementById("tipo").value.trim();
        if(
            nombre === '' ||
            apellido === '' ||
            correo === '' ||
            correoConf === '' ||
            tipo === '0'
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
                    tipo: tipo,
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
document.getElementById("logo-carrito-compra").addEventListener("click", function() {
    window.location.href = "carrito.html";
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

//----------------------------------------------------------
//Carrito de pago
// Función para mostrar las reservas en el carrito
function mostrarReservas() {
    // Obtener el contenedor de las reservas
    const carritoItemsContainer = document.getElementById("carrito-items");

    // Obtener las reservas guardadas en localStorage
    const reservas = JSON.parse(localStorage.getItem(CLAVE_RESERVA)) || [];

    // Limpiar contenido previo del contenedor
    carritoItemsContainer.innerHTML = '';

    // Recorrer todas las reservas y agregarlas al contenedor
    reservas.forEach(reserva => {
        // Crear un elemento div para la reserva
        const reservaElement = document.createElement("div");
        reservaElement.classList.add("carrito-item");

        // Crear el contenido de la reserva
        const contenidoReserva = `
            <h2>Reserva: ${reserva.tipo === '1' ? 'Terapia Individual' : 'Terapia de Parejas'}</h2>
            <p>Nombre de quien reserva: ${reserva.nombre} ${reserva.apellido}</p>
            <p>Correo: ${reserva.correo}</p>
            <p>Precio: ${reserva.tipo === '1' ? '$24.500' : '$48.000'}</p>
        `;

        // Agregar el contenido al elemento de la reserva
        reservaElement.innerHTML = contenidoReserva;

        // Agregar la reserva al contenedor
        carritoItemsContainer.appendChild(reservaElement);
    });
}

// Llamar a la función para mostrar todas las reservas al cargar la página
mostrarReservas();

// Función para calcular el precio total de las reservas
function calcularPrecioTotal() {
    let precioTotal = 0;

    // Obtener las reservas guardadas en localStorage
    const reservas = JSON.parse(localStorage.getItem(CLAVE_RESERVA)) || [];

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

function limpiarLocalStorage() {
    // Verificar si hay datos almacenados bajo la clave CLAVE_RESERVA
    if (localStorage.getItem(CLAVE_RESERVA)) {
        localStorage.removeItem(CLAVE_RESERVA);
        alert("El carrito ha sido vaciado.");
        window.location.reload();
    } else {
        alert("¡UPS! Al parecer, usted no tiene reserva agregada.");
    }
}

