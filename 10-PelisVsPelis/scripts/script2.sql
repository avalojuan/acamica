USE competencias;

/*Tabla competencias*/
CREATE TABLE competencias (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(70),
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Insertamos algunas competencias*/
INSERT INTO competencias (nombre)
VALUES 
    ('¿Cuál es la mejor pelicula?'),
    ('¿Cuál peli es más original?'),
    ('¿Cuál peli tiene los mejores efectos?'),
    ('¿Cuál peli tiene los mejores actores?'),
    ('¿Cuál peli es más conocida?'),
    ('¿Cuál peli verías con un amigo?');


/*Creamos la tabla para almacenar los votos de las competencias*/    
CREATE TABLE votos (
    id_competencia INT(11) NOT NULL,
    pelicula_votada_id INT(11) UNSIGNED NOT NULL,
    FOREIGN KEY (id_competencia) REFERENCES competencias(id) ON DELETE CASCADE,
    FOREIGN KEY (pelicula_votada_id) REFERENCES pelicula(id) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Modificamos la tabla votos para manejar la baja lógica*/
ALTER TABLE votos
ADD COLUMN estado TINYINT(1) NOT NULL  AFTER pelicula_votada_id;
UPDATE votos SET estado = 1;

/*Modificamos la tabla competencias agregando el genero*/
ALTER TABLE competencias
ADD COLUMN genero_id INT (11) UNSIGNED NOT NULL  AFTER nombre;

/*Modificamos la tabla competencias agregando el director*/
ALTER TABLE competencias
ADD COLUMN director_id INT (11) UNSIGNED NOT NULL  AFTER genero_id;

/*Modificamos la tabla competencias agregando el actor*/
ALTER TABLE competencias
ADD COLUMN actor_id INT (11) UNSIGNED NOT NULL AFTER director_id;
