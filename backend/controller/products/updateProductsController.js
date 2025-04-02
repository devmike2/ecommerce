const permissionChecker = require("../../helpers/permissionChecker")
const Product = require("../../model/productModel")
const mongoose = require('mongoose')

const updateProductControler = async(req, res) =>{
    try{
      
        const sessionUser = req.userId
        const permission = await permissionChecker(sessionUser)
        if(!permission){
            throw new Error('Access denied, you are not permited to upload a products')
        }
        if(!req.body){
            throw new Error('No data was sent, Data has to be sent')
        }
        const {reqId, reqBody} = req.body
         if(!mongoose.Types.ObjectId.isValid(reqId)){
            throw new Error('Invalid product')
        }
        const updatedProduct  = await Product.findByIdAndUpdate(reqId, {...reqBody}, {new: true})
        if(!updatedProduct) {
            console.log('Product not found')
            throw new Error('Product not found')
            
        }
       
        res.status(201).json({
            success: true,
            error: false,
            message: 'Product updated',
            data: updatedProduct
        })
    }catch(error){
        res.status(500).json({
            error: true,
            success: false,
            message: error.message || 'An error occured, could not update this product'
        })
    }
}

module.exports = updateProductControler