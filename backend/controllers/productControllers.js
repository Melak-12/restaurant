const expres = require('express');
const asynHandler = require('express-async-handler')

const Product = require('../Models/productModel');
const { error } = require('console');

const getFoods = async (req, res) => {
    const { _id } = req.query;

    if (_id) {
        const singleProduct = await Product.findOne({ _id });
        return res.json({ singleProduct });
    }

    const product = await Product.find();
    res.json(product);
};

const postFoods = asynHandler(async (req, res) => {


    if (!req.body) {
        res.status(400).json("please add food !")
    } else {

        const product = await Product.create({
            name: req.body.name,
            desc: req.body.desc,
            img: req.body.img,
            price: req.body.price,
            catagory:req.body.catagory,
            options: req.body.options,
        })
        res.json({
            message: product
        })
    }
})
const putFoods = asynHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        const update = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.json({
            message: update
        })
    }
    else {
        res.status(400)
        throw new Error('Goal not found')
    }
})
const deleteFoods = asynHandler(async (req, res) => {
    const product=await Product.findById(req.params.id);
    if(product){
        const deleteProduct= await Product.findByIdAndDelete(req.params.id);
        res.json({ message: `deleted foods ${req.params.id}`,deleted:`${deleteProduct}` })
    }else {
        res.status(400)
        throw new Error('error while deleting file !')
    }
})
module.exports = {
    getFoods, deleteFoods, putFoods, postFoods,
}