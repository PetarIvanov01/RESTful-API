const { model, Schema } = require('mongoose');

const MAX_DEPTH = 3;
const commentSchema = new Schema(
    {
        message: {
            type: String,
            required: true,
            maxlength: [50, 'The comment should not exceed 50 symbols!'],
            minlength: [5, 'The comment should be at least 5 symbols!']
        },
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
            required: true
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: 'Goal',
            required: true
        },
        parent: {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
            default: null
        },
        depth: {
            type: Number,
            default: 1,
            min: [1, 'The minimum depth is 1.'],
            max: [MAX_DEPTH, `The maximum depth is ${MAX_DEPTH}.`],
        },
        children: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        }]
    }
    ,
    {
        timestamps: true,
    }
);
commentSchema.virtual('ownerIdProfile', {
    ref: 'Profile',
    localField: 'ownerId',
    foreignField: 'userId',
    justOne: true
});

commentSchema.set('toObject', { virtuals: true });
commentSchema.set('toJSON', { virtuals: true });

const Comment = model('Comment', commentSchema);
module.exports = Comment

