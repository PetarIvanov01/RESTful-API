const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register({ email, password }) {
    try {

        const exsiting = await User.findOne({ email });
        if (email == '' || password == '') {
            throw new Error('All fields are required!');
        }

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

    } catch (error) {
        throw error
    }
}

async function login({ email, password }) {
    try {
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

    } catch (error) {
        throw error
    }

}

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
    verifyToken
}