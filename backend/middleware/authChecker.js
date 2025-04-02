const jwt = require('jsonwebtoken')
require('dotenv').config()


const authChecker = async(req, res, next) =>{
    try{
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({
                message: 'Please log in',
                success: true,
                error: false
            })
        }
       
       if (token){
            jwt.verify(token, process.env.UNIQUE_KEY, (err, decoded) =>{
                if(err){
                  console.log(err)
                  return res.status(403).json({
                    message: 'an error occured' ,
                    success: false,
                    error: true
                  })
                }
                if(decoded){
                    // console.log('Succful, Payload: ', decoded)
                    req.userId  = decoded.id
                    next()
                }
                
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