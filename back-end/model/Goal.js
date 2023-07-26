const { Schema, model } = require('mongoose');


const goalSchema = Schema({
    text: {
        type: String,
        required: [true, 'Please add a text value'],
    },
}, {
    timestamps: true
})

module.exports = model('Goal', goalSchema);