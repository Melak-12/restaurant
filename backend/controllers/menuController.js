const expres = require('express');
const asynHandler = require('express-async-handler')

const Menu = require('../Models/menuModel')

const getMenus = async (req, res) => {
    const menu= await Menu.find();
    res.json(menu)
}

const postMenus = asynHandler(async (req, res) => {


    if (!req.body) {
        res.status(400).json("please add menu !")
    } else{

        const menu= await Menu.create({
            collectionName: req.body.collectionName,
            desc: req.body.desc,
            img: req.body.img,
            color: req.body.color,
            foodsName: req.body.foodsName,
})
        res.json({
            message:menu
        })
    }
})
const putMenu =asynHandler(async (req, res) => {
    res.json({
        message: `update menu ${req.params.id}`
    })
})
const deleteMenu = asynHandler(async (req, res) => {
    res.json({ message: `delete menu ${req.params.id}` })
})
module.exports = {
   putMenu,deleteMenu,postMenus,getMenus
}