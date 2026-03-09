const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            productName: String,
            productImage: String,
            size: String,
            quantity: Number,
            price: Number
        }
    ],
    paymentStatus: {
        type: String,
        default: 'Paid (Fake)'
    },
    orderStatus: {
        type: String,
        default: 'Processing'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
