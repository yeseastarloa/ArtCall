// Importamos express y creamos un router
const express = require('express');
const router = express.Router();

///Importamos las funciones controladoras finales
const { newUserController } = require('../controllers/users');

//Definimos los Endpoints Resgitro de usuario. con la importación del controller
router.post('/users/register', newUserController);

module.exports = router;
