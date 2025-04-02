const imageToBase64 = (image) =>{
    const reader = new FileReader()
    reader.readAsDataURL(image)

    const data = new Promise((reslove, reject) => {
        reader.onload = () =>{
            reslove(reader.result)
        }

        reader.onerror= (error) =>{
            reject(reader.error)
        }
    })
    return data
}
export default imageToBase64