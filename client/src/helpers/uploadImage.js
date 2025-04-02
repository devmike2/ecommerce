const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME_CLOUDINARY}/image/upload`
const uploadImage = async(image) =>{
const formData = new FormData()
formData.append('file', image)
formData.append('upload_preset', 'mern_ecommerce')

    const dataRes = await fetch(url, {
        method: 'POST',
        body: formData
    })
    const data = await dataRes.json()
    return data
}

export default uploadImage