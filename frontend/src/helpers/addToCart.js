import routeApi from "../api/apiRoutes"
import { toast } from "react-toastify"

const addToCart =  async(e, id) =>{
    e.preventDefault()
    

    const FetchData = await fetch(routeApi.addToCartApi.url,{
        method: routeApi.addToCartApi.method,
        credentials: 'include',
        body: JSON.stringify({productId: id}),
        headers: {'Content-Type': 'application/json'}
    })
    const dataResponse = await FetchData.json()

    if(dataResponse.success){
        toast.success(dataResponse.message)
    }
    if(dataResponse.error){
        toast.error(dataResponse.message)
    }
    
}


export default addToCart