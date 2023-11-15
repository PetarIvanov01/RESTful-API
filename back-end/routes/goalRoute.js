const { getGoalsById, createGoal, updateGoal, deleteGoal } = require('../controllers/goalController');
const { getAllProfiles, getHomeProfiles } = require('../controllers/profileController');
const authorization = require('../middleware/auth');
const router = require('express').Router();

router.route('/')
    .get(getAllProfiles)
    .post(authorization, createGoal);

router.route('/home')
    .get(getHomeProfiles)

router.route('/:id')
    .get(getGoalsById).put(authorization, updateGoal)
    .delete(authorization, deleteGoal);

module.exports = router;
