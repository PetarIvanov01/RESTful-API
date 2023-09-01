const { loginHandler, registerHandler } = require('../controllers/authController');
const { createProfileHandler, getProfileHandler, editProfileHandler } = require('../controllers/profileController')
const authorization = require('../middleware/auth');

const router = require('express').Router();


router.post('/login', loginHandler);

router.post('/register', registerHandler);

router.post('/profile', authorization, createProfileHandler);

router.route('/profile/:userId').get(authorization, getProfileHandler).put(authorization, editProfileHandler);


module.exports = router