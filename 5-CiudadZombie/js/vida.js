//Implementamos el objeto vida que sana al jugador al hacer contacto.
//Recibe un sprite, posicion x e y, ancho y largo y la potencia de curacion.

var Vida = function(sprite, x, y, ancho, alto, curacion) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.curacion = curacion;


    //Cura al jugador.
    this.curar = function(jugador) {
        jugador.ganarVidas(this.curacion);
        this.curacion = 0;
    }
}