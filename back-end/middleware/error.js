const errroHandler = (err, req, res, next) => {
    const typeError = err.name;
    let statusCode = res.statusCode ? res.statusCode : 500;
    let errors = err;
    let stack = err.stack

    if (typeError === 'ValidationError') {
        errors = Object.values(err.errors).map(err => err.message);
        statusCode = 400;
        res.status(400)
    }

    res.status(statusCode).json({
        message: Array.isArray(errors) ? errors : errors.message,
        stack: process.env.NODE_ENV === 'production' ? null : stack
    })
}

module.exports = {
    errroHandler
}