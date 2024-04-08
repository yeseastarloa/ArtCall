// importamos las variables de entorno de nuestro fichero .env

require('dotenv').config();

// importamos las dependencias. Express para crear servidor, morgan muestra por consola la información de la petición entrante, cors para evitar errores en la conexión entre en back y el front
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

//Importamos las rutas que trabajamos en routes e index.js. el require busca automaticamente el index por nosotros,
const routes = require('./src/routes');

// Importamos los controladores de errores
//const errorNotFoundController = require('./src/controllers/errors/errorNotFoundController');
//const errorController = require('./src/controllers/errors/errorController');

//creamos el servidor
const app = express();

//MIDDLEWARE: Es una función que se ejecuta cuando una petición entra en el servidor.(express) Podemos tener uno o varios middlewares
//Middleware que desserializa un body en formato "raw" creando la propiedad "body" en el
//objeto "request". Este middleware solo vale para bod en formato raw
app.use(express.json());

// Middleware que muestra por consola la información de la petición entrante (morgan). para mostrar logs. hay que pasar un string espacifico en este caso 'dev'.
app.use(morgan('dev'));

//Middleware que evita problemas con las cors cuando intentamos conectar con el cliente con el servidor.
//Sin esto no podemos conectarnos con el cliente
app.use(cors());

//Mddleware que indica a express donse se encuntran las rutas
app.use(routes);

// 1,2,3 dejar siempre al final
// 1. Middleware de ruta no encontrada. Lo pase a controladores de errores
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'ruta no econtrada',
    });
});

//2. Middleware de error. Es la función controladora para el middleware de error con 4 parametros
// el httpStatus es inventado para errores propios, sino es un error propio devolvemos (|| 500)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.httpStatus || 500);
});
// //3 . Middleware de ruta no encontrada
///app.use(errorNotFoundController);

// //Middleware de error
//app.use(errorController);

// Ponemos el servidor a escuchar peticiones en un puerto dado
app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
