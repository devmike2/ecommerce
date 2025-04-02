const Product = require('../../model/productModel')

const getProductForEachCategoryController =  async (req,res) =>{
    try {
        const { category } = req.body || req.query
        const products  = await Product.find({ category }) 

        res.status(200).json({
            data: products,
            success: true,
            error: false,
            message: 'Products fetched'
        })


    } catch (error) {
        res.status(500).json({
            error: true,
            success: false,
            message: error.message || 'An error Occured'
        })
    }
}

module.exports = getProductForEachCategoryController