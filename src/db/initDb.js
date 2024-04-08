//importamos las variables de entorno de nuestro fichero .env, vamos a usar las dependencia dotenv, que tiene el metodo config y nos perimte acceder a sus variable
//require('dotenv').config(); (otro modo de importar)
//primero leemos la variables y luego importamos el fichero.env desde getDb
require('dotenv').config();

//importamos la función que nos permite obtener una conexión libre con la base de datos
const getDb = require('./getDb.js');

//Función que borrará las tablas de las bases de datos (si existen ) y las volvera a crear

const main = async () => {
    // variable que almacenara una conexión libre con la base de datos. la hacemos fuera porque la vamos a necesitar tanto en el try como en finally
    let connection;

    try {
        connection = await getDb();

        console.log('Borrandotablas....');
        await connection.query('DROP TABLE IF EXISTS openCallCustomFields');
        await connection.query('DROP TABLE IF EXISTS openCalls');
        await connection.query('DROP TABLE IF EXISTS users');

        console.log('funciona initDb');
        console.log('creando tablas...');
        console.log('Creando tabla users');
        await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(100) UNIQUE NOT NULL,
            username VARCHAR(30) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            name VARCHAR(30) UNIQUE NOT NULL,
            lastname VARCHAR(30) UNIQUE NOT NULL,
            avatar VARCHAR(100),
            bio VARCHAR(255), 
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
            
            role ENUM('admin', 'user') DEFAULT 'user',
            active BOOLEAN DEFAULT false
        );
        `);
        console.log('Creando tabla new openCalls');
        await connection.query(`
        CREATE TABLE IF NOT EXISTS openCalls(
            openCallId INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
            openCallUserId VARCHAR(20) NOT NULL,
            title VARCHAR(100) NOT NULL,
            state ENUM('active','closed','evaluation'),
            deadline DATE NOT NULL,
            extendedDeadline DATE,
            link VARCHAR(255) NOT NULL,
            image VARCHAR(255),
            place VARCHAR(255),
            requeriments VARCHAR(255),
            offers VARCHAR(255),
            comments VARCHAR(255),
            isActive BOOLEAN DEFAULT true,
            selected ENUM('Sí', 'No'),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
            hasCustomFields BOOLEAN DEFAULT false,
            FOREIGN KEY (openCallUserId) REFERENCES users(username)
    );
    `);
        console.log('Creando tabla new openCallCustomFields');
        await connection.query(`
        CREATE TABLE IF NOT EXISTS openCallCustomFields(
            id INT AUTO_INCREMENT PRIMARY KEY,
            openCallId INT UNSIGNED,
            fieldKey VARCHAR(255),
            fieldValue VARCHAR(255),
            FOREIGN KEY (openCallId) REFERENCES openCalls(openCallId)
    );
    `);
        console.log('tablas creadas!!!!');
    } catch (err) {
        console.error(err);
    } finally {
        // Si existe una conexión la liberamos
        if (connection) connection.release();

        //finalizamos el proceso
        process.exit();
    }
};

//Llamamos a la función anterior
main();
