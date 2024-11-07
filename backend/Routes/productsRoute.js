const { Router } = require('express')
const {
    allProducts,
    singleProduct,
    addProducts,
    deleteProducts,
    updateProducts
} = require('../controller/product')
const router = Router()

// ============= get all products ===========
router.get('/', allProducts)
// ============ single product ===================
router.get('/:id', singleProduct)


// =============== add new products ==============
router.post('/', addProducts)

// ============== delete products ===================
router.delete('/:id', deleteProducts)

// ================== update products =========================
router.patch('/:id', updateProducts)

module.exports = router
