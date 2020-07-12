CREATE DATABASE queveohoy;

USE queveohoy;

/*Tabla pelicula*/
CREATE TABLE pelicula (
  id INT NOT NULL,
  titulo VARCHAR(100) NOT NULL,
  duracion INT(5) NOT NULL,
  director VARCHAR(400) NOT NULL,
  anio INT(5) NOT NULL,
  fecha_lanzamiento DATE NOT NULL,
  puntuacion INT(2) NOT NULL,
  poster VARCHAR(300) NOT NULL,
  trama VARCHAR(700) NOT NULL,
  PRIMARY KEY (id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Tabla genero*/
CREATE TABLE genero (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Se agrega columna genero_id a la tabla pelicula*/
ALTER TABLE pelicula
ADD COLUMN genero_id INT NOT NULL;

/*Tabla actor*/
CREATE TABLE actor (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(70) NOT NULL,
  PRIMARY KEY(id)

) ENGINE= InnoDB DEFAULT CHARSET = utf8;

/*Creamos la tabla que relaciona actor y pelicula*/
CREATE TABLE actor_pelicula (
  id INT NOT NULL AUTO_INCREMENT,
  actor_id INT(11) NOT NULL,
  pelicula_id INT(11) NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(actor_id) REFERENCES actor(id),
  FOREIGN KEY(pelicula_id) REFERENCES pelicula(id)  

) ENGINE = InnoDB DEFAULT CHARSET = utf8;
