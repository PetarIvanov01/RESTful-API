const asyncHandler = require('express-async-handler');
const auth = require('../services/userService');

const loginHandler = asyncHandler(async (req, res) => {

    const { user, token } = await auth.login(req.body);

    if (user) {
        res.status(200).json({
            _id: user._id,
            email: user.email,
            token,
            customized : user.customized
        });
    }
    else {
        res.status(400).json({
            message: 'Not Authorized'
        });
    };

});

const registerHandler = asyncHandler(async (req, res) => {

    const { user, token } = await auth.register(req.body);

    if (user) {
        res.status(201).json({
            _id: user._id,
            email: user.email,
            token,
            customized : user.customized
        });
    };
});

module.exports = { registerHandler, loginHandler }