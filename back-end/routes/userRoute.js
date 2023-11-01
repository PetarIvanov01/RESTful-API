const { loginHandler, registerHandler } = require('../controllers/authController');
const { createProfileHandler, getProfileHandler, editProfileHandler, followProfileHandler, unFollowProfileHandler } = require('../controllers/profileController')
const authorization = require('../middleware/auth');

const router = require('express').Router();


router.post('/login', loginHandler);

router.post('/register', registerHandler);

router.post('/profile', authorization, createProfileHandler);

router.put('/profile/follow', authorization, followProfileHandler);
router.put('/profile/un-follow', authorization, unFollowProfileHandler);

router.route('/profile/:userId')
    .get(getProfileHandler)
    .put(authorization, editProfileHandler);


module.exports = router