const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { withTryCatch } = require('../util');

const register = withTryCatch(async ({ email, password }) => {

    if (email == '' || password == '') {
        throw new Error('All fields are required!');
    }
    const exsiting = await User.findOne({ email });

    if (exsiting) {
        throw new Error('Email is taken!');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        password: hashedPassword
    });

    const token = createSession(user._id, user.email);

    return { user, token };

})

const login = withTryCatch(async ({ email, password }) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Incorrect username or password');
    }
    const hasMatch = await bcrypt.compare(password, user.password);

    if (hasMatch == false) {
        throw new Error('Incorrect username or password');
    }

    const token = createSession(user._id, user.email);

    return { user, token };

})

function createSession(_id, email) {
    const payload = {
        _id,
        email
    };

    return jwt.sign(payload, process.env.JWT_SECTER);
}

function verifyToken(token) {

    return jwt.verify(token, process.env.JWT_SECTER);

}


module.exports = {
    login,
    register,
    verifyToken,
}