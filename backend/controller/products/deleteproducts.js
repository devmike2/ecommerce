const permissionChecker = require("../../helpers/permissionChecker")
const mongoose = require('mongoose')
const Product = require("../../model/productModel")


const deleteProductController = async (req, res) =>{
    try{
        const sessionUser = req.userId
        const permission = await permissionChecker(sessionUser)

        if(!permission){
            throw new Error("Access denied, you are not permited to delete a products");
            
        }
        const  { reqId } = req.body
        console.log(req.body)
        if(!mongoose.Types.ObjectId.isValid(reqId)){
            throw new Error("Product not valid");
            
        }
        const product = await Product.findByIdAndDelete( reqId )
        if(!product) {
            throw new Error("Product not found");
        }

        res.status(200).json({
            success: true,
            error: false,
            data: product,
            message: 'Product deleted successfully'
        })
    }
    catch(error){
        res.status(500).json({
            error: true,
            success: false,
            message: error.message || 'An error occured'
        })
    }
}

module.exports = deleteProductController 