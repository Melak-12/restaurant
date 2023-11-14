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
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  options: [optionSchema], 
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

  