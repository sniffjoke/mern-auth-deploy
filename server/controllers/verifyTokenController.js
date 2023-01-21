const jwt = require('jsonwebtoken')
const User = require('../models/User')

const verifyTokenController = async (req, res) => {
    // res.send(req.query)
    const {token} = req.query

    if (!token) {
        return res.status(404).json({success: false, msg: "Invalid Token!"})
    }

    //  decode the token
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.TOKEN_KEY)
    } catch (err) {
        return res.status(400).json({success: false, msg: "Invalid Token!", error: err})
    }

    //  checking if user is present or not
    const oldUser = await User.findOne({email: decodedToken.email})

    if (!oldUser) {
        return res.status(400).json({success: false, msg: "User Not Found!"})
    }

    // res.status(200).json({success: true, data: decodedToken})
    res.status(200).json({success: true, data: decodedToken.email})
}

module.exports = verifyTokenController
