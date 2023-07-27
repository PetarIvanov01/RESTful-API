const { Schema, model, Types } = require('mongoose');


const goalSchema = Schema({
    text: {
        type: String,
        required: [true, 'Please add a text value'],
    },
    owner: { ref: 'User', required: true, type: Schema.Types.ObjectId }
}, {
    timestamps: true
})

module.exports = model('Goal', goalSchema);