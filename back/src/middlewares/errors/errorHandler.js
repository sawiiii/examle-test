/* eslint-disable no-unused-vars */
function errorHandler(err,req,res,next) {
    res.status(err.status || 500).send({
        message: err.message,
        error: err
    });
}

function notFoundError(req,res, next) {
    res.status(404).send({
        message: 'Not found'
    });
}

module.exports = {
    errorHandler,
    notFoundError
};