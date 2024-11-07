const Product = require('../model/productModel')
const mongoose = require('mongoose')

// get all products
const allProducts = async (req, res) => {
    const product = await Product.find({}).sort({createdAt: -1})

    res.status(200).json( product )
}

// ================= single products =================
const singleProduct = async (req, res) =>{
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Product not valid'})        
    }
    const product = await Product.findById(id)
    if(!product){
        return res.status(400).json({error: 'No product found'})
    }

    res.status(200).json(product)

}

// =================== add new product ==================
const addProducts = async (req, res) => {
    const { title, description, price } = req.body
    try{
        const product = await Product.create({ title, description, price })
        res.status(200).json(product)
    }
    catch (error){
        res.status(400).json({ error: error.message })
        console.log(error.message)
    }


}
// =================== delete products ====================
const deleteProducts = async (req, res) => {
    const { id } = req.params
    
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(400).json({error : 'Product not valid'})
        }
        const product = await Product.findByIdAndDelete( id )
        if(!product) {
            res.status(400).json('Product not found')
        }

        res.status(200).json(product)

} 
// ================= update products =====================
const updateProducts = async (req, res) =>{
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error : 'Product not valid'})
    }
    const product = await Product.findByIdAndUpdate( id, {...req.body}, {new: true} )
    if(!product) {
        res.status(400).json('Product not found')
    }

    res.status(200).json(product)

}


module.exports = {
    allProducts,
    singleProduct,
    addProducts,
    deleteProducts,
    updateProducts
}