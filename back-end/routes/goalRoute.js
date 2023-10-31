const { getGoalsById, createGoal, updateGoal, deleteGoal, getAllGoals, getBySearch } = require('../controllers/goalController');
const authorization = require('../middleware/auth');
const paginatedResults = require('../middleware/pagination');
const searchResult = require('../middleware/searchResult');
const Profile = require('../model/UserProfile');
const router = require('express').Router();

// GET and POST methods mounted on the root path '/'
router.route('/')
    .get(searchResult(Profile),paginatedResults(Profile), getAllGoals)
    .post(authorization, createGoal);

router.route('/search')
    .get(searchResult(Profile),getBySearch)

// PUT and DELETE methods mounted on the path '/:id', where :id is the goal ID
router.route('/:id')
    .get(getGoalsById).put(authorization, updateGoal)
    .delete(authorization, deleteGoal);

module.exports = router;
