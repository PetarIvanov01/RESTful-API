const { getGoalsById, createGoal, updateGoal, deleteGoal, likeGoal, unLikeGoal } = require('../controllers/goalController');
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

router.post('/like', authorization, likeGoal);
router.post('/un-like', authorization, unLikeGoal);

module.exports = router;
