const errroHandler = (err, req, res, next) => {
    const typeError = err.name;
    let errors = err;
    let stack = err.stack

    let message = errors.message

    if (typeError === 'ValidationError') {
        errors = Object.values(err.errors).map(err => err.message).join(', ');
        message = errors;
    }
    res.status(400).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : stack
    })
}

module.exports = {
    errroHandler
}