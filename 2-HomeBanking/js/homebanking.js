//Declaración de variables.

//Variables de usuario y cuenta.
var nombreUsuario = "Juan Avalo";
var saldoCuenta = 32565.57;
var limiteExtraccion = 3000;

//Variables de Servicios.
var agua = 350;
var telefono = 425;
var luz = 210;
var internet = 570;

//Variables de cuentas amigas.
var cuentaAmiga_1 = 1234567;
var cuentaAmiga_2 = 7654321;

//Variable inicio de sesion.
var codigoCuenta = 9512;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}

//Funciones que modifican el saldo
function sumarDinero(cantSumar) {
    saldoCuenta += cantSumar;
}

function restarDinero(cantRestar) {
    saldoCuenta -= cantRestar;
}

//Funciones de validación.

/*Se valida que el monto a extraer cumpla las condiciones establecidas por el sistema.
La funcion retorna TRUE siempre que no se cumpla con alguno de los requisitos,
lo cual hace continuar el ciclo DO-WHILE. 
*/
function validarExtraccion(cantidadExtraer) {
    if (cantidadExtraer < 0) {
        alert("La cantidad ingresada no es válida.");
        return true;
    } else if (cantidadExtraer > saldoCuenta) {
        alert("Saldo Insuficiente");
        return true;
    } else if (cantidadExtraer > limiteExtraccion) {
        alert("La cantidad ingresada supera el límite de extracción.");
        return true;
    } else if ((cantidadExtraer % 100) != 0) {
        alert("El sistema solo entrega billetes de $100.");
        return true;
    } else return false;
}

//Se valida que el saldo de la cuenta sea suficiente para pagar el servicio.
function validarPagoServicio(servicio) {
    if (servicio > saldoCuenta) {
        alert("No hay suficiente saldo en tu cuenta para pagar este servicio.");
        return false;
    } else return true;
}

//Funcion que imprime la alerta en el pago de servicios exitoso.
function alertaPagoServicio(servicio, nomServicio) {
    alert("Has pagado el servicio de: " + nomServicio + "\nSaldo anterior: $" + (saldoCuenta + servicio) + "\nDinero descontado: $" + servicio + "\nSaldo actual: $" + saldoCuenta);

}

//Funciones que tenes que completar.

function cambiarLimiteDeExtraccion() {
    do {
        var nuevoLimiteExtraccion = parseInt(prompt("Ingrese el nuevo límite de extracción:"));
        if (nuevoLimiteExtraccion < 500) alert("El límite de extracción no puede ser menor a $500");
    } while (nuevoLimiteExtraccion < 500)

    if (isNaN(nuevoLimiteExtraccion)) return;

    limiteExtraccion = nuevoLimiteExtraccion;
    actualizarLimiteEnPantalla();
    alert("El nuevo límite de extracción es: $" + limiteExtraccion);
}


function extraerDinero() {
    do {
        var cantExtraer = parseInt(prompt("Ingrese Cantidad a Extraer: "));
        if (isNaN(cantExtraer)) break;
    } while (validarExtraccion(cantExtraer))

    if (isNaN(cantExtraer)) return;

    restarDinero(cantExtraer);
    actualizarSaldoEnPantalla();
    alert("Has retirado: $" + cantExtraer + "\nSaldo anterior: $" + (saldoCuenta + cantExtraer) + "\nSaldo actual: $" + saldoCuenta);
}

function depositarDinero() {
    do {
        var cantDepositar = parseInt(prompt("Ingrese Cantidad a Depositar: "));
        if (cantDepositar < 0) {
            alert("La cantidad ingresada no es válida.");
        }
    } while (cantDepositar < 0)

    if (isNaN(cantDepositar)) return;

    sumarDinero(cantDepositar);
    actualizarSaldoEnPantalla();
    alert("Has depositado: $" + cantDepositar + "\nSaldo anterior: $" + (saldoCuenta - cantDepositar) + "\nSaldo actual: $" + saldoCuenta);

}

function pagarServicio() {

    var servicioAPagar = parseInt(prompt("Ingrese el número que corresponda con el servicio a pagar:\n1 - Agua\n2 - Luz\n3 - Internet\n4 - Teléfono"));

    switch (servicioAPagar) {
        case 1:
            if (validarPagoServicio(agua)) {
                restarDinero(agua);
                actualizarSaldoEnPantalla();
                alertaPagoServicio(agua, "Agua");
            }
            break;
        case 2:
            if (validarPagoServicio(luz)) {
                restarDinero(luz);
                actualizarSaldoEnPantalla();
                alertaPagoServicio(luz, "Luz");
            }
            break;
        case 3:
            if (validarPagoServicio(internet)) {
                restarDinero(internet);
                actualizarSaldoEnPantalla();
                alertaPagoServicio(internet, "Internet");
            }
            break;
        case 4:
            if (validarPagoServicio(telefono)) {
                restarDinero(telefono);
                actualizarSaldoEnPantalla();
                alertaPagoServicio(telefono, "Teléfono");
            }
            break;
        default:
            alert("El servicio no se encuentra en la lista");
    }
}

function transferirDinero() {

    var dineroATransferir;
    var cuentaATransferir;
    do {
        dineroATransferir = parseInt(prompt("Ingrese el monto a transferir: "));

        if (dineroATransferir < 0) alert("El monto ingresado es inválido.");
        else if (dineroATransferir > saldoCuenta) alert("El saldo es insuficiente.");

    } while (dineroATransferir > saldoCuenta || dineroATransferir < 0)

    if (isNaN(dineroATransferir)) return;

    cuentaATransferir = parseInt(prompt("Ingrese el número de cuenta a transferir."));

    if (cuentaATransferir != cuentaAmiga_1 && cuentaATransferir != cuentaAmiga_2) {
        alert("La transferencia solo puede ser realizada hacia cuentas amigas.");

    } else {
        restarDinero(dineroATransferir);
        actualizarSaldoEnPantalla();
        alert("La transferencia se realizó con éxito!\nSe han transferido: $" + dineroATransferir + "\nCuenta destino: " + cuentaATransferir);
    }

}


function iniciarSesion() {
    var ingresarCodigo = parseInt(prompt("Ingrese el código de acceso de 4 dígitos: "));

    if (ingresarCodigo == codigoCuenta) {

        alert("Bienvenido/a " + nombreUsuario + " ya puedes comenzar a realizar operaciones.")

    } else {
        restarDinero(saldoCuenta);
        actualizarSaldoEnPantalla();
        alert("Código incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad.")
    }
}

//Esta funcion permite cambiar el código con el que se accede a la cuenta.
function cambiarCodigoAcceso() {

    var codigoActual = parseInt(prompt("Ingrese el código de 4 dígitos actual: "));

    if (codigoActual != codigoCuenta) {
        alert("El código ingresado no es correcto.");
    } else {

        do {
            var codigoNuevo = parseInt(prompt("Ingrese el nuevo código.\nEl mismo debe contener 4 números."));

            if (isNaN(codigoNuevo)) {
                alert("El código ingresado es inválido.");
                break;
            }
            if (codigoNuevo.toString().length != 4) alert("El código debe ser de 4 dígitos numéricos.")

        } while (codigoNuevo.toString().length != 4)
    }

    if (isNaN(codigoNuevo)) return;

    codigoCuenta = codigoNuevo;
    alert("Se ha cambiado el código de acceso!");
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}