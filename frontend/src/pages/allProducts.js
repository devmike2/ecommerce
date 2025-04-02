import { useEffect, useState } from "react";
import UploadProduct from "../components/uploadProducts";
import routeApi from "../api/apiRoutes";
import ProductCard from "../components/AdminProductCard";

const Allproducts = () => {
    const [showUploadProduct, setShowUploadProducts] = useState(false)
    const [allProducts, setAlProducts] = useState([])
    const fetchAllProducts = async () =>{
        const response = await fetch(routeApi.allProducts.url, {
            method: routeApi.allProducts.method,
            credentials: "include",
        })
        
        const dataResponse = await response.json()

        if (dataResponse.success){
            setAlProducts(dataResponse.data)
        }
        if(dataResponse.error){
            console.log('Error:  ',dataResponse.error)
        }
    }
    useEffect(() =>{
        fetchAllProducts()
    }, [])

    return (
        <div className="max-h-[calc(100vh-130px)] overflow-y-scroll h-full">
            <div className="bg-white flex items-center justify-between px-2 py-2">
                <h2 className="font-bold text-xl">All Products</h2>
                <button className="border-2 border-red-600 py-1 px-3 rounded-full text-red-600 hover:bg-red-600 hover:text-white transition-all" onClick={() => setShowUploadProducts(true)}>Upload Product</button>
            </div>

            {showUploadProduct && (<UploadProduct onFetch={fetchAllProducts} onClose={() => setShowUploadProducts(false)}/>)}
            <div className="flex gap-3 py-2  items-center flex-wrap ">
                {
                    allProducts.map((product, index) =>{
                        return(
                           <ProductCard data={product} key={index} onFetch={fetchAllProducts}/>
                        )
                    })
                }
            </div>
        </div>
      );
}
 
export default Allproducts;