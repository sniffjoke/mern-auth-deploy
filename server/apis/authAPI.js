const express = require('express')
const router = express.Router()

const {registerController, loginController, forgotPasswordController, resetPasswordController} = require("../controllers/authController");
const verifyTokenController = require("../controllers/verifyTokenController");


// register user Api
router.post('/register', registerController)

// login user Api
router.post('/login', loginController)

// forgot password Api
router.post('/forgotpassword', forgotPasswordController)

//  verify token
router.get('/verifyToken', verifyTokenController)

//  reset password
router.post('/resetpassword', resetPasswordController)

module.exports = router