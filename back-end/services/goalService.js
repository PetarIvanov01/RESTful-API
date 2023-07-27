const Goal = require('../model/Goal')

async function get() {
    try {
        return await Goal.find({}).lean();
    } catch (error) {
        throw error
    }
}

async function getById(user) {
    try {
        return await Goal.find({ owner: user._id }).lean();
    } catch (error) {
        throw error
    }
}

async function create(user, data) {
    try {
        const goals = await Goal.create({
            text: data.text,
            owner: user._id
        });

        return goals

    } catch (error) {
        throw error
    }
}

async function update(id, data, user) {
    try {
        const goal = await Goal.findById(id);

        if (goal.owner.toString() !== user._id) {
            throw new Error('User not authorized')
        }

        return await Goal.findByIdAndUpdate(id, data, user);
    } catch (error) {
        throw error
    }
}

async function del(id, user) {
    try {
        const goal = await Goal.findById(id)

        if (goal.owner.toString() !== user._id) {
            throw new Error('User not authorized')
        }
        console.log(id);
        await Goal.findByIdAndDelete(id);

    } catch (error) {
        throw error
    }
}

module.exports = {
    get,
    create,
    update,
    del,
    getById
}