const { getGoalsById, createGoal, updateGoal, deleteGoal, getAllGoals } = require('../controllers/goalController');
const authorization = require('../middleware/auth');
const router = require('express').Router();

// GET and POST methods mounted on the root path '/'
router.route('/').get(getAllGoals).post(authorization, createGoal);

// PUT and DELETE methods mounted on the path '/:id', where :id is the goal ID
router.route('/:id').get(getGoalsById).put(authorization, updateGoal).delete(authorization, deleteGoal);

module.exports = router;
