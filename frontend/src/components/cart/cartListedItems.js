import React, { useState } from 'react'
import currencySymbol from '../../helpers/currencySymbol'
import { FaTrash } from "react-icons/fa";

const CartListedItems = ({products}) => {

    const [quantity, setQuantity] = useState(1)

    // const handleChange = () =>{

    // }
    const handleIncrease = () =>{
        setQuantity((prev) =>{
            return prev+1
        })
    }
    const handleDecrease = () =>{
        setQuantity((prev) =>{
           return prev-1
        })
    }
  return (
    <div className='bg-white min-h-[200px] px-4'>
        <div className=' flex flex-col gap-3'>
            <h2 className='font-bold text-3xl capitalize'>cart({products.length})</h2>
            <div className='flex flex-col gap-4'>
                {
                    products.map((el, index) =>{
                        return(
                            <div key={el+index} className='border-t-[0.5px] border-gray-800 py-2  min-h-32 flex flex-col gap-3'>
                                <div className='flex justify-between gap-2 md:items-center flex-col md:flex-row'>
                                    <div className='flex  gap-2 md:items-center md:w-[70%]'>
                                        <div className=' bg-slate-200 w-[100px] md:w-[160px] h-[120px] md:h-[160px] flex justify-center items-center'>
                                            <img src={el.productId.productImg[0]} className='object-scale-down mix-blend-multiply h-[80px] w-[60px] md:h-[120px] md:w-[120px]'/>
                                        </div>
                                        
                                        <p className='w-[40%]'>{el.productId.productName}</p>
                                    </div>
                                   <div>
                                        <div className='flex-col flex '>
                                            <div className='flex gap-2'>
                                                <p className='line-through text-lg'>{currencySymbol(el.productId.price)}</p>
                                                <p className='text-white p-1 text-xs bg-red-600'>-{Math.round(((el.productId.price - el.productId.sellingPrice)/el.productId.sellingPrice) *100,2) }%</p>
                                                </div>
                                            
                                            <p className='text-xl font-semibold'>{currencySymbol(el.productId.sellingPrice)}</p>
                                            
                                            
                                        </div>
                                     
                                   </div>
                                    
                                </div>
                                <div className='flex flex-col md:flex-row-reverse justify-between gap-2'>
                                    <div className='flex gap-2'>
                                        <div className='py-2 px-4 text-white bg-red-600 text-xl rounded-md text-center items-center cursor-pointer' onClick={handleDecrease}>-</div>
                                        <input type="number" value={quantity} className='border-[1px] border-black w-[50px] flex items-center justify-center text-center bg-slate-200'/>
                                        <div className='px-4 py-2 text-white bg-green-600 text-xl rounded-md text-center items-center cursor-pointer' onClick={handleIncrease}>+</div>
                                    </div>
                                    <div className='flex gap-1 items-center cursor-pointer'>
                                        <p className='text3xl text-red-600'><FaTrash /></p>
                                    
                                        <p className='textxl text-red-600'>remove Product</p>
                                    </div>
                                </div>
                               
                            </div>
                             
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default CartListedItems