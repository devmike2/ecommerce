const { Router } = require('express')
const userSignupController = require('../controller/signup')
const userSigninController = require('../controller/signin')
const authChecker = require('../middleware/authChecker')
const userDetails = require('../controller/userdetails')
const router = Router()

router.post('/signup', userSignupController)
router.post('/login', userSigninController)
router.get('/user', authChecker ,userDetails )






module.exports = router