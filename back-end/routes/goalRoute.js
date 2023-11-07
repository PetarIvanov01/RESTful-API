const { getGoalsById, createGoal, updateGoal, deleteGoal, getAllGoals, getBySearch, getHomeGoals } = require('../controllers/goalController');
const authorization = require('../middleware/auth');
const paginatedResults = require('../middleware/pagination');
const searchResult = require('../middleware/searchResult');
const Profile = require('../model/UserProfile');
const router = require('express').Router();

router.route('/')
    .get(searchResult(Profile),paginatedResults(Profile), getAllGoals)
    .post(authorization, createGoal);

router.route('/home')
    .get(getHomeGoals)

router.route('/search')
    .get(searchResult(Profile),getBySearch)

router.route('/:id')
    .get(getGoalsById).put(authorization, updateGoal)
    .delete(authorization, deleteGoal);

module.exports = router;
