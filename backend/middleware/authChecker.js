const jwt = require('jsonwebtoken')
require('dotenv').config()


const authChecker = async(req, res, next) =>{
    try{
        const token = req.cookies.jwt
        if(!token){
            res.status(200).json({
                message: 'User not loged in',
                success: true,
                error: false
            })
            console.log('user not loged in')
        }
       
       if (token){
            jwt.verify(token, process.env.UNIQUE_KEY, (err, decoded) =>{
                if(err){
                  console.log(err)
                }
                if(decoded){
                    console.log('Succful, Payload: ', decoded)
                
                }
                req.user.id  = decoded._id
                next()
            })

       }
    }
    catch(err){
        res.status(400).json({
            message: err.massage || err,
            data: [] ,
            error: true,
            success: false
        })
    } 
}

module.exports= authChecker