const jwt = require('jsonwebtoken')
const colors=require('colors')
const asyncHandler = require('express-async-handler')
const User = require('../Models/userModel')
const protect = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //get the token from the hearder , since the token format in the header is bearer  fsf987fs79s
            token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decode.id).select('-psd')
            console.log("the user data is ".bgGreen.cyan)
            console.log(`${req.user}`.green)

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized ')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error("not authorized , no token ")
    }
})
module.exports = protect