const mongoose = require('mongoose');
const  { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Please provide a name'] 
    },
    username:{ 
        type: String,
        required: [true, 'username is required'],
        unique: true
    },
    email:{
        type: String,
        required: [true, 'please provide an email'],
        unique: true,
        lowercase: true,
        validate :[isEmail, 'Invalid Email']
    },
    password:{ 
        type: String,
        required: [true, 'please enter a password'],
        minlength: [8, 'minimum of 8 characters']
    },
    role: String,
    profilePic: String 
}, {
    timestamps: true

})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password =await bcrypt.hash(this.password, salt)
    next()
})

const User = mongoose.model('user', userSchema)

module.exports = User