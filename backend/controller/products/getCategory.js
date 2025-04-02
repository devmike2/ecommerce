const Product = require("../../model/productModel")


const getCategoryController = async (req, res) =>{
    try {
        const productCategory = await Product.distinct('category')

        // Array to store all product of each category

        const productCategoryArray = []

        for (const category of productCategory) {
            const singleProduct = await Product.findOne({ category })

            if(singleProduct){
                productCategoryArray.push(singleProduct)
            }
            else{
                throw new Error('No produc for this category')
            }
            
        }

        res.status(201).json({
            success: true,
            error: false,
            message: 'Product Category fetch Successful',
            data: productCategoryArray
        })

    } catch (error) {
     res.status(500).json({
        success: false,
        error: true,
        message: error.message || 'An error occured'
     })   
    }
}

module.exports = getCategoryController