const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    productName:{
        type: String,
        required: true
    },
    brandName:{
        type: String,
        required: true
    },
    productImg: [],
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    sellingPrice:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
}, {timestamps: true})

const Product = mongoose.model('Product', productSchema)
module.exports = Product
