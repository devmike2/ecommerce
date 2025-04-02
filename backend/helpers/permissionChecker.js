const User = require("../model/userModel")

const permissionChecker = async(UserId) =>{
    const user = await User.findById(UserId)

    if(user.role === 'Admin'){
        return true
    }
    return false
}

module.exports = permissionChecker