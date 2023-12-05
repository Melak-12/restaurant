const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const bycrypt = require('bcryptjs')
const colors=require('colors')

const User = require('../Models/userModel')

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, psd, cart } = req.body;
    if (!name || !email || !psd) {
        res.status(400).json ({msg:"please fill all fillds !"})
    }
    if (psd.length<=11) {
        res.status(400).json ({msg:"Passord length should not be less than 12!"})
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/;
    if (!passwordRegex.test(psd)) {
        return res.status(400).json({
            msg: "Password must contain at least one letter, one number, and one special character (@$!%*#?&)"
        });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400)
        res.json({ msg: "user already exist " })
    }

    //hashing password by using bycript 
    const salt = await bycrypt.genSalt(10)
    const hashedPsd = await bycrypt.hash(psd, salt)

    const user = await User.create({
        name, email, cart: cart,
        psd: hashedPsd
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            cart: user.cart.length
        })
    }
    else {
        res.status(400).json({ msg: 'invalid  user data ' })
    }
})

const login = asyncHandler(async (req, res) => {
    const { email, psd } = req.body;
    if (!email || !psd) {
        res.status(400).json({ msg: "fill all filds " })

    }
    

    const checkUser = await User.findOne({ email });
    if (checkUser && (await bycrypt.compare(psd, checkUser.psd))) {
        res.json({
            _id: checkUser.id,
            name: checkUser.name,
            email: checkUser.email,
            token: generateToken(checkUser._id),
            cart: checkUser.cart.length,
            urItems: checkUser.cart


        })
    }
    else {
        res.status(400).json({msg:"Email or Password incorrect !"})
        throw new Error('Invalid credentials '.yellow)
    }

})
const getMe = asyncHandler(async (req, res) => {
    const { email } = req.query;

    if (!email) {
        const users = await User.find();
        res.status(200).json(users);
    } else {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    }
});





//generate token for user id 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "40d" });
}

const updateUser = asyncHandler(async (req, res) => {
    const { email, id } = req.query;
    const { cart: productToAdd } = req.body;

    let userToUpdate;

    if (id) {
        userToUpdate = await User.findById(id);
    } else if (email) {
        userToUpdate = await User.findOne({ email });
    }

    if (userToUpdate) {
        if (productToAdd) {
            userToUpdate.cart.addToSet(productToAdd);
        }

        const update = await userToUpdate.save(); // Save the updated user

        res.status(200).json({ message: 'User updated', updatedUser: update });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
const removeCart = asyncHandler(async (req, res) => {
    const { email, id } = req.query;
    const { cart: productToBeRemoved } = req.body;
    let userToUpdate;

    if (id) {
        userToUpdate = await User.findById(id);
    } else if (email) {
        userToUpdate = await User.findOne({ email });
    }

    if (userToUpdate) {
        if (productToBeRemoved) {
            userToUpdate.cart.pull(productToBeRemoved);
        }
        ``
        const update = await userToUpdate.save();

        res.status(200).json({ message: 'cart updated', updatedCart: update });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
})


module.exports = {
    registerUser, login, getMe, updateUser, removeCart
}