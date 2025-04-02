const User = require('../../model/userModel')

const updateUserRole = async (req,res) =>{
    try {
        const sessionUser = req.userId
        if(!sessionUser){
            throw new Error("User has to be authnticted");
            
        }
        const { role, userId } = req.body
        const updateUser = await User.findByIdAndUpdate(userId,  {role} )
        console.log(updateUser.role)
        res.status(200).json({
            success: true,
            error: false,
            data: updateUser,
            message: 'Role changed successful'
        })
    } 
    catch (error) {
        res.status(400).json({
            message: `An error occured: ${error}`,
            error: true,
            success: false
        })    
    }
}

module.exports = updateUserRole