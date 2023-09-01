const Goal = require('../model/Goal');
const UserProfile = require('../model/UserProfile');
const { withTryCatch } = require('../util');


const getAll = withTryCatch(async (skip) => {

    return await Goal.find({}).skip(0).limit(4).lean();

})

const getById = withTryCatch(async (user) => {

    return await Goal.find({ owner: user._id }).lean();

})

const create = withTryCatch(async (user, { title, image, description }) => {

    const userGoals = await UserProfile.findOne({ userId: user._id });
    if (!userGoals) {
        throw new Error('Invalid Request');
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


module.exports = {
    getAll,
    create,
    update,
    del,
    getById
}