const { model, Schema } = require('mongoose');

const commentSchema = new Schema(
    {
        message: {
            type: String,
            required: true,
            maxlength: [50, 'The comment should not exceed 50 symbols!'],
            minlength: [5, 'The comment should be at least 5 symbols!']
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
        depth: {
            type: Number,
            default: 1,
            min: [1, 'The minimum depth is 1.'],
            max: [2, 'The maximum depth is 2.'],
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


