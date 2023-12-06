const Comment = require("../../model/Comments");
const Goal = require("../../model/Goal");
const Profile = require("../../model/UserProfile");
const { withTryCatch } = require("../../util");
const validateIds = require("../validators/validateModelIds");

const createComment = withTryCatch(async (postId, message, userId, parentId) => {

    const payload = {
        message,
        userId,
        postId,
        parent: parentId
    };

    await validateIds(Profile, [{ userId }]);
    const createdComment = await Comment.create(payload);

    if (parentId === null) {
        await Goal.findByIdAndUpdate(postId, {
            $push: { comments: createdComment._id }
        });
    }

    if (parentId) {
        const parentComment = await Comment.findByIdAndUpdate(parentId, {
            $push: { children: createdComment._id }
        },
            { new: true });

        createdComment.depth = parentComment.depth + 1;
        await createdComment.save();

    };

    return createdComment;
});

const getComments = withTryCatch(async (postId) => {

    if (!postId) {
        return [];
    }

    const comments = await Comment.findOne({ postId }).populate({
        path: 'children',
        select: 'message userId depth createdAt',
        populate: {
            path: 'children',
            select: 'message userId depth createdAt',
            populate: {
                path: 'children',
                select: 'message userId depth createdAt',
            }
        }
    });

    console.log(comments);
    return comments



})
module.exports = { createComment, getComments }