const { Schema, model } = require('mongoose')


const userProfileSchema = Schema({
    userId:
    {
        type: Schema.Types.ObjectId,
        required: true
    },
    username:
    {
        type: String,
        required: true
    },
    avatarImg:
    {
        type: String,
        required: true,
    },
    category:
    {
        type: String,
        required: true
    },
    about:
    {
        type: String,
        required: true
    },
    followers: 
    {
        type: String,
    },
    goals: [{ type: Schema.Types.ObjectId, ref: 'Goal' }]
}, {
    timestamps: true
})


module.exports = model('Profile', userProfileSchema);