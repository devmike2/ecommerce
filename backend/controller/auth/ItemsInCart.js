const addToCartModel = require("../../model/AddToCart")


const itemsInCartController = async( req, res ) =>{
 try{
    
    const sessionUser = req.userId

    const cartItems = await addToCartModel.find({userId: sessionUser}).populate('productId')
    
   
    return res.status(200).json({
        success: true,
        error:false,
        data: cartItems
    })
 }
 catch(error){
   console.log(error.message)
    return res.status(500).json({
        error:true,
        success: false,
        message: error.message || 'Internal Server error 500'
    })
 }
}

module.exports = itemsInCartController