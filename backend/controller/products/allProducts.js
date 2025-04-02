const Product = require("../../model/productModel")

const allProductsController = async (req, res) => {
    try{
    const product = await Product.find({}).sort({createdAt: -1})

    res.status(200).json({
        success: true,
        error: false,
        data: product,
        message: 'All product fected'
    })
    }
    catch(error){
        res.status(500).json({
            error: true,
            success: false,
            message: error.message || 'Could not fetch products'
        })
    }
}
module.exports = allProductsController