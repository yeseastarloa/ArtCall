// importamos las dependencias de mysql2
// Importamos las dependencias necesarias para crear la conexión a MySQL (para que se asincrona tiene que haber un promises)
//import { createConnection, createPool } from 'mysql2/promise';
// const mysql = require('mysql2/promise'); habria que llamar la variable con un .antes de la conexion
const { createConnection, createPool } = require('mysql2/promise');

//importamos las variables de entorno de nuestro fichero .env, vamos a usar las dependencia dotenv, que tiene el metodo config y nos perimte acceder a sus variable
//require('dotenv').config();
//require('dotenv/config'); esto lo eliminamos, porque nosotros nunca vamos a iniciar desde getDb, lo hacemos desde InitDb

// obtener las varaibles de entorno por destructuring. la variables estan ubicadas en un objeto global qque tiene muchas propiedades dentro y entre esas propiedades estan las que necesitamos
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

//variable que almacenara un grupo de conexiones. a esta variable se le llama pool (que piscina)
let pool;

// función que retorna una conexión libre con la base de datos
const getDb = async () => {
    try {
        // Si la variable "pool" es undefined la invertimos para poder entrar con el if, proque incialmente va a estar vacia
        if (!pool) {
            // Creamos una conexión con la base de datos. Este metodo nos pide un objeto con los datos de acceso a la base de datos
            //ahora estamos creando la base de datos si no existe. Esto me permite conectarme al servidor MySQL
            const connection = await createConnection({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASSWORD,
                timezone: 'local',
            });

            //ahora estamos creando la base de datos si no existe. El metodo query es asincrono entonces hay que poner un await asi primero esperamos a que se concrete

            await connection.query(
                `CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`
            );

            // Creamos el grupo de conexiones. le pasamos un objeto con caracteristicas similares al anteriro pero agregando mas información como el numero de conexiones que vamos a tener en el array
            pool = createPool({
                connectionLimit: 10,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASSWORD,
                database: MYSQL_DATABASE,
                timezone: 'local',
            });
        }

        //probamos si funciona
        console.log('Funciona');
        // Al salir del if retornamos una conexión con la base de datos
        return await pool.getConnection();
    } catch (err) {
        console.error(err);
    }
};
//este get.Db era solo una prueba
//getDb();
//Exportamos la función anterior

module.exports = getDb;
