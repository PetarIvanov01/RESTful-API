const asyncHandler = require('express-async-handler')
const auth = require('../services/userService');

const loginHandler = asyncHandler(async (req, res) => {

    const { user, token } = await auth.login(req.body);

    if (user) {
        res.status(200).json({
            _id: user._id,
            email: user.email,
            token
        });
    }
    else {
        res.status(400)
        throw new Error('Not Authorized')
    }


})

const registerHandler = asyncHandler(async (req, res) => {

    const { user, token } = await auth.register(req.body);

    if (user) {
        res.status(201).json({
            _id: user._id,
            email: user.email,
            token
        });
    }


})

const privateHandler = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})


module.exports = { registerHandler, loginHandler, privateHandler }