const User = require("../../model/userModel")

const userDetails = async (req, res) =>{
   try {
        const user =await User.findById(req.userId)
        res.status(200).json({
            data: user, 
            message: 'user loged in',
            success: true,
            error: false
        })
    
   } catch (error) {
    console.log(error)
    res.status(400).json({
        message: "An Error occured" || error,
        error: true,
        success: false
    })
   }
}


module.exports = userDetails