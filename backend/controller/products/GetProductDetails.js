const Product = require('../../model/productModel')
const mongoose = require('mongoose')

const productDetailsController = async (req, res) =>{
    try{
        const { id } = req.params
       

        if (!mongoose.Types.ObjectId.isValid(id)) {
           throw new Error("Product not valid");
                 
        }
        const product = await Product.findById(id)
        if(!product){
            throw new Error("No product found");
            
        }
    
        res.status(200).json({
            data: product,
            success: true, 
            error: false,
            message: 'data Fetched'
        })
    
    }catch(error){
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || error || 'An error Ocured'
        })
    }
   
}     
module.exports = productDetailsController