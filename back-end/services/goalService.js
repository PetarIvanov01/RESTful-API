const Goal = require('../model/Goal');
const Profile = require('../model/UserProfile');
const { withTryCatch } = require('../util');

const getById = withTryCatch(async (goalId) => {

    return await Goal.findOne({ _id: goalId })

})

const create = withTryCatch(async (user, { title, image, description }) => {

    const userGoals = await Profile.findOne({ userId: user._id });
    if (!userGoals) {
        throw new Error('Invalid Request');
    }
    if (userGoals.goals.length >= 2) {
        throw new Error('Exceeded Maximum Goals Limit!')
    }
    const goals = await Goal.create({
        title,
        description,
        image,
        owner: user._id
    })

    userGoals.goals.push(goals);
    await userGoals.save();

    return goals;
});

const update = withTryCatch(async (id, data, user) => {

    const goal = await Goal.findById(id);

    if (goal.owner.toString() !== user._id) {
        throw new Error('User not authorized');
    }

    const options = { new: true, runValidators: true };

    return await Goal.findOneAndUpdate({ _id: id, owner: user._id }, data, options);
});

const del = withTryCatch(async (id, user) => {

    const userGoals = await Profile.findOne({ userId: user._id });
    const goal = await Goal.findById(id);

    if (!goal) {
        throw new Error('Goal not found');
    }

    if (goal.owner.toString() !== user._id) {
        throw new Error('User not authorized')
    }

    const updatedGoals = userGoals.goals.filter(goalId => goalId.toString() !== id);
    userGoals.goals = updatedGoals;
    await userGoals.save();

    await Goal.findByIdAndDelete(id);
})

const like = withTryCatch(async (currentUserId, postId) => {
    const currentUser = await Profile.findOne({ userId: currentUserId });

    if (!currentUser) {
        throw new Error('Profile not found.');
    }
    const isLiked = currentUser.liked.some(id => id.toString() === postId);

    if (isLiked) {
        throw new Error('Post is already liked.')
    }
    await Goal.findByIdAndUpdate(postId,
        {
            $push: { likes: currentUserId }
        },
        { new: true })


    return await Profile.findOneAndUpdate({ userId: currentUserId },
        {
            $push: { liked: postId }
        },
        { new: true })
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

module.exports = {
    create,
    update,
    del,
    getById,
    like,
    unLike
}

