const asyncHandler = require('express-async-handler');
const service = require('../../services/goalServices/likes');

const likeGoal = asyncHandler(async (req, res) => {
    const { currentUserId, postId } = req.body;
    if (!currentUserId || !postId) {
        throw new Error('Required parameters missing: currentUserId, postId');
    };

    await service.like(currentUserId, postId);

    res.status(200).json({
        message: 'Post liked Successfully'
    });
});

const unLikeGoal = asyncHandler(async (req, res) => {
    const { currentUserId, postId } = req.body;
    if (!currentUserId || !postId) {
        throw new Error('Required parameters missing: currentUserId, postId');
    };

    await service.unLike(currentUserId, postId);

    res.status(200).json({
        message: 'Post Unliked Successfully'
    });
});

module.exports = { likeGoal, unLikeGoal };