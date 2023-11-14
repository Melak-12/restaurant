const expres = require('express');
const asynHandler = require('express-async-handler')

const Product = require('../Models/productModel')

const getFoods = async (req, res) => {
    const product= await Product.find();
    res.json(product)
}

const postFoods = asynHandler(async (req, res) => {


    if (!req.body) {
        res.status(400).json("please add food !")
    } else{

        const product= await Product.create({
            name: req.body.name,
            desc: req.body.desc,
            img: req.body.img,
            price: req.body.price,
            options: req.body.options,
})
        res.json({
            message:product
        })
    }
})
const putFoods = asynHandler(async (req, res) => {
    res.json({
        message: `update foods ${req.params.id}`
    })
})
const deleteFoods = asynHandler(async (req, res) => {
    res.json({ message: `delete foods ${req.params.id}` })
})
module.exports = {
    getFoods, deleteFoods, putFoods, postFoods,
}