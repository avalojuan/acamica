var expect = chai.expect;

describe('Testeamos la funcion reservarHorario.', function() {
    it('Cuando se reserva un horario de un restaurant, el horario correspondiente se elimina del arreglo.', function() {
        var restauranteElegido = listado.restaurantes[0];
        restauranteElegido.reservarHorario("13:00");
        expect(restauranteElegido.horarios[0]).to.equal("15:30");
        expect(restauranteElegido.horarios[1]).to.equal("18:00");
    })

    it('Cuando se reserva un Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual.', function() {
        var restauranteElegido = listado.restaurantes[5];
        restauranteElegido.reservarHorario("20:00");
        expect(restauranteElegido.horarios.length).to.equal(3);
        expect(restauranteElegido.horarios[0]).to.equal("17:00");
        expect(restauranteElegido.horarios[1]).to.equal("19:00");
        expect(restauranteElegido.horarios[2]).to.equal("20:30");
    })

    it('Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual.', function() {
        var restauranteElegido = listado.restaurantes[5];
        restauranteElegido.reservarHorario();
        expect(restauranteElegido.horarios.length).to.equal(3);
        expect(restauranteElegido.horarios[0]).to.equal("17:00");
        expect(restauranteElegido.horarios[1]).to.equal("19:00");
        expect(restauranteElegido.horarios[2]).to.equal("20:30");
    })
})

describe("Testeamos la funcion obtenerPuntuacion", function() {
    it("Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente.", function() {
        var restauranteElegido = listado.restaurantes[11];

        expect(restauranteElegido.obtenerPuntuacion()).to.equal(5)
    })

    it("Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.", function() {
        var restauranteElegido = listado.restaurantes[11];
        restauranteElegido.calificaciones = [];

        expect(restauranteElegido.obtenerPuntuacion()).to.equal(0)
    })
})

describe("Testeamos la funcion calificar", function() {
    it("Dado un restaurant se agrega correctamente una nueva calificacion.", function() {
        var restauranteElegido = listado.restaurantes[1];
        restauranteElegido.calificar(3);

        expect(restauranteElegido.calificaciones[5]).to.equal(3)
        expect(restauranteElegido.calificaciones.length).to.equal(6)
    })

})

describe("Testeamos la funcion buscarRestaurante(id)", function() {
    it("La funcion retorna el restaurante buscado con el id.", function() {
        var restauranteBuscado = listado.buscarRestaurante(12);

        expect(restauranteBuscado.nombre).to.equal("Just Salad")
    })

})



describe("Testeamos la funcion obtenerRestaurantes", function() {
    it("Al filtrar por Rubro esta devuelve un listado con los restaurantes que pertenecen al mismo.", function() {
        var restaurantesAsiaticos = listado.obtenerRestaurantes("Asiática", null, null);

        expect(restaurantesAsiaticos.length).to.equal(3)
    })

    it("Al filtrar por Ciudad esta devuelve un listado con los restaurantes que pertenecen a la misma.", function() {
        var restaurantesAsiaticos = listado.obtenerRestaurantes(null, "Nueva York", null);

        expect(restaurantesAsiaticos.length).to.equal(7)
    })

    it("Al filtrar por Horario esta devuelve un listado con los restaurantes disponibles en ese horario.", function() {
        var restaurantesAsiaticos = listado.obtenerRestaurantes(null, null, "12:00");

        expect(restaurantesAsiaticos.length).to.equal(11)
    })
})

//Realizamos los tests que validen los requerimientos de la funcionalidad Reserva

describe("Testeamos la funcion calcularPrecioBase", function() {
    it("Dada una reserva con cantidad de personas válido y precio válido se calcula correctamente el precio Base.", function() {
        var reserva1 = new Reserva(new Date(2018, 7, 24, 11, 00), 8, 350, "DES1")
        var reserva2 = new Reserva(new Date(2018, 7, 27, 14, 100), 2, 150, "DES200")

        expect(reserva1.calcularPrecioBase()).to.equal(2800)
        expect(reserva2.calcularPrecioBase()).to.equal(300)

    })
})

describe("Testeamos la funcion calcularPrecioFinal", function() {

    it("Dada una reserva se calcula correctamente el precio Final.", function() {
        var reserva1 = new Reserva(new Date(2018, 7, 24, 11, 00), 8, 350, "DES1")
        var reserva2 = new Reserva(new Date(2018, 7, 27, 14, 100), 2, 150, "DES200")

        expect(reserva1.calcularPrecioFinal()).to.equal(2450)
        expect(reserva2.calcularPrecioFinal()).to.equal(100)

    })

})