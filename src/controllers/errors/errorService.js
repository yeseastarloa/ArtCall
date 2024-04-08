module.exports = function notFoundError(resource = '') {
    throw {
        httpStatus: 404,
        code: 'RESOURCE_NOT_FOUND',
        message: `El recurso requerido "${resource}" no existe`,
    };
};

// module.exports = {
//     notFoundError,
// };
