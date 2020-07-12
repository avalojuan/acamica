var Reserva = function(horario, cantidadPersonas, precioPorPersona, codigoDescuento) {
    this.horario = horario;
    this.cantidadPersonas = cantidadPersonas;
    this.precioPorPersona = precioPorPersona;
    this.codigoDescuento = codigoDescuento;
}

Reserva.prototype.calcularPrecioBase = function() {

    return this.cantidadPersonas * this.precioPorPersona;
}

Reserva.prototype.calcularPrecioFinal = function() {

    var precioBase = this.calcularPrecioBase();
    var descuentos = calcularDescuentos(this, precioBase);
    var adicionales = calcularAdicionales(this, precioBase)

    return precioBase - descuentos + adicionales;
}


//Funcion que calcular los descuentos.
function calcularDescuentos(reserva, precioBase) {

    var descuentos = 0;

    //Se calcula el descuento por cantidad de personas 4-6, 7-8, mas de 8.
    if (reserva.cantidadPersonas > 3 && reserva.cantidadPersonas < 7) descuentos += precioBase * .05;
    if (reserva.cantidadPersonas > 7 && reserva.cantidadPersonas < 9) descuentos += precioBase * .1;
    if (reserva.cantidadPersonas > 8) descuentos += precioBase * .15;

    //Se aplica el código de descuento.
    switch (reserva.codigoDescuento) {
        case "DES15":
            descuentos += precioBase * .15;
            break;
        case "DES200":
            descuentos += 200;
            break;
        case "DES1":
            descuentos += reserva.precioPorPersona;
            break;
    }

    return descuentos;
}


//Funcion que calcula los adicionales.
function calcularAdicionales(reserva, precioBase) {

    var adicionales = 0;

    var horaReserva = reserva.horario.getHours();
    var diaReserva = reserva.horario.getDay();

    //Se calcula el adicional en horarios mas frecuentados.
    if (horaReserva == 13 || horaReserva == 20) adicionales += precioBase * .05;

    //Se calcula el adicional por fin de semana.
    if (diaReserva == 0 || diaReserva > 4) adicionales += precioBase * .1;

    return adicionales;
}