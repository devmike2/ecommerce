const User = require('../../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const  userSigninController = async (req, res) => {
    const maxAge = 3 * 60 * 60
    const handleError = (err) =>{
        let error = {
            email: '',
            password: ''
        }
        if(err.message === 'Incorrect Password'){
            error.password = 'Incorrect Password'
        }
        if(err.message === 'Incorrect Email'){
            error.email = 'Invalid Email'
        }

        return error
    }
    const createToken = (id) =>{
        return jwt.sign({id}, process.env.UNIQUE_KEY,{
            expiresIn: maxAge
        })
    }  

    try{
        const { email, password } = req.body
        
        const user = await User.findOne({ email })
        if(user){
            const auth = await bcrypt.compare(password, user.password)
            if(auth){
                const token = createToken(user._id)
                res.cookie('jwt', token, {
                    httpOnly: true,
                    secure: true,
                    maxAge: maxAge * 1000
                })
                res.status(201).json({
                    data: user,
                    message: 'login successful',
                    error: false,
                    success: true
                })
            }
            else{
                throw Error("Incorrect Password");
                
            }
        }
        else{
            throw Error('Incorrect Email')
        }
        


        
    }
    catch(err){
        const error = handleError(err)
        res.status(400).json({error: error})
    }

}

module.exports = userSigninController