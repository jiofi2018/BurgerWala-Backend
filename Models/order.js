const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    orderDetails: {
        burger: {
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            }
        },
        pizza: {
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            }
        },
        fries: {
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            }
        }
    },
    shippingDetails: {
        mobile: {
            type: Number,
            required: true
        },
        address: {
            houseNo: {
                type:String,
                required: true,
            },
            city: {
                type:String,
                required: true,
            },
            state: {
                type:String,
                required: true,
            },
            country: {
                type:String,
                required: true,
            },
            pin: {
                type:Number,
                required: true,
            }
        }
    },
    user: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: "String",
        enum: ["COD", "Online"],
        default: "COD",
    },

    amountDetails: {
        paidAt: Date,

        itemsPrice: {
        type: Number,
        default: 0,
        },
        taxPrice: {
        type: Number,
        default: 0,
        },
        shippingCharges: {
        type: Number,
        default: 0,
        },
        totalAmount: {
        type: Number,
        default: 0,
        },
    },

    orderStatus: {
    type: String,
    enum: ["Preparing", "Shipped", "Delivered"],
    default: "Preparing",
    },

    deliveredAt: Date,
    createdAt: {
    type: Date,
    default: Date.now,
    },
});

const Order = mongoose.model("Order", schema);
module.exports =Order;