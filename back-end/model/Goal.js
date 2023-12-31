const { Schema, model } = require('mongoose');
const {_cascadeDeleteGoalFromProfile,_cascadeDeleteLikedFromProfile } = require('./middlewares/cascadeDeletion');


const wordCountValidatorExceed = (value) => {
    const words = value.split(/\s+/).filter(word => word.length > 0);
    return words.length <= 500;
};

const wordCountValidatorAtLeast = (value) => {
    const words = value.split(/\s+/).filter(word => word.length > 0);
    return words.length >= 20;
};

const validImageUrlValidator = (value) => {
    const urlRegex = /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    return urlRegex.test(value) && /\.(jpg|jpeg|png|gif)$/i.test(value);
};

const goalSchema = Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            minlength: [3, 'Title should be at least 3 characters long'],
            maxlength: [50, 'Title cannot exceed 50 characters'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            validate:
                [
                    {
                        validator: wordCountValidatorExceed,
                        message: 'Description cannot exceed 500 words',
                    },
                    {
                        validator: wordCountValidatorAtLeast,
                        message: 'Description should have at least 20 words',
                    },
                ],
        },
        image: {
            type: String,
            required: [true, 'Image URL is required'],
            validate: [
                {
                    validator: validImageUrlValidator,
                    message: 'Invalid image URL. It should start with http or https and end with a valid image extension (jpg, jpeg, png, gif)',
                },
            ],
        },
        likes: [{ type: Schema.Types.ObjectId, ref: 'Profile' }]
        ,
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
        ,
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
            field: 'userId',
            required: [true, 'Owner ID is required'],
        },
    },
    {
        timestamps: true,
    }
);

goalSchema.virtual('ownerProfile', {
    ref: 'Profile',
    localField: 'owner',
    foreignField: 'userId',
    justOne: true
});
goalSchema.virtual('likedProfile', {
    ref: 'Profile',
    localField: 'likes',
    foreignField: 'userId'
});

goalSchema.set('toObject', { virtuals: true });

goalSchema.pre('findOneAndDelete', _cascadeDeleteLikedFromProfile)
goalSchema.pre('findOneAndDelete', _cascadeDeleteGoalFromProfile)

const Goal = model('Goal', goalSchema);
module.exports = Goal;



