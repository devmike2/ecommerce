import { useState } from "react";
import { GrClose } from "react-icons/gr";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import FullProductImage from "./fullProductimage";
import {MdDelete} from "react-icons/md"
import routeApi from "../api/apiRoutes";
import { toast } from "react-toastify"
const UploadProduct = ({onClose, onFetch}) => {
   //======= show full image screen ============
   const [showFullImage , setShwoFullImage] = useState(false)
   const [fullImageurl, setFullImageUrl] = useState('')
   // ==================== use state for data =========================
   const [data, setData] =useState({
      productName: '',
      brandName: '',
      productImg: [],
      category: '',
      description: '',
      price: '',
      sellingPrice: ''
   })
   // ==================== handling change on input boxes ======================
   const handleChange = (e) =>{
      const {name , value} = e.target
      setData((prev) =>{
          return {
              ...prev,
              [name]: value
          }
      })
   }
   // =========================== upload image to cloudinary =================
   const handleUploadImageChange = async(e) =>{
      const file = e.target.files[0]
      
      //  ==== connect to cloudinary ==============
      const uploadedImage =  await uploadImage(file)
      setData((prev) =>{
         return{
            ...prev,
            productImg :  [...prev.productImg, uploadedImage.url]
         }
      })
      
   }

   // ========================== delete product imahe ===========================
   const handleDeleteProductImage = async(index) =>{
      console.log('index', index)
      const newProductImageArray = [...data.productImg]
      newProductImageArray.splice(index, 1)

      setData((prev) =>{
         return{
            ...prev,
            productImg: [...newProductImageArray]
         }
      })
   }
  const handleSubmit = async(e) =>{
      e.preventDefault()
      
      const fetchData = await fetch(routeApi.uploadProduct.url, {
         method: routeApi.uploadProduct.method,
         credentials: "include",
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(data)
      })

      const dataResponse  = await fetchData.json()
      if(dataResponse.success){
         toast.success(dataResponse.message)
         onClose()
         onFetch()
      }
      if(dataResponse.error){
         toast.error(dataResponse.message)
      }
  }

   return ( 
      <div className="fixed bg-slate-200 bg-opacity-40 h-full inset-0 w-full z-10 flex justify-center items-center gap-2">
         <div className="bg-white p-4 w-full h-full max-w-2xl max-h-[calc(100vh-150px)] overflow-hidden">
            <div className="flex justify-between pb-3">
               <h2 className="text-2xl font-bold">Upload Products</h2>
               <button className="text-xl ml-auto block hover:text-red-600" onClick={onClose }>
                  <GrClose /> 
               </button>
            </div>
            {/* ========================== form field ========================= */}
            <form className="grid gap-3 mb-3 p-4 overflow-y-scroll h-full" onSubmit={handleSubmit}>
               {/* ============================= productname field ================== */}
               <label htmlFor="productName" className="text-lg">productName : </label>
               <input 
                  type="text" id="productName" 
                  placeholder="enter a product" 
                  value={data.productName}
                  name="productName" 
                  onChange={handleChange}
                  className="bg-slate-100 p-2 rounded " 
               />
               {/* ============================= brand name field =========================== */}

               <label htmlFor="brandName" className="text-lg mt-3">brandName : </label>
               <input 
                  type="text" id="brandName" 
                  placeholder="enter brandName" 
                  value={data.brandName}
                  name="brandName"
                  onChange={handleChange}
                  className="bg-slate-100 p-2 rounded " 
               />
               {/* ============================= category field =========================== */}

               <label htmlFor="category" className="text-lg mt-3">category : </label>
               <select name="category" id="category"  onChange={handleChange} value={data.category} className="bg-slate-100 p-2 rounded">
                  <option value="" disabled> choose a category</option>
                  {
                     productCategory.map((el,index) =>{
                        return(
                           <option value={el.value} key={el.value+index} >{el.label}</option>
                        )
                     })
                  }
               </select>

               {/* ============================= product image field =========================== */}

               <label htmlFor="productImg" className="text-lg mt-3">product Image : </label>
               <label htmlFor="uploadProductImage">
                  <div className="flex justify-center items-center h-32 w-full bg-slate-100 cursor-pointer">
                     <div className="flex justify-center flex-col items-center  text-slate-500">
                        <span className="text-4xl"><FaCloudUploadAlt /></span>
                        <p className="text-xs">Upload an image</p>
                        <input type="file" id="uploadProductImage" className="hidden" onChange={handleUploadImageChange}/>
                     </div>
                  </div>
               </label>
               {/* ============================== display image templates ==================================== */}
               {
                  data?.productImg[0] ? 
                     <div className="flex gap-3">
                        {
                           data.productImg.map((el, index) =>{
                              return(
                                 <div className="flex justify-center items-center flex-col">
                                    <div className="relative group"> 
                                       <img 
                                          src={el} 
                                          alt={el} 
                                          width={100} 
                                          height={100}  
                                          className="bg-slate-100 cursor-pointer"
                                          onClick={() =>{
                                             setShwoFullImage(true)
                                             setFullImageUrl(el)
                                          }} 
                                       />
                                       <div className="absolute bottom-0 right-0 bg-red-600 rounded-full p-1 cursor-pointer hidden group-hover:block text-white" onClick={() => handleDeleteProductImage(index)}>
                                          <MdDelete />
                                       </div>
                                    </div>
                                
                                 </div>
                              )
                           })
                        }
                     </div>
                  : (
                     <p className="text-xs text-red-600">* please upload a product image</p>
                  )
               }
               {/* ============================= price field =========================== */}


               <label htmlFor="price" className="text-lg">price : </label>
               <input 
                  type="number" id="price" 
                  placeholder="enter price" 
                  value={data.price}
                  name="price"
                  onChange={handleChange}
                  className="bg-slate-100 p-2 rounded " 
               />
               {/* ============================= selling price field =========================== */}


               <label htmlFor="sellingPrice" className="text-lg">Selling Price : </label>
               <input 
                  type="number" id="sellingPrice" 
                  placeholder="enter Selling Price" 
                  value={data.sellingPrice}
                  name="sellingPrice"
                  onChange={handleChange}
                  className="bg-slate-100 p-2 rounded " 
               /> 

               {/* ================================= description field ============================*/}
               <label htmlFor="description" className="text-lg">Description : </label>
               <textarea className="h-32 border Px-2 py-1 bg-slate-100 resize-none" name="description" value={data.description} onChange={handleChange} id="description" placeholder="Enter a descrption">ggyydddydyyy</textarea>


               {/* ============================== submit button =============================== */}
               <button className="px-3 py-4 bg-green-600 text-white hover:bg-green-700 mb-10 mt-3" >Upload</button>
               
            </form>
         </div>
         {/* ================================ show full product  image ========================================*/}
         {
            showFullImage && (
               <FullProductImage imageUrl={fullImageurl} onClose={() => setShwoFullImage(false)}/>
            )
         }

         
      </div>
   );
}
 
export default UploadProduct;