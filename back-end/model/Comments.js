const { model, Schema } = require('mongoose');

const commentSchema = new Schema(
    {
        message: {
            type: String,
            required: true
        },
        userId: {
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

const Comment = model('Comment', commentSchema);
module.exports = Comment;
