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
    avatarImg: {
        value: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true
        }
    },
    category:
    {
        type: String,
        required: true
    },
    aboutMe:
    {
        type: String,
        required: true
    },
    followers: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],

    goals: [{ type: Schema.Types.ObjectId, ref: 'Goal' }]
}, {
    timestamps: true
})


module.exports = model('Profile', userProfileSchema);