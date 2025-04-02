import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home";
import Login from "../pages/login";
import Signup from "../pages/signup";
import ForgotPassword from "../pages/forgotPassword";
import Updateprofile from "../pages/updateProfile";
import AdminPage from "../pages/adminPanel";
import Alluser from "../pages/allUsers";
import Allproducts from "../pages/allProducts";
import CategoryPage from "../pages/categorypage";
import ProductDetails from "../pages/ProductDetails";
import AddToCart from "../pages/AddToCart";
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'signup',
                element: <Signup />
            },
            {
                path: 'forgot-password',
                element: <ForgotPassword />
            },
            {
                path: 'updateprofile',
                element: <Updateprofile />
            },
            {
                path:'category/:category',
                element: <CategoryPage />
            },
            {
                path:'product/:id',
                element: <ProductDetails />
            },
            {
                path: 'add-to-cart',
                element: <AddToCart />
            },
            {
                path: 'adminpage',
                element: <AdminPage />,
                children: [
                    { 
                        path: 'all-user',
                        element: <Alluser />
                    },
                    {
                        path: 'all-products',
                        element: <Allproducts />
                    }
                ]
            }
          
        ]   
    }
])

export default router