const addToCartModel = require("../../model/AddToCart")

const fetchCartCount = async (req,res) =>{
    try {
        const  sessionUser = req.userId
        const cartItemsCount = await addToCartModel.countDocuments({userId: sessionUser})
        
        return res.status(201).json({
            data: {
                count: cartItemsCount
            },
            success: true,
            error: false
        })
        
    } catch (error) {
        return res.status(500).json({
            error:true,
            success: false,
            message: error.message
        })
    }
    }

module.exports = fetchCartCount