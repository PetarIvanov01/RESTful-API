const { getGoals, createGoal, updateGoal, deleteGoal } = require('../controllers/goalController');

const router = require('express').Router();

// GET and POST methods mounted on the root path '/'
router.route('/').get(getGoals).post(createGoal);

// PUT and DELETE methods mounted on the path '/:id', where :id is the goal ID
router.route('/:id').put(updateGoal).delete(deleteGoal);

module.exports = router;
