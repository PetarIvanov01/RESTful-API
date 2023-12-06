const asyncHandler = require('express-async-handler');
const service = require('../../services/goalServices/comments');

const getComments = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const comments = await service.getComments(postId)

    res.status(200).json({
        message: 'Ok',
        comments
    });
})


const createComment = asyncHandler(async (req, res) => {

    const { postId } = req.params;
    const { message, userId, parentId = null } = req.body;

    const comment = await service.createComment(postId, message, userId, parentId);

    res.status(200).json({
        message: 'Comment Successfully created',
        comment
    });
});

module.exports = { getComments, createComment };