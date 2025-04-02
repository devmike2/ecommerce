const addToCartModel = require("../../model/AddToCart")


const addToCartController = async (req,res) =>{
    try {
        const { productId } = req.body
        const sessionUser = req.userId

        const existed = await addToCartModel.findOne({productId})
        console.log(existed)
        if(existed && existed.userId === sessionUser){
            return res.status(400).json({
                message: 'Product Exist in cart',
                success: false,
                error: true
            })
        }

        const payload = {
            productId: productId,
            quantity: 1,
            userId : sessionUser
        }
        const addedProduct = new addToCartModel(payload)
        const saveProduct = addedProduct.save()

        return res.status(201).json({
            success: true,
            error: false,
            message: 'Product Added to cart',
            data:saveProduct
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}



module.exports = addToCartController