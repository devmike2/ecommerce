const mongoose = require('mongoose')

const Schema = mongoose.Schema

const addToCart = new Schema({
    productId: {
        ref: 'Product',
        type: String
    },
    userId: String,
    quantity:  Number

})

const addToCartModel = mongoose.model('addTocart', addToCart)

module.exports = addToCartModel
