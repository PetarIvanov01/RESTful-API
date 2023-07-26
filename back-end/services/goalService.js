const Goal = require('../model/Goal')

async function get() {
    try {
        return await Goal.find({}).lean();
    } catch (error) {
        throw error
    }
}

async function create(data) {
    try {
        return await Goal.create(data);

    } catch (error) {
        throw error
    }
}

async function update(id, data) {
    try {
        return await Goal.findByIdAndUpdate(id, data);
    } catch (error) {
        throw error
    }
}

async function del(id) {
    try {
        return await Goal.findByIdAndDelete(id);
    } catch (error) {
        throw error
    }
}

module.exports = {
    get,
    create,
    update,
    del
}