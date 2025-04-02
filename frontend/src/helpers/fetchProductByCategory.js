import routeApi from "../api/apiRoutes"

const fetchProductByCategory = async (category) => {
    const fetchRes = await fetch(routeApi.getProductByCategory.url, {
        method: routeApi.getProductByCategory.method,
        credentials: 'include',
        headers: {'Content-Type' : 'application/json'},
        body:JSON.stringify({ category })
    })

    const dataRes = await fetchRes.json()

 return dataRes
}
 
export default fetchProductByCategory;