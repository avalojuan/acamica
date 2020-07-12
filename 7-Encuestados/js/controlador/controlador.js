/*
 * Controlador
 */
var Controlador = function(modelo) {
    this.modelo = modelo;
};

Controlador.prototype = {
    agregarPregunta: function(pregunta, respuestas) {
        if (pregunta.length > 0 && respuestas.length > 0) {
            this.modelo.agregarPregunta(pregunta, respuestas);
        }
    },

    borrarPregunta: function(id) {
        this.modelo.borrarPregunta(id);
    },

    borrarTodo: function() {
        this.modelo.borrarTodo();
    },

    editarPregunta: function(id) {
        if (!isNaN(id)) this.modelo.editarPregunta(id);
    },

    agregarVoto: function(nombrePregunta, respuestaSeleccionada) {
        this.modelo.agregarVoto(nombrePregunta, respuestaSeleccionada);
    },

    cargar: function() {
        this.modelo.cargar();
    }
};