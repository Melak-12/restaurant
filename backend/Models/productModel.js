const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
  additionalPrice: {
    type: Number,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    // required:true,
    ref:"User"
  },
  
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    // required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  catagory: {
    type: String,
    // required: true,
  },
  options: [optionSchema], 
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

  