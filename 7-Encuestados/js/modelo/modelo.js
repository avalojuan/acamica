/*
 * Modelo
 */
var Modelo = function() {
    this.preguntas = [];
    this.ultimoId = 0;

    //inicializacion de eventos
    this.preguntaAgregada = new Evento(this);
    this.preguntaEliminada = new Evento(this);
    this.preguntaEditada = new Evento(this);
    this.todoEliminado = new Evento(this);
    this.votoAgregado = new Evento(this);

};

Modelo.prototype = {
    //se obtiene el id más grande asignado a una pregunta
    obtenerUltimoId: function() {
        var maxId = this.ultimoId;
        this.preguntas.forEach(function(pregunta) {
            if (pregunta.id > maxId) maxId = pregunta.id;
        });
        return maxId;

    },

    //se agrega una pregunta dado un nombre y sus respuestas
    agregarPregunta: function(nombre, respuestas) {
        var id = this.obtenerUltimoId();
        id++;
        var nuevaPregunta = { 'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas };
        this.preguntas.push(nuevaPregunta);
        this.guardar();
        this.preguntaAgregada.notificar();
    },

    //se elimina una pregunta dado su id
    borrarPregunta: function(id) {
        this.preguntas = this.preguntas.filter(idPregunta => idPregunta.id != id);
        this.guardar();
        this.preguntaEliminada.notificar();
    },

    //se eliminan todas las preguntas
    borrarTodo: function() {
        this.preguntas = [];
        this.borrar();
        this.preguntaEliminada.notificar();
    },

    //se edita una pregunta
    editarPregunta: function(id) {
        this.preguntas.find(pregunta => pregunta.id == id).textoPregunta = prompt("Introduzca nueva pregunta: ");
        this.guardar();
        this.preguntaEditada.notificar();
    },


    agregarVoto: function(nombre, valor) {
        var preguntaElegida = this.preguntas.find(pregunta => pregunta.textoPregunta == nombre);
        preguntaElegida.cantidadPorRespuesta.forEach(function(respuesta) {
            if (respuesta.textoRespuesta == valor) respuesta.cantidad += 1;
        });

        this.guardar();
        this.votoAgregado.notificar();
    },

    //se guardan las preguntas
    guardar: function() {
        localStorage.setItem("preguntas", JSON.stringify(this.preguntas));
    },

    //se borran las preguntas guardadas
    borrar: function() {
        localStorage.removeItem("preguntas");
    },

    //permite recuperar las preguntas guardadas en localstorage
    cargar: function() {
        var preguntasGuardadas = JSON.parse(localStorage.getItem("preguntas"));

        if (preguntasGuardadas == null) this.preguntas = [];
        else this.preguntas = preguntasGuardadas;
    }
};