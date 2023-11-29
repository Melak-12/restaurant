const express = require('express')
const { registerUser, login, getMe, updateUser, removeCart } = require('../controllers/userController')
const protect = require('../middleware/userMiddleware')
const router = express.Router()

router.post('/', registerUser)
router.post('/login', login)
router.put('/removeCart', removeCart)
router.put('/:id', updateUser)
router.put('/', updateUser)
router.get('/getMe', getMe)
// router.get('/getMe', protect, getMe)
// router.put('/what',(req,res)=>res.json("yo"))



module.exports = router