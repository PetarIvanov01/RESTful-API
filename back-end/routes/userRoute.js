const { loginHandler, registerHandler, privateHandler } = require('../controllers/authController');
const authorization = require('../middleware/auth');

const router = require('express').Router();


router.post('/login', loginHandler);

router.post('/register', registerHandler);

router.get('/me', authorization, privateHandler);


module.exports = router