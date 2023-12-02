const bcrypt = require('bcrypt');
const { Schema, model } = require('mongoose')

const validateEmail = (email) => {
    //Not good practice to validate email with regex!
    const emailSimpleRegex = /^[a-zA-Z0-9]+(?:[0-9]+)?@(gmail|email)\.([A-z]{2,4})$/i
    return emailSimpleRegex.test(email);
}

const validatePassword = (password) => {
    const regextValidator = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/i
    return regextValidator.test(password);
}

const userSchema = Schema({
    email:
    {
        type: String,
        required: [true, 'Email address is required!'],
        validate: [validateEmail, 'Please type a valid Email!']
    },
    password:
    {
        type: String,
        required: true,
        minLength: [6, 'Password is too short!'],
        validate: [validatePassword, 'Password must include a number!']
    },
    customized:
    {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
})

module.exports = model('User', userSchema);
