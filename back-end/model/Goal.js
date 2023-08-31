const { Schema, model } = require('mongoose');


const goalSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('Goal', goalSchema);