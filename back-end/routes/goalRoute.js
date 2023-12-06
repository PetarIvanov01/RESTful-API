const { createComment, getComments } = require('../controllers/goalControllers/comments');
const { createGoal, updateGoal, deleteGoal, getGoalsById } = require('../controllers/goalControllers/goal');
const { likeGoal, unLikeGoal } = require('../controllers/goalControllers/likes');
const { getAllProfiles, getHomeProfiles } = require('../controllers/profileControllers/profile');

const authorization = require('../middleware/auth');
const router = require('express').Router();

router.route('/')
    .get(getAllProfiles)
    .post(authorization, createGoal);

router.route('/home')
    .get(getHomeProfiles)

router.route('/:id')
    .get(getGoalsById)
    .put(authorization, updateGoal)
    .delete(authorization, deleteGoal);

router.post('/like', authorization, likeGoal);
router.post('/un-like', authorization, unLikeGoal);

router.route('/:postId/comments')
    .get(getComments)
    .post(authorization, createComment);

module.exports = router;
