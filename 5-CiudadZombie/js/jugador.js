/* El objeto jugador es un objeto literal que se encuentra incompleto.
 Solo tiene asignadas algunas de sus propiedades y ningun metodo */
var Jugador = {
    /* el sprite contiene la ruta de la imagen
     */
    sprite: 'imagenes/auto_rojo_abajo.png',
    x: 130,
    y: 160,
    ancho: 15,
    alto: 30,
    velocidad: 10,
    vidas: 5,
    // Hay que agregar lo que falte al jugador: movimientos, perdida de vidas,
    // y todo lo que haga falta para que cumpla con sus responsabilidades

    //Mueve el jugador segun la direccion solicitada.
    mover: function(direccion) {
        switch (direccion) {
            case "izq":
                this.x -= this.velocidad;
                this.sprite = 'imagenes/auto_rojo_izquierda.png';
                spriteHorizontal(this);
                break;

            case "der":
                this.x += this.velocidad;
                this.sprite = 'imagenes/auto_rojo_derecha.png';
                spriteHorizontal(this);
                break;

            case "arriba":
                this.y -= this.velocidad;
                this.sprite = 'imagenes/auto_rojo_arriba.png';
                spriteVertical(this);
                break;

            case "abajo":
                this.y += this.velocidad;
                this.sprite = 'imagenes/auto_rojo_abajo.png';
                spriteVertical(this);
                break;
        }
    },

    //Le quita vidas al jugador segun el daño recibido.
    perderVidas: function(cantVidas) {
        this.vidas -= cantVidas;
    },

    //Le agrega vidas al jugador segun la curacion del objeto.
    ganarVidas: function(cantVidas) {
        this.vidas += cantVidas;

    }
};




//Modifican el ancho y largo del objeto jugador segun su direccion.
function spriteHorizontal(objeto) {
    objeto.ancho = 30;
    objeto.alto = 15;
}

function spriteVertical(objeto) {
    objeto.ancho = 15;
    objeto.alto = 30;
}