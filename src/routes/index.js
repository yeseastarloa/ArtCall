// Importamos express y creamos un router
const express = require('express');
const router = express.Router();

///Importamos las rutas
const userRoutes = require('./userRoutes');
const opencallsRoutes = require('./opencallsRoutes');

//Middleware que indica a express donse see encuentran las rutas de los usuarios y las opencalls
router.use(userRoutes);
router.use(opencallsRoutes);

module.exports = router;
