const asyncHandler = require('express-async-handler');
const service = require('../services/goalService');

const getGoals = asyncHandler(async (req, res) => {
    const goals = await service.getById(req.user);

    res.json({
        message: `Method is get`,
        items: goals
    });
})

const createGoal = asyncHandler(async (req, res) => {
    if (!req.body) {
        throw new Error('Text field !')
    }
    const goal = await service.create(req.user, req.body);

    res.json(goal);
})

const updateGoal = asyncHandler(async (req, res) => {

    const goal = await service.update(req.params.id, req.body, req.user);

    res.json({
        message: `Method is update and id - ${req.params.id}`,
        updated: goal
    });
})

const deleteGoal = asyncHandler(async (req, res) => {

    await service.del(req.params.id, req.user);

    res.json({ message: `Method is delete and id - ${req.params.id}` });
})


module.exports = {
    getGoals, createGoal, updateGoal, deleteGoal
}

