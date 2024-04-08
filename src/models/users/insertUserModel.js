// Importamos las dependencias
const bcrypt = require('bcrypt');

// Importamos la función  que nos permite obtener una conexión libre con la base de datos
const getDb = require('../../db/getDb');

//Función que SE CONECTARÁ a la base de datos y creará un usuario. Lafunción se tiene que llamar igual que el fichero
//que datos necesitamos para crear un usuario? ingresar eso
const insertUserModel = async (username, email, password) => {
    let connection;

    try {
        connection = await getDb();

        //si queremos que el usuario y el email sea unico tenemos que comprobra en la base de datos que no exista (cuando hacemos este tipo de consultas lo que me devuelve conexión.query es un array de arrays) Buscamos un usuario con ese email
        let [users] = await connection.query(
            `SELECT id FROM users WHERE email = ?`,
            [email]
        );

        //Si existe algún usuario con ese email lanzamos un error
        if (users.length > 0) {
            //creo el error
            const err = new Error('Ya existe un usuario con ese email');
            err.httpStatus = 409;
            throw err;
        }

        //si queremos que el usuario y el email sea unico tenemos que comprobra en la base de datos que no exista  buscamos un usuario con ese username. no hay que volver a declarar la variable
        [users] = await connection.query(
            `SELECT id FROM users WHERE username = ?`,
            [username]
        );

        //Si existe algún usuario con ese email lanzamos un error
        if (users.length > 0) {
            //creo el error
            const err = new Error(
                'Ya existe un usuario con ese nombre de usuario'
            );
            err.httpStatus = 409;
            throw err;
        }

        //Creamos el usuario, para ello hay que

        //encriptar el password(importamos el modulo bcrypt y usamos el metodo hash de bcrypt, este tiene metodos sincronos, lo ideal es usar asincrono porque node es asincrono)
        const hashedPass = await bcrypt.hash(password, 10);

        //Creamos el usuario en la base de datos, tantos signos de interrogación como campos querramos comprobar, los valores tienen que ir en el mismo orden en que se piden los campos

        await connection.query(
            `INSERT INTO users(email, username, password) VALUES (?, ?, ?)`[
                (email, username, hashedPass)
            ]
        );
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) connection.release(); //liberamos la conexión en caso de que no exista
    }
};

module.exports = insertUserModel;
