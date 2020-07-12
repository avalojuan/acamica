var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {

    this.horarios = this.horarios.filter(function(horario) {
        return horario != horarioReservado;
    });

    return;
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) return 0;

    return Math.round(promedio(this.calificaciones) * 10) / 10;
}


function sumatoria(numeros) {
    var suma = 0;
    numeros.forEach(numero => suma += numero);
    return suma;
}

function promedio(numeros) {
    return (sumatoria(numeros) / numeros.length);
}