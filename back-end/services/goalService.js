const Goal = require('../model/Goal');
const UserProfile = require('../model/UserProfile');
const { withTryCatch } = require('../util');

const getById = withTryCatch(async (goalId) => {

    return await Goal.findOne({ _id: goalId })
    // return await Goal.find({ owner: user._id }).lean();

})

const create = withTryCatch(async (user, { title, image, description }) => {

    const userGoals = await UserProfile.findOne({ userId: user._id });
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

    return await Goal.findByIdAndUpdate(id, data, user);
});

const del = withTryCatch(async (id, user) => {

    const userGoals = await UserProfile.findOne({ userId: user._id });
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

const getHome = withTryCatch(async (query) => {

    const limit = parseInt(query.limit || 2);

    const results = {};

    results.results = await UserProfile.find()
        .sort({ followers: -1 })
        .limit(limit)
        .populate('goals')
        .exec();

    return results;

})
module.exports = {
    getHome,
    create,
    update,
    del,
    getById
}