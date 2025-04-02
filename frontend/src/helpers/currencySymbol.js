const currencySymbol = (price) =>{
    const formartPrice = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
    }).format(price)

    return formartPrice
}

export default currencySymbol