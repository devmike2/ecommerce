import routeApi from "../api/apiRoutes"

const fetchSingleProductDetail = async (id) =>{
    const fetchData = await fetch(`${routeApi.getSingleProduct.url}/${id}`,{
        credentials: 'include',
       
        method: routeApi.getSingleProduct.method
    })
    const dataRes = await fetchData.json()

    return dataRes
}

export default fetchSingleProductDetail