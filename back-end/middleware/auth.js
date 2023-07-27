const { verifyToken } = require("../services/userService");

const authorization = (req, res, next) => {
    try {

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(" ")[1];

        if (token) {
            const decode = verifyToken(token);
            req.user = decode;

            next()
        }
        else {
            throw new Error('Not Authorized');
        }
    }

    catch (error) {
        throw error
    }

}

module.exports = authorization