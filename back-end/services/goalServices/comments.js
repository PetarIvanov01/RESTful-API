const Comment = require("../../model/Comments");
const Goal = require("../../model/Goal");
const Profile = require("../../model/UserProfile");
const { withTryCatch } = require("../../util");
const validateIds = require("../validators/validateModelIds");
const populateRecursive = require("./helpers");

const createComment = withTryCatch(async (postId, message, ownerId, parentId) => {

    const payload = {
        message,
        ownerId,
        postId,
        parent: parentId
    };

    await validateIds(Profile, [{ userId: ownerId }]);
    const createdComment = await Comment.create(payload);

    if (parentId === null) {
        await Goal.findByIdAndUpdate(postId, {
            $push: { comments: createdComment._id }
        });
    }

    if (parentId) {
        const parentComment = await Comment.findById(parentId);

        createdComment.depth = parentComment.depth + 1;
        try {
            await createdComment.save();
        } catch (error) {
            await Comment.findByIdAndDelete(createdComment._id);
            throw error;
        }

        parentComment.children.push(createdComment._id);
        await parentComment.save();
    };

    return createdComment;
});

const getComments = withTryCatch(async (postId) => {

    let comments = await Comment.findOne({ postId }).select('message ownerId depth children');

    await populateRecursive(comments);

    return comments;
});
module.exports = { createComment, getComments }