const User = require('../../model/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// =============== sign up ==========================

const userSignup = async (req, res) =>{
   const maxAge = 3 * 60 * 60
    const createToken = (id) =>{
        return jwt.sign({id}, process.env.UNIQUE_KEY, {
            expiresIn: maxAge 
        } )
        
    }
    const handleError = (err) =>{
       console.log(err.message, err.code)
       let errors = {
            name: '',
            password: '',
            email: '',
        }

        if(err.code === 11000){
            errors.email = 'Email already registered'
        }

        if(err.message.includes('user validation failed: ')){
            Object.values(err.errors).forEach(({properties}) =>{
                errors[properties.path] = properties.message
            })
        }
        return errors
    }

    try {
        const {email, name, password, username, profilePic} = req.body
        role = 'General'
        const userData = new User({email, name, password, username, role, profilePic})
        const newUser = await userData.save()
        const token = createToken(newUser._id)
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: maxAge * 1000
        })
        res.status(201).json({
            // data : newUser,
            // message: 'User created successfully',
            // error: false,
            // success: true
            data: newUser
        })
    } catch (error) {
       const errors = handleError(error)
       res.status(400).json({error: errors})
    }
}

module.exports = userSignup
