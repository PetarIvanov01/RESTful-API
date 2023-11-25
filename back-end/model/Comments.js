const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile',
            required: true
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Goal',
            required: true
        },
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
            default: null
        },
        children: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }]
    }
    ,
    {
        timestamps: true,
    }
);

mongoose.model('Comment', commentSchema);
module.exports = commentSchema;