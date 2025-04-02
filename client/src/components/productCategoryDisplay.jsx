import { useEffect, useState } from "react"
import routeApi from "../api/apiRoutes"
import { Link } from "react-router-dom"
import productCategory from "../helpers/productCategory"

const ProductCategory = () => {
    const [categoryData, setCategoryData] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingCategory = new Array(9).fill(null)

    const categoryfetch = async() =>{
        setLoading(true)
        const fetchData = await fetch(routeApi.getCategory.url,{
            method: routeApi.getCategory.method,
            credentials: 'include'
        }) 
        const response = await fetchData.json()
        setLoading(false)
        if (response){
            setCategoryData(response.data)
        }
       
    }
    useEffect(()=>{
        categoryfetch()
    }, [])
    return ( 
        <div className="container mx-auto px-4 pt-2">
          <div className="flex justify-between gap-2 overflow-scroll scroll-none">

            {loading ? (
                    loadingCategory.map((el, index)=>{
                        return(
                            <div className="w-14 h-14 md:h-20 md:w-20 bg-slate-100 rounded-full animate-pulse" key={'category'+index}>

                            </div>
                        )
                    })
                   
                ) 
                : 
                (
                    
                    categoryData.map((product, index) =>{
                        return(
                            <Link to={/category/+ product?.category} className="cursor-pointer" key={productCategory + index}>
                                <div className="h-14 w-14 lg:h-20 lg:w-20  bg-slate-100  p-2 md:p-4 rounded-full flex justify-center items-center">
                                    <img src={product?.productImg[0]} 
                                    alt={ product?.category}
                                    className="h-full object-scale mix-blend-multiply hover:scale-125 transition-all"

                                    />
                                </div>
                                <p className="text-center text-sm md:text-base capitalize">{product?.category}</p>
                            </Link>
                        )
                    })
                    
                )
            }


               
          </div>
        </div>
     );
}
 
export default ProductCategory;