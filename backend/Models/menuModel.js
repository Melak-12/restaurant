const mongoose = require('mongoose');
const optionSchema = new mongoose.Schema({
    name: {
      type: String,
    },
  });
const menuSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        // required:true,
        ref:"User"
    },
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
