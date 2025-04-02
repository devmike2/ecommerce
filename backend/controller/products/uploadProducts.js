const permissionChecker = require('../../helpers/permissionChecker')
const Product = require('../../model/productModel')

const uploadProduct = async(req, res) =>{
    try {
        const sessionUser = req.userId
        const permission = await permissionChecker(sessionUser)

        if(!permission){
            res.status(403).json({
                error: true,
                message: 'Access denied, you are not permited to upload a products',
                success: false
            })
        }

        if(!req.body){
            res.status(400).json({
                success: false,
                error: true,
                message: 'No data was sent, Data has to be sent'
            })
        }
        const product = await Product.create(req.body)
        res.status(201).json({
            success: true,
            message: 'Product upload successful',
            error: false,
            data: product
        })

    } catch (error) {
        res.status(500).json({
            error: true,
            success: false,
            message: error.message || 'Am error occured when uploading products '
        })
    }
}

module.exports = uploadProduct

