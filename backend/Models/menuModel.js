const mongoose = require('mongoose');
const optionSchema = new mongoose.Schema({
    name: {
      type: String,
    },
  });
const menuSchema = new mongoose.Schema({
    collectionName: {
    type:String
    },
    desc: {
        type:String
    },
    img: {
        type:String
    }, 
    color:{
        type:String,
    } ,

    foodsName:[optionSchema], 
    color: {
        type:String
    },
},{timestamps:true});

module.exports = mongoose.model('Menu', menuSchema);
