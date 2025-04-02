import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import fetchSingleProductDetail from "../helpers/FetchSingleProsuctDetail";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import currencySymbol from "../helpers/currencySymbol";
import RecomendedProducts from "../components/RecomendedProducts";


const ProductDetails = () => {

    const [productData, setProductData] = useState({
        productName:"",
        brandName:'',
        productImg: [],
        category:'',
        description:'',
        sellingPrice:'',
        price:''
    })
    const [loading, setLoading] = useState(false)
    const loadingListArray = new Array(4).fill(null)
    const [activeImage, setActiveImage] = useState("")

    const param = useParams()
    const {id} = param
    const fetchresponse = async () =>{
        setLoading(true)        
        const fetchedData = await fetchSingleProductDetail(id)
        setLoading(false)
        

        if(fetchedData.success){
            setProductData(fetchedData.data)
            setActiveImage(fetchedData.data.productImg[0])
        }
    }
    useEffect(() =>{
        fetchresponse()
    },[])

    // =============== = change active himage with click and hover ============
    const handleChangeImage = (image) =>{
        setActiveImage(image)
    }
    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col">
                <div className="block  lg:flex gap-4">
                    <div className="h-76 w-76 lg:w-96 lg:h-96 flex gap-4 flex-col lg:flex-row-reverse ">
                        {/*full image  */}
                            {
                                loading? (
                                    <div className="w-[300px] h-[300px] lg:h-[75%] lg:w-[75%] bg-slate-200 animate-pulse">
                                        
                                    </div>
                                )
                                :(
                                    <div className="w-[300px] h-[300px] lg:h-[75%] lg:w-[75%] bg-slate-200">
                                        <img src={activeImage} className="h-full w-full object-scale-down"/>
                                    </div>
                                )
                            }
                        {/* productimage list */}
                        <div className="flex gap-2 lg:gap-4 lg:flex-col overflow-scroll scroll-none">
                            {
                                loading? (
                                    loadingListArray.map((el,index) =>{
                                        return(
                                            <div key={el+index} className="w-[85px] h-[85px] bg-slate-200 animate-pulse ">

                                            </div>
                                        )
                                    })
                                ):(
                                    productData.productImg.map((image, index) =>{
                                        return(
                                            <div key={image+index} className="w-[85px] h-[85px] bg-slate-200 p-1 ">
                                                <img src={image} className="mix-blend-multiply h-full w-full object-scale-down cursor-pointer" onClick={() => handleChangeImage(image)} onMouseEnter={() => handleChangeImage(image)} />
                                            </div>
                                        )
                                    }) 
                                )
                            }
                        </div>
                    </div>
                    {/* ============================== product details ====================== */}
                    <div className="bg-white lg:max-w-[65%] p-4 my-4 lg:my-0">
                        <h4 className="bg-red-200 text-red-600 w-fit px-2 rounded font-semibold text-xl">{productData?.brandName}</h4>
                        <h1 className="font-semibold text-xl lg:text-2xl ">{productData?.productName}</h1>
                        
                        <div className="flex gap-2 text-orange-600 items-center my-1">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStarHalfAlt />
                        </div>
                        <div className="flex items-center my-2 gap-2">
                            <p className="text-red-600 text-xl">{currencySymbol(productData.sellingPrice)}</p>
                            <p className="text-slate-400 line-through text-xl lg:text-2xl">{currencySymbol(productData?.price)}</p>
                        </div>
                        <div className="my-3">
                            <button className="bg-green-600 px-5 py-2 rounded hover:bg-white hover:border-green-600 hover:text-green-600 hover:border-2 hover:border-green-600 font-semibold">Add To Cart</button>
                        </div>
                        <div className="my-2 max-w-fit ">
                            <p>Discription: </p>
                            <p>{productData?.description}</p>
                        </div>
                    </div>
                   
                </div>
               <div>
                {productData?.category && ( <RecomendedProducts category={productData?.category} headings={'Recomended products'}/>)}
               
               </div>
            </div>
            
        </div>
      );
}
 
export default ProductDetails;