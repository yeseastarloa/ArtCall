//import { notFoundError } from '../errors/errorService.js';

const { notFoundError } = require('./errorService.js');

// Función controladora final que retorna un error 404.
const errorNotFoundController = (req, res, next) => {
    next(notFoundError('ruta'));
};

module.exports = errorNotFoundController;
