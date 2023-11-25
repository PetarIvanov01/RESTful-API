const { Schema, model } = require('mongoose')

const predefinedAvatars = require('../../MockDataPreload/MockData/mockAvatars.json')

const validImageUrlValidator = (value) => {
    const matchingAvatar = predefinedAvatars.some(
        (predefinedAvatar) => predefinedAvatar.value === value
    );
    return matchingAvatar;
};

const validAvatarValidator = (label) => {
    const matchingAvatar = predefinedAvatars.some(
        (predefinedAvatar) => predefinedAvatar.label === label
    );
    return matchingAvatar;
};

const userProfileSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [3, 'Username should be at least 3 characters long'],
        maxlength: [50, 'Username cannot exceed 50 characters'],
    },
    avatarImg: {
        value: {
            type: String,
            required: [true, 'Avatar image URL is required'],
            validate: [
                {
                    validator: validImageUrlValidator,
                    message: 'Invalid avatar image URL. It should start with http or https',
                },
            ],
        },
        label: {
            type: String,
            required: [true, 'Avatar image label is required'],
            validate: [
                {
                    validator: validAvatarValidator,
                    message: 'Invalid avatar image. The combination of value and label should exist in the predefined avatars.',
                },
            ],
        },
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['sport', 'lifestyle', 'career'],
    },
    aboutMe: {
        type: String,
        required: [true, 'About me is required'],
        maxlength: [250, 'About me cannot exceed 250 characters'],
    },
    followers: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
    liked: [{ type: Schema.Types.ObjectId, ref: 'Goal' }],
    goals: [{ type: Schema.Types.ObjectId, ref: 'Goal' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, {
    timestamps: true
})

module.exports = model('Profile', userProfileSchema);