const errroHandler = (err, req, res, next) => {
    const typeError = err.type;

    let statusCode = res.statusCode ? res.statusCode : 500;

    if (typeError === 'custom') {
        statusCode = 403;
        res.status(403);
    }
    else {
        statusCode = 400;
        res.status(400)
    }

    console.log(statusCode);
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errroHandler
}