

const backendDomain = `${process.env.REACT_APP_BACKEND_URL}`

const routeApi = {
    signupAPI: {
        url: `${backendDomain}signup`,
        method: 'POST'
    }, 
    loginApi: {
        url: `${backendDomain}login`,
        method: 'POST'
    },
    userInfo:{
        url: `${backendDomain}user`,
        method: 'GET'
    },
    logout:{
        url: `${backendDomain}logout`,
        method: 'GET'
    },
    alluser:{
        url: `${backendDomain}all-user`,
        method: 'GET'
    },
    updateRole:{
        url: `${backendDomain}update-role`,
        method: 'POST'
    },
    uploadProduct:{
        url : `${backendDomain}upload-product`,
        method: 'POST'
    },
    allProducts:{
        url: `${backendDomain}all-products`,
        method: 'get'
    },
    UpdateProduct:{
        url: `${backendDomain}update-products`,
        method: 'PATCH'
    },
    DeleteProdut:{
        url: `${backendDomain}delete-product`,
        method: 'DELETE'
    },
    getCategory:{
        url: `${backendDomain}get-category`,
        method:'GET'
    },
    getProductByCategory:{
        url: `${backendDomain}get-product-category`,
        method: 'POST'
    },
    getSingleProduct:{
        url: `${backendDomain}product`,
        method: 'GET'
    },
    addToCartApi:{
        url:`${backendDomain}add-to-cart`,
        method: 'POST'
    },
    cartItemsCount:{
        url:`${backendDomain}cart-items-count`,
        method: 'GET'
    },
    cartItems:{
        url:`${backendDomain}cart-items`,
        method: 'GET'
    }
}

export default  routeApi