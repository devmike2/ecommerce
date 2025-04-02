const logoutController = (req, res) =>{
    const cookie =''
    res.cookie('jwt', cookie, {
        httpOnly: true,
        maxAge: 1
    })
    res.status(200).json({
        success: true,
        error: false,
        message: 'user loged out successfully ',
        data: cookie
    })
}

module.exports = logoutController