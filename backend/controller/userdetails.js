const jst = require('jsonwebtoken')
const userDetails = async (req, res) =>{
   try {
        

        console.log(req.user)
    
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