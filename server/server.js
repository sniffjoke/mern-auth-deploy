require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const app = express()

app.use(cors());

// const User = require('./models/User')

const dbConnect = require('./config/dbConfig')
const authAPI = require('./apis/authAPI')
const emailAPI = require('./apis/emailAPI')
const path = require("path");


//connect to database
dbConnect()

// body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, '/build')))


// const newUser = new User({
//     name: "Dmitry",
//     email: "sniffjoke@gmail.com",
//     password: "fjkdsalfdklas",
// })
//
// console.log(newUser)

//router
app.get('/', (req, res) => {
    // res.send('its mern stack jwt auth server by Nalcapital')
    res.send(path.join(__dirname, '/build/index.html'))
})

//apis
app.use('/api/auth', authAPI)
app.use('/api/email', emailAPI)

// port
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`server is running on port ${port}`))