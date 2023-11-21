const mongoose = require('mongoose');


const userSchmea = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter your username '],
  },
  email: {
    type: String,
    required: [true, 'please enter your Email'],
    unique:true
  },
  psd: {
    type: String,
    required: [true,'please enter your password'],
  },
  cart: {
    type:[String],
    default:[]
  },
  orders: {
    type:[String],
    default:[]
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchmea);

  