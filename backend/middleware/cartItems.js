const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    email: {
     type: 'string'
     },
    productName: {
      type: String,
      // required: true,
    },
    productImage: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      // required: true,
    },
    category: {
      type: String,
      // required: true,
    },
    color: {
      type: String,
      // required: true,
    },
    seller: {
      type: String,
      // required: true,
    },
    sellerId: {
      type: String,
      // required: true,
    }
  
  });

const CartItems = mongoose.model('cart', cartSchema, 'cartItems');
module.exports = CartItems;