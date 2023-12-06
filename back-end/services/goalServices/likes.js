const Goal = require("../../model/Goal");
const Profile = require("../../model/UserProfile");
const { withTryCatch } = require("../../util");

const like = withTryCatch(async (currentUserId, postId) => {
    const currentUser = await Profile.findOne({ userId: currentUserId });

    if (!currentUser) {
        throw new Error('Profile not found.');
    }
    const isLiked = currentUser.liked.some(id => id.toString() === postId);

    if (isLiked) {
        throw new Error('Post is already liked.');
    }
    await Goal.findByIdAndUpdate(postId,
        {
            $push: { likes: currentUserId }
        },
        { new: true });


    return await Profile.findOneAndUpdate({ userId: currentUserId },
        {
            $push: { liked: postId }
        },
        { new: true });
})

const unLike = withTryCatch(async (currentUserId, postId) => {

    const currentUser = await Profile.findOne({ userId: currentUserId });

    if (!currentUser) {
        throw new Error('Profile not found.');
    }

    const isLiked = currentUser.liked.some(id => id.toString() === postId);

    if (!isLiked) {
        throw new Error('You cannot unlike a post you haven\'t liked.');
    }

    await Goal.findByIdAndUpdate(postId,
        {
            $pull: { likes: currentUserId }
        },
        { new: true })


    return await Profile.findOneAndUpdate({ userId: currentUserId },
        {
            $pull: { liked: postId }
        },
        { new: true })
})

module.exports = { like, unLike }