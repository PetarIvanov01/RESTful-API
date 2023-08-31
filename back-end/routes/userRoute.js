const { loginHandler, registerHandler } = require('../controllers/authController');
const { createProfileHandler, getProfileHandler } = require('../controllers/profileController')
const authorization = require('../middleware/auth');

const router = require('express').Router();


router.post('/login', loginHandler);

router.post('/register', registerHandler);

router.post('/profile', authorization, createProfileHandler);

router.get('/profile/:userId', authorization, getProfileHandler);


module.exports = router