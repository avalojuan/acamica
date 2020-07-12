//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var competenciasController = require('./controladores/competenciasController');
const { obtenerCompetencia } = require('./controladores/competenciasController');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//Aca hacemos los pedidos al backend

app.get('/competencias/:id/peliculas', competenciasController.obtenerOpciones);
app.get('/competencias/:id', obtenerCompetencia);
app.get('/competencias', competenciasController.listarCompetencias);
app.post('/competencias/:id/voto', competenciasController.agregarVoto);
app.get('/competencias/:id/resultados', competenciasController.obtenerResultado);
app.post('/competencias', competenciasController.crearCompetencia);
app.delete('/competencias/:id/votos', competenciasController.reiniciarCompetencia);
app.get('/generos', competenciasController.obtenerGenero);
app.get('/directores', competenciasController.obtenerDirectores);
app.get('/actores', competenciasController.obtenerActores);
app.delete('/competencias/:id', competenciasController.eliminarCompetencia);
app.put('/competencias/:id', competenciasController.editarCompetencia);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function() {
    console.log("Escuchando en " + puerto);
});