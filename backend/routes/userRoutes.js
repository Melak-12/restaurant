const express = require('express')
const { registerUser, login, getMe } = require('../controllers/userController')
const protect = require('../middleware/userMiddleware')
const router = express.Router()

router.post('/', registerUser)
router.post('/login', login)
// router.get('/getMe', protect, getMe)
router.get('/getMe', getMe)


module.exports = router