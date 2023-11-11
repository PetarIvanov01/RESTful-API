const { getGoalsById, createGoal, updateGoal, deleteGoal, getAllGoals, getBySearch, getHomeGoals } = require('../controllers/goalController');
const authorization = require('../middleware/auth');
const router = require('express').Router();

router.route('/')
    .get(getAllGoals)
    .post(authorization, createGoal);

router.route('/home')
    .get(getHomeGoals)

router.route('/:id')
    .get(getGoalsById).put(authorization, updateGoal)
    .delete(authorization, deleteGoal);

module.exports = router;
