const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Product name is required"],
    trim: true
  },
  productImage: {
    type: String,
    required: [true, "Product image URL is required"],
    unique: true
  },
  brand: {
    type: String,
    required: [true, "Brand name is required"]
  },
  description: {
    type: String,
    required: [true, "Product description is required"]
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price cannot be negative"]
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    lowercase: true,
    enum: {
      values: ['men', 'women', 'children', 'accessories', 'footwear'],
      message: '{VALUE} is not a supported category'
    }
  },
  subCategory: {
    type: String
  },
  productType: {
    type: String,
    enum: ['popular', 'bestseller', 'new', 'normal'],
    default: 'normal'
  },
  color: {
    type: String,
    default: "Standard"
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  seller: {
    type: String,
    required: [true, "Seller name is required"]
  },
  sellerId: {
    type: String,
    required: [true, "Seller ID is required"]
  },
  isVirtualTryOnEnabled: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
