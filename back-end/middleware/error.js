const errroHandler = (err, req, res, next) => {
    const typeError = err.name;
    let status = 400;
    let errors = err;
    let stack = err.stack;

    let message = errors.message

    if (typeError === 'ValidationError') {
        errors = Object.values(err.errors).map(err => err.message).join(', ');
        message = errors;
    }
    if (typeError === 'TokenExpiredError') {
        message = 'JWT Token has expired. Please log in again to obtain a new token.'
        status = 401;
    }
    res.status(status).json({
        type: typeError,
        message,
        stack: process.env.NODE_ENV === 'production' ? null : stack
    })
}

module.exports = {
    errroHandler
}