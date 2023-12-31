const asyncHandler = require('express-async-handler');
const service = require('../../services/goalServices/goal');

const getGoalsById = asyncHandler(async (req, res) => {
    const goals = await service.getById(req.params.id);

    res.status(200)
        .json({
            message: 'Method is Get',
            items: goals
        });
});

const createGoal = asyncHandler(async (req, res) => {
    if (!req.body) {
        throw new Error('Invalid data!');
    };
    const goal = await service.create(req.user, req.body);

    res.status(200)
        .json({
            message: 'Method is Post',
            item: goal
        });
});

const updateGoal = asyncHandler(async (req, res) => {

    const goal = await service.update(req.params.id, req.body, req.user);

    res.status(200)
        .json({
            message: `Method is Put and id - ${req.params.id}`,
            item: goal
        });
});

const deleteGoal = asyncHandler(async (req, res) => {

    await service.del(req.params.id, req.user);

    res.status(200)
        .json({ message: `Method is delete and id - ${req.params.id}` });
});

module.exports = {
    getGoalsById,
    createGoal,
    updateGoal,
    deleteGoal,
}


