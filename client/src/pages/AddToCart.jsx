import React, { useEffect, useState } from 'react'
import CartListedItems from '../components/cart/cartListedItems'
import CartCheckOut from '../components/cart/cartCheckOut'
import routeApi from '../api/apiRoutes'
import { useAppStore } from '../store/slice'

const AddToCart = () => {

  const { cartCount } = useAppStore()

  const [cartProduct, setCartProduct] = useState([]) 
  const [loading, setLoading ] = useState(false)

  const loadingList = new Array(cartCount.count).fill(null)

  const fetchCartProducts = async () =>{
    setLoading(true)
    const fetchRes = await fetch(routeApi.cartItems.url,{
      method: routeApi.cartItems.method,
      credentials: 'include'
    })

    const dataRes = await fetchRes.json()

    if(dataRes.success){
      setCartProduct(dataRes.data)
    }
    setLoading(false)
  }


  useEffect(() =>{
    fetchCartProducts()
  },[])


  return (
      <div>
        {
          loading?(
            <div className='w-[90%] mx-auto py-2 flex flex-col md:flex-row justify-between gap-3'>
              <div className='flex flex-col gap-3'>
                {
                  loadingList.map((el,index)=>{
                    return(
                      <div className='md:w-[70%] w-full min-h-24 bg-slate-200 animate-pulse' key={index}>
                      </div>
                    )
                  })
                }
              </div>
              <div className='md:w-[20%] w-full min-h-44 bg-slate-200 animate-pulse'>
              </div>
            </div>
          )
          :
          (
            <div className='w-[90%] mx-auto py-2 flex flex-col md:flex-row justify-between'>
              <div className='md:w-[70%] w-full'>
                <CartListedItems products={cartProduct}/>
              </div>
              <div className='md:w-[20%] w-full'>
                <CartCheckOut />
              </div>
            
            </div>
          )
        }
      </div>
  )
}

export default AddToCart