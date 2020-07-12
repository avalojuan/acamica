var con = require("../lib/conexionbd");

function listarCompetencias(req, res) {
    var sql = "SELECT * FROM competencias";

    con.query(sql, function(error, resultado, fields) {
        if (error) res.status(500).send(error);

        res.send(JSON.stringify(resultado));
    });
}

function obtenerOpciones(req, res) {
    var id = req.params.id;

    //Seleccionamos la competencia segun el id recibido
    var sql_idCompetencia = "SELECT nombre, genero_id,director_id, actor_id FROM competencias WHERE id = " + id;

    con.query(sql_idCompetencia, function(error, r_competencia, fields) {
        if (error) res.status(500).send(error);
        if (r_competencia.length == 0) {
            return res.status(404).send("No existe la competencia");
        }
        //Seleccionamos dos peliculas al azar dependiendo el genero
        var genero_competencia = r_competencia[0].genero_id;
        var director_competencia = r_competencia[0].director_id;
        var actor_competencia = r_competencia[0].actor_id;

        //Generamos la query con los filtros de genero, director y actor.
        var sql_pelicula = generarQuery(genero_competencia, director_competencia, actor_competencia);

        sql_pelicula += " ORDER BY rand() LIMIT 2";

        con.query(sql_pelicula, function(error, r_pelicula, fields) {
            if (error) res.status(500).send(error);

            //Formamos la respuesta a enviar
            var result = {
                peliculas: r_pelicula,
                competencia: r_competencia[0].nombre
            }
            res.send(result);
        })
    });
}


//Funcion que guarda el voto a la pelicula elegida
function agregarVoto(req, res) {
    var idPelicula = req.body.idPelicula;
    var idCompetencia = req.params.id;

    //Query que busca si existe el id de pelicula y competencia
    sql_verificacion = 'SELECT titulo FROM pelicula WHERE id = ' + JSON.stringify(idPelicula) + "UNION SELECT nombre FROM competencias WHERE id = " + JSON.stringify(idCompetencia);

    //Query que inserta el voto en la tabla votos y su ESTADO 1
    sql = 'INSERT INTO votos (id_competencia, pelicula_votada_id, estado) VALUES (' + idCompetencia + ',' + idPelicula + ', 1)';

    con.query(sql_verificacion, function(error, r_comprobacion, fields) {

        //Verificamos que exista la pelicula y competencia votada.
        if (error) res.status(500).send(error);
        if (r_comprobacion.length < 2) {
            return res.status(404).send("La película o la competencia no existen.");
        }

        //Insertamos el voto en la tabla
        con.query(sql, function(error, resultado, fields) {
            if (error) res.status(500).send(error);

            res.send(JSON.stringify(resultado));
        });
    });
}

function obtenerResultado(req, res) {
    var idCompetencia = req.params.id;
    //Verifica si la competencia existe
    sql_verificacion = 'SELECT nombre FROM competencias JOIN votos ON competencias.id = votos.id_competencia WHERE votos.estado = 1  AND competencias.id =' + idCompetencia;

    //Obtenemos el resultado de los votos
    sql = 'SELECT pelicula.*, competencias.nombre, votos.pelicula_votada_id, COUNT(*) AS total FROM votos' +
        ' JOIN pelicula ON pelicula_votada_id = pelicula.id' +
        ' JOIN competencias ON id_competencia = competencias.id WHERE votos.estado = 1 AND id_competencia = ' + idCompetencia +
        ' GROUP BY pelicula_votada_id ORDER BY total DESC LIMIT 3;'

    con.query(sql_verificacion, function(error, r_verificacion, fields) {
        if (error) res.status(500).send(error);
        if (r_verificacion.length < 1) {
            return res.status(404).send("La competencia solicitada no existe o no tiene votos.");
        }

        con.query(sql, function(error, response, fields) {
            if (error) res.status(500).send(error);

            var result = {
                competencia: response[0].nombre,
                resultados: []
            }

            for (i in response) result.resultados.push({ pelicula_id: response[i].id, poster: response[i].poster, titulo: response[i].titulo, votos: response[i].total })
            res.send(JSON.stringify(result));


        });
    });
}

function crearCompetencia(req, res) {

    var nombreCompetencia = req.body.nombre;
    var generoCompetencia = req.body.genero;
    var directorCompetencia = req.body.director;
    var actorCompetencia = req.body.actor;

    //Query que busca si ya existe la competencia que intentamos agregar
    sql_verificacion_existencia = 'SELECT nombre FROM competencias WHERE nombre = "' + nombreCompetencia + '"';

    //Generamos la query con los filtros genero, director y competencia.
    sql_verificacion_cantidad = generarQuery(generoCompetencia, directorCompetencia, actorCompetencia);

    //Query que inserta la nueva competencia
    sql_insercion = 'INSERT INTO competencias (nombre, genero_id, director_id, actor_id) VALUES ("' + nombreCompetencia + '",' + '"' + generoCompetencia + '",' + '"' + directorCompetencia + '",' + '"' + actorCompetencia + '")';
    con.query(sql_verificacion_existencia, function(error, r_existencia, fields) {

        if (error) res.status(500).send(error);
        //Verificamos que no exista la competencia a agregar.
        if (r_existencia.length > 0) return res.status(422).send("La competencia ya existe.");

        if (nombreCompetencia.length == 0) return res.status(422).send("El campo nombre no puede estar vacio");

        //Verificamos que haya al menos 2 peliculas con los parametros elegidos
        con.query(sql_verificacion_cantidad, function(error, r_cantidad, fields) {
            if (error) res.status(500).send(error);
            if (r_cantidad.length < 2) {
                return res.status(422).send("No hay resultados suficientes");
            }

            //Agregamos la competencia.
            con.query(sql_insercion, function(error, resultado, fields) {

                if (error) res.status(500).send(error);

                res.send(JSON.stringify(resultado));
            });
        });
    });

}

//Se eliminan los votos de forma lógica, previamente se modificó la tabla votos agregando la columna estado.
function reiniciarCompetencia(req, res) {
    var idCompetencia = req.params.id;

    //Query que busca si ya existe la competencia que intentamos reiniciar
    sql_verificacion = 'SELECT id_competencia FROM votos WHERE id_competencia = ' + idCompetencia;

    //Query que reinicia la competencia
    sql = 'UPDATE votos SET estado = 0 WHERE estado = 1 AND id_competencia = ' + idCompetencia;

    con.query(sql_verificacion, function(error, r_comprobacion, fields) {

        if (error) res.status(500).send(error);
        //Verificamos que exista la competencia a reiniciar
        if (r_comprobacion.length == 0) {
            return res.status(404).send("La competencia no existe o no tiene votos.");
        }

        //Reiniciamos la competencia
        con.query(sql, function(error, resultado, fields) {
            if (error) res.status(500).send(error);

            res.send(JSON.stringify(resultado));
        });
    });
}


//Parte del paso 6 que carga cada competencia individualmente segun el ID solicitado.
function obtenerCompetencia(req, res) {
    var idCompetencia = req.params.id;

    //Query que busca si ya existe la competencia que intentamos reiniciar
    var sql = 'SELECT * FROM competencias WHERE id = ' + idCompetencia;

    var sql_nombres = 'SELECT competencias.* ';
    var valores = ''; //Se agrega el nombre del dato con el formato utilizado en el front.
    var uniones = ''; //Se agrega un JOIN para cada dato solicitado.

    con.query(sql, function(error, resultado, fields) {
        if (error) res.status(500).send(error);
        //Verificamos que exista la competencia a cargar.
        if (resultado.length == 0) {
            return res.status(404).send("La competencia no existe.");
        }

        if (resultado[0].genero_id != 0) {
            valores += ', genero.nombre as genero_nombre';
            uniones += ' JOIN genero ON genero.id = competencias.genero_id ';
        }

        if (resultado[0].director_id != 0) {
            valores += ', director.nombre as director_nombre';
            uniones += ' JOIN director ON director.id = competencias.director_id ';
        }

        if (resultado[0].actor_id != 0) {
            valores += ', actor.nombre as actor_nombre';
            uniones += ' JOIN actor ON actor.id = competencias.actor_id ';
        }

        sql_nombres += valores + ' FROM competencias ' + uniones + ' WHERE competencias.id = ' + idCompetencia;

        con.query(sql_nombres, function(error, resp, fields) {

            if (error) res.status(500).send(error);
            //Verificamos que exista la competencia a reiniciar
            if (resp.length == 0) {
                return res.status(404).send("La competencia no existe.");
            }

            res.send(resp[0]);

        });

    });
}


/*
Paso 6 eliminar una competencia.
Se modificó la foreign key de la tabla votos.id_competencia para que se eliminen en cascada
con ON DELETE CASCADE.
*/
function eliminarCompetencia(req, res) {
    var idCompetencia = req.params.id;

    //Query que busca si existe la competencia
    sql_verificacion = 'SELECT nombre FROM competencias WHERE id = ' + idCompetencia;

    //Query que elimina la competencia
    sql = 'DELETE FROM competencias WHERE id = ' + idCompetencia;

    con.query(sql_verificacion, function(error, r_comprobacion, fields) {

        if (error) res.status(500).send(error);
        //Verificamos que existe la competencia
        if (r_comprobacion.length == 0) {
            return res.status(404).send("La competencia a eliminar no existe");
        }

        //Eliminamos la competencia
        con.query(sql, function(error, resultado, fields) {
            if (error) res.status(500).send(error);

            res.send(JSON.stringify(resultado));
        });
    });
}

//Paso 7 Editar el nombre de una competencia
function editarCompetencia(req, res) {
    var idCompetencia = req.params.id;
    var nombreCompetencia = req.body.nombre;

    //Query que busca si existe el id de competencia y el nombre
    sql_verificacion = 'SELECT id, nombre FROM competencias WHERE id = ' + idCompetencia +
        ' OR nombre = "' + nombreCompetencia + '"';

    //Query que cambia el nombre de la competencia
    sql = 'UPDATE competencias SET nombre = "' + nombreCompetencia + '" WHERE id = ' + idCompetencia;
    con.query(sql_verificacion, function(error, r_comprobacion, fields) {

        if (error) res.status(500).send(error);

        if (nombreCompetencia == undefined) {

            return res.status(422).send("El nombre de la competencia esta vacio");
        }
        if (r_comprobacion.length == 2) {

            return res.status(422).send("El nombre de competencia ya existe.");
        }
        if (r_comprobacion[0].id != idCompetencia) {
            return res.status(404).send("La competencia a editar no existe");
        }

        //Editamos la competencia
        con.query(sql, function(error, resultado, fields) {
            if (error) res.status(500).send(error);

            res.send(JSON.stringify(resultado));
        });
    });
}


function obtenerGenero(req, res) {
    var sql = "SELECT * FROM genero";

    con.query(sql, function(error, resultado, fields) {
        if (error) res.status(500).send(error);

        res.send(JSON.stringify(resultado));
    });
}

function obtenerDirectores(req, res) {
    var sql = "SELECT * FROM director";

    con.query(sql, function(error, resultado, fields) {
        if (error) res.status(500).send(error);

        res.send(JSON.stringify(resultado));
    });
}

function obtenerActores(req, res) {
    var sql = "SELECT * FROM actor";

    con.query(sql, function(error, resultado, fields) {
        if (error) res.status(500).send(error);

        res.send(JSON.stringify(resultado));
    });
}

//Se genera la query con los filtros genero, director y actor
function generarQuery(genero, director, actor) {
    var flag_genero = 0; //se filtra por genero
    var flag_director = 0; //se filtra por director
    var flag_actor = 0; //se filtra por actor
    var llevaAND = 0;

    var sql_pelicula = "SELECT pelicula.* FROM pelicula ";
    if (genero != 0) flag_genero = 1;

    if (director != 0) {
        flag_director = 1;
        sql_pelicula += "INNER JOIN director_pelicula ON director_pelicula.pelicula_id = pelicula.id " +
            "INNER JOIN director ON director.id = director_pelicula.director_id ";
    }

    if (actor != 0) {
        flag_actor = 1;
        sql_pelicula += "INNER JOIN actor_pelicula ON actor_pelicula.pelicula_id = pelicula.id " +
            "INNER JOIN actor ON actor_pelicula.actor_id = actor.id ";
    }

    //Si hay algun filtro se utiliza el WHERE
    if (flag_genero || flag_director || flag_actor) sql_pelicula += " WHERE ";

    if (flag_genero) {
        sql_pelicula += " pelicula.genero_id = " + genero;
        llevaAND = 1;
    }

    if (flag_director) {
        if (llevaAND) sql_pelicula += " AND ";
        sql_pelicula += " director.id = " + director;
        llevaAND = 1;
    }

    if (flag_actor) {
        if (llevaAND) sql_pelicula += " AND ";
        sql_pelicula += " actor.id = " + actor;
    }
    return sql_pelicula;
}

module.exports = {
    listarCompetencias: listarCompetencias,
    obtenerOpciones: obtenerOpciones,
    agregarVoto: agregarVoto,
    obtenerResultado,
    obtenerResultado,
    crearCompetencia,
    reiniciarCompetencia,
    obtenerGenero,
    obtenerDirectores,
    obtenerActores,
    obtenerCompetencia,
    eliminarCompetencia,
    editarCompetencia
}