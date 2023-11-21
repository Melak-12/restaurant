const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const bycrypt = require('bcryptjs')

const User = require('../Models/userModel')

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, psd ,cart} = req.body;
    if (!name || !email || !psd) {
        res.status(400)
        throw new Error('please fill all fillds !')
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400)
        res.json({ message: "user already exist " })
    }

    //hashing password by using bycript 
    const salt = await bycrypt.genSalt(10)
    const hashedPsd = await bycrypt.hash(psd, salt)

    const user = await User.create({
        name, email,cart:cart,
        psd: hashedPsd
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            cart:user.cart.length
        })
    }
    else {
        res.status(400).json({ message: 'invalid  user data ' })
    }
})

const login = asyncHandler(async (req, res) => {
    const { email, psd } = req.body;
    if (!email || !psd) {
        res.status(400)
        throw new Error('please fill all fillds !')
    }

    const checkUser = await User.findOne({ email });
    if (checkUser && (await bycrypt.compare(psd, checkUser.psd))) {
        res.json({
            _id: checkUser.id,
            name: checkUser.name,
            email: checkUser.email,
            token: generateToken(checkUser._id),
            cart:checkUser.cart.length,
            urItems:checkUser.cart


        })
    }
    else {
        res.status(400)
        throw new Error('Invalid credentials ')
    }

})
const getMe = asyncHandler(async (req, res) => {
    const { email } = req.query;
    const user = await User.findOne({ email }); 
    
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
});




//generate token for user id 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "40d" });
}


module.exports = {
    registerUser, login, getMe
}