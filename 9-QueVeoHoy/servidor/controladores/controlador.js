var con = require("../lib/conexionbd");

function buscarPeliculas(req, res) {
    var sql = ""; //Variable que almacena los parámetros
    var ponerAnd = false; //Flag utilizada para saber si se coloca el AND en el WHERE

    //Se declaran los parametros a recibir
    var anio = req.query.anio;
    var titulo = req.query.titulo;
    var genero = req.query.genero;
    var orden = req.query.columna_orden;
    var tipo_orden = req.query.tipo_orden;
    var pagina = req.query.pagina;
    var cantidad = req.query.cantidad;

    //Si no hay filtros no se utiliza el WHERE
    if (anio != undefined || titulo != undefined || genero != undefined) sql += " WHERE ";

    //Si se filtra por año se agrega el parámetro
    if (anio != undefined) {
        sql += "anio=" + anio;
        ponerAnd = true;
    }

    //Se filtra por Título si corresponde
    if (titulo != undefined) {
        if (ponerAnd) sql += " AND ";
        else ponerAnd = true;
        sql += " titulo LIKE '%" + titulo + "%'";
    }

    //Se filtra por Género si corresponde
    if (genero != undefined) {
        if (ponerAnd) sql += " AND ";
        sql += " genero_id=" + genero;
    }

    //Se ordena segun corresponda
    sql += " ORDER BY " + orden + " " + tipo_orden;

    //Se implementa la paginacion
    var limite = " LIMIT " + ((pagina - 1) * cantidad) + "," + cantidad;

    con.query("SELECT * FROM pelicula " + sql + limite, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta1", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }

        //Se obtiene el total de resultados segun los parámetros como "total"
        con.query("SELECT COUNT(*) AS total FROM pelicula " + sql, function(error, resultado_cuenta, fields) {
            if (error) {
                console.log("Hubo un error en la consulta1", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }

            var response = {
                'peliculas': resultado,
                'total': resultado_cuenta[0].total
            };

            res.send(JSON.stringify(response));
        })
    });
}
//Se buscan los generos de las peliculas
function buscarGeneros(req, res) {

    var sql = "SELECT * FROM genero";
    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta2", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        var response = {
            'generos': resultado
        };

        res.send(JSON.stringify(response));
    });
}

function obtenerPelicula(req, res) {
    var id = req.params.id;
    var sql_pelicula = "SELECT * FROM pelicula INNER JOIN genero ON pelicula.genero_id = genero.id WHERE pelicula.id =" + id;

    var sql_actores = 'SELECT actor.nombre FROM actor ' +
        'INNER JOIN actor_pelicula ON actor.id = actor_pelicula.actor_id ' +
        'INNER JOIN pelicula ON pelicula.id = actor_pelicula.pelicula_id ' +
        'WHERE pelicula.id= ' + id;

    con.query(sql_pelicula, function(error, resultado_pelicula, fields) {
        if (error) {
            console.log("Hubo un error en la consulta3A", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        con.query(sql_actores, function(error, resultado_actores, fields) {
            if (error) {
                console.log("Hubo un error en la consulta3B", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }
            var response = {
                'pelicula': resultado_pelicula[0],
                'actores': resultado_actores
            };
            res.send(JSON.stringify(response));
        })
    });
}

function obtenerRecomendacion(req, res) {
    var sql = "SELECT pelicula.* FROM pelicula";
    var genero = req.query.genero;
    var anio_inicio = req.query.anio_inicio;
    var anio_fin = req.query.anio_fin;
    var puntuacion = req.query.puntuacion;

    if (genero != undefined) sql += " JOIN genero ON genero.nombre = '" + genero + "'" +
        "AND genero.id = pelicula.genero_id";

    if (anio_inicio != undefined) sql += " WHERE pelicula.anio BETWEEN " + anio_inicio + " AND " + anio_fin;
    if (puntuacion != undefined) sql += " WHERE pelicula.puntuacion >= " + puntuacion;

    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        var response = {
            'peliculas': resultado
        };

        res.send(JSON.stringify(response));
    });

}

module.exports = {
    buscarPeliculas: buscarPeliculas,
    buscarGeneros: buscarGeneros,
    obtenerPelicula: obtenerPelicula,
    obtenerRecomendacion: obtenerRecomendacion
}