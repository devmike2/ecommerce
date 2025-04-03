require('dotenv').config()
const cors = require('cors')
const express = require('express')
const connectDB = require('./config/connectdb')
const cookieParser = require('cookie-parser')
const apiRoutes = require('./Routes/apiRoutes')


const app = express()
port = 8080 || process.env.PORT

// middleware
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(cookieParser())

app.use( (req, res , next) =>{
    console.log(req.path, req.method)
    next()
})

app.use('/api/', apiRoutes)


connectDB().then((result) =>{
    app.listen(port)
    console.log(`Connected to DB and listening to request on port ${port}`)
})

module.exports = app