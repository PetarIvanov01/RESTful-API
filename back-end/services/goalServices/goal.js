const Goal = require('../../model/Goal');
const Profile = require('../../model/UserProfile');

const { withTryCatch } = require('../../util');

const getById = withTryCatch(async (goalId) => {
    return await Goal.findOne({ _id: goalId }).populate('comments');
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

    const goal = await Goal.findById(id);

    if (!goal) {
        throw new Error('Goal not found');
    }

    if (goal.owner.toString() !== user._id) {
        throw new Error('User not authorized')
    }


    await Goal.findOneAndDelete({ _id: id });
})
module.exports = {
    create,
    update,
    del,
    getById,
};