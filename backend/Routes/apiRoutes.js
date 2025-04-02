const { Router } = require('express')
const userSignupController = require('../controller/auth/signup')
const userSigninController = require('../controller/auth/signin')
const authChecker = require('../middleware/authChecker')
const userDetails = require('../controller/auth/userdetails')
const logoutController = require('../controller/auth/logout')
const allUser = require('../controller/auth/allUsers')
const updateUserRole = require('../controller/auth/updateRole')
const uploadProduct = require('../controller/products/uploadProducts')
const allProductsController = require('../controller/products/allProducts')
const updateProductControler = require('../controller/products/updateProductsController')
const deleteProductController = require('../controller/products/deleteproducts')
const getCategoryController = require('../controller/products/getCategory')
const getProductForEachCategoryController = require('../controller/products/getProductForEachCategory')
const productDetailsController = require('../controller/products/GetProductDetails')
const addToCartController = require('../controller/auth/AddToCartController')
const fetchCartCount = require('../controller/auth/FetchCartItemsController')
const itemsInCartController = require('../controller/auth/ItemsInCart')

const router = Router()

// auth routes
router.post('/signup', userSignupController)
router.post('/login', userSigninController)
router.get('/user', authChecker ,userDetails )
router.get('/logout', logoutController)

//Admin routes
router.get('/all-user',authChecker, allUser)
router.post('/update-role',authChecker, updateUserRole)


//products routes
// ========== all products ================
router.get('/all-products', allProductsController)
// ================== upload products ===================
router.post('/upload-product',authChecker, uploadProduct)

// ==================== update products ===========================
router.patch('/update-products',authChecker, updateProductControler)
// ====================== delete product ====================
router.delete('/delete-product',authChecker, deleteProductController)
router.get('/get-category', getCategoryController)
router.post('/get-product-category', getProductForEachCategoryController)

// ================ get single product ============
router.get('/product/:id', productDetailsController)


// ========================== add to carty ============================
router.post('/add-to-cart', authChecker, addToCartController)

// ========================== fetch cart items count ========================
router.get('/cart-items-count', authChecker, fetchCartCount )

// ========================= fetch cart items ============================
router.get('/cart-items', authChecker, itemsInCartController)




module.exports = router