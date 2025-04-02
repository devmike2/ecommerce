const User = require("../../model/userModel")

const allUser = async (req, res) =>{
    try {
        const userId = req.userId
        const allUsers = await User.find()
        res.status(200).json({
            message: 'ALL users',
            data: allUsers,
            success: true,
            error: false
        })
    } 
    catch (error) {
        res.status(400).json({
            data: error,
            success: false,
            error: true,
            message: 'Something went wrong'
        })    
    }
}

module.exports = allUser