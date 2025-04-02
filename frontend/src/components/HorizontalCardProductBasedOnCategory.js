import { useEffect, useRef, useState } from "react"
import fetchProductByCategory from "../helpers/fetchProductByCategory"
import {toast} from "react-toastify"
import currencySymbol from "../helpers/currencySymbol"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"
import { Link } from "react-router-dom"
import addToCart from "../helpers/addToCart"
import { motion } from 'framer-motion'
import routeApi from "../api/apiRoutes"
import { useAppStore } from "../store/slice"


const HorizontalCardProductBasedOnCategory = ({category, headings}) => {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(10).fill(null)
    const { setCartCount } = useAppStore()
    const ScrollElement = useRef()
    const opacityVarient ={
        hidden:{
            opacity: 0
        },
        visible:{
            opacity:1,
            transition:{duration: 2}
        }
    }

    const fetchData = async() =>{
        setLoading(true)
        const dataFetch = await fetchProductByCategory(category)
        if(dataFetch.success){
            setProduct(dataFetch.data)
            setLoading(false)
        }
        if(!dataFetch.success){
            toast.error(fetchData.message)
        }
    }
    const FetchCartCount = async() =>{
    
        const fetchCount = await fetch(routeApi.cartItemsCount.url,{
            method: routeApi.cartItemsCount.method,
            credentials: 'include'
        })
        const dataRes = await fetchCount.json()
        if(dataRes.success){
            setCartCount(dataRes.data)
        }
    }

    const handleClick = async(e, id) =>{
        await addToCart(e, id)
        await FetchCartCount()
    }

    useEffect(() =>{
       
        fetchData()
    }, [])

    const scrollLeft =() =>{
        ScrollElement.current.scrollLeft -= 300
    }
    const scorllRight = () =>{
        ScrollElement.current.scrollLeft +=300
    }

    return ( 
        <div className="container my-2 px-4 mx-auto relative">
            <div>
                <h2 className="text-2xl font-semibold py-4">{headings}</h2>
              

                <div className="flex gap-2 md:gap-4 overflow-x-scroll scroll-none items-center transition-all" ref={ScrollElement}>
                   
                    <button onClick={scrollLeft} className="bg-white shadow-md rounded-full p-1 hidden md:block  text-lg absolute left-0"><FaAngleLeft /></button>
                    <button onClick={scorllRight}  className="bg-white shadow-md rounded-full p-1 hidden md:block text-lg absolute right-0"><FaAngleRight /></button>
                   
                    {loading? 
                       loadingList.map((el, index) =>{
                        return(
                            <div key={el + index} className="bg-white min-w-[200px] md:min-w-[300px] flex max-w-[200px] md:max-w-[300px] h-36 w-full">
                                <div className="bg-slate-200 min-w-[120px] md:min-w-[145px] h-full p-4 flex justify-center animate-pulse">
                                   
                                </div>
                                <div className="p-2 grid gap-3  w-full">
                                    <h2 className="text-ellipsis  line-clamp-1 p-1 bg-slate-200 animate-pulse w-full rounded-full"></h2>
                                    <p className="font-medium p-1 bg-slate-200 animate-pulse rounded-full"></p>
                                    <div className="flex justify-between gap-2 items-center w-full">
                                        <p className="text-sm  font-medium p-1 w-full bg-slate-200 animate-pulse rounded-full"></p>
                                        <p className="text-sm line-through  p-1 w-full bg-slate-200 animate-pulse rounded-full"></p>
                                    </div>
                                    <button className=" rounded-md py-2 px-4 p-1 w-full bg-slate-200 animate-pulse"></button>
                                </div>
                            </div>
                           
                        )
                       })
                        
                        :
                        product.map((productItems, index) =>{
                            return(
                                <motion.div
                                variants={opacityVarient}
                                initial ='hidden'
                                whileInView='visible'
                                viewport={{once:true}}
                                key={productItems + index}
                                >
                                    <Link to={`product/${productItems?._id}`}  className="bg-white min-w-[250px] md:min-w-[305px] flex max-w-[250px] md:max-w-[305px] h-36 w-full">
                                        <div className="bg-slate-200 min-w-[110px] md:min-w-[145px] h-full p-4 flex justify-center">
                                            <img src={productItems?.productImg[0]} alt={productItems?.productName} className="h-full w-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"/>
                                        </div>
                                        <div className="p-2 flex flex-col justify-center md:overflow-hidden w-full">
                                            <h2 className="text-ellipsis py-0.5 line-clamp-1">{productItems?.productName}</h2>
                                            <p className="font-medium text-slate-500">{productItems?.category}</p>
                                            <div className="block md:flex justify-between items-center py-0.5">
                                                <p className="text-sm text-red-600 font-medium">{currencySymbol(productItems?.sellingPrice)}</p>
                                                <p className="text-sm line-through text-slate-500">{currencySymbol(productItems?.price)}</p>
                                            </div>
                                            <button className="bg-green-600 hover:bg-green-700 rounded-md py-2 px-2 md:px-4 text-white" onClick={(e) =>{handleClick( e,productItems?._id)}}>Add to Cart</button>
                                        </div>
                                    </Link>
                               </motion.div>
                               
                            )
                        })
                    }
                   
                </div>
            </div>
        </div>
     );
}
 
export default HorizontalCardProductBasedOnCategory;