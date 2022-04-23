const bcrypt = require('bcryptjs')
const User = require('../models/User')

const tokenGenerator = require('../config/createToken')
const {sendVerificationEmail, sendForgotPasswordEmail} = require('../config/sendEmail')

const registerController = async (req, res) => {
    // console.log(req.hostname)
    // console.log("working post request")
    const {name, email, password} = req.body
    console.log(name, email, password)

    if (!name || !email || !password) {
        return res.status(400).json({success: false, msg: "Please fill in all fields!"})
    }

    if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
        return res.status(400).json({success: false, msg: "Please enter valid email!"})
    }

    if (password.length < 8) {
        return res.status(400).json({success: false, msg: "Password length should be at least of length 8!"})
    }

    //  check if user is already present
    const oldUser = await User.findOne({email})
    if (oldUser) {
        return res.status(403).json({success: false, msg: "This email is already present!"})
    }

    // use model and create new user
    bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            // Store hash in your password DB.
            const hashedPassword = hash

            const newUser = new User({
                name, email, password: hashedPassword
            })

            // res.json(req.body)
            // res.status(201).json({success: true, user: newUser})
            await newUser.save();

            //  generate token
            const token = tokenGenerator({email: newUser.email})

            //  send email
            // const link = "http://" + req.hostname + ":5000/api/email/verify?token=" + token
            const link = "http://" + req.hostname + ":3000/verifyEmail?token=" + token

            const sendMail = await sendVerificationEmail(newUser.email, link)

            if (sendMail) {
                res
                    .status(201)
                    .json({success: true, msg: "Registered successfully! Error in sending verification email!"})
            } else {
                res
                    .status(201)
                    .json({success: true, msg: "Registered successfully!"})
            }
            // console.log('token', tokenGenerator({email: newUser.email}))
        });
    });
}

const loginController = async (req, res) => {
    // console.log(req.body)
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(400).json({success: false, msg: "Invalid Email/Password!"})
    }

    //  finding old user
    const oldUser = await User.findOne({email})

    if (!oldUser) {
        return res
            .status(400)
            .json({success: false, msg: "Invalid Email/Password!"})
    }

    //  comparing passwords
    const comparePassword = await bcrypt.compare(
        password,
        oldUser.password,
    )

    if (!comparePassword) {
        return res
            .status(400)
            .json({success: false, msg: "Invalid Email/Password!"})
    }

    //  generate token with user info
    // res.send("all correct")
    const token = tokenGenerator({email: oldUser.email, name: oldUser.name, verified: oldUser.verified , _id: oldUser._id})

    //  sending response
    res.status(200).json({success: true, token, msg: "You are loggedin successfully"})
}


const forgotPasswordController = async (req, res) => {
    // console.log(req.body)
    const {email} = req.body
    if (!email) {
        return res.status(400).json({success: false, msg: "Please enter valid Email!"})
    }

    if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
        return res.status(400).json({success: false, msg: "Please enter valid email!"})
    }

    // user is present or not
    const oldUser = await User.findOne({email})

    if (!oldUser) {
        return res.status(404).json({success: false, msg: "User is not found present!"})
    }

    //  send forgot password email
    //  generate token
    const token = tokenGenerator({email: oldUser.email})

    //  send email
    const link = "http://" + req.hostname + ":3000/resetpassword?token=" + token

    const sendMail = await sendForgotPasswordEmail(oldUser.email, link)

    if (sendMail) {
        res
            .status(201)
            .json({success: true, msg: "Error in sending email!"})
    } else {
        res.status(201).json({success: true, msg: "Email Sent!"})
    }
}

//  reset password controller
const resetPasswordController = async (req, res) => {
    // res.send(req.body)
    const {email, newPassword, confirmNewPassword} = req.body

    if (!email || !confirmNewPassword || !newPassword) {
        return res.status(400).json({success: false, msg: "Please fill in all fields!"})
    }

    if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
        return res.status(400).json({success: false, msg: "Please enter valid email!"})

    }

    const oldUser = await User.findOne({email})
    if (!oldUser) {
        return res.status(400).json({success: false, msg: "User Not Found!"})
    }

    if (newPassword !== confirmNewPassword) {
        return res
            .status(400)
            .json({success: false, msg: "Passwords do not match!"})
    }

    bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(newPassword, salt, async (err, hash) => {
            const hashedPassword = hash;

            const updatedData = await User.findOneAndUpdate({email}, {
                $set: {
                    password: hashedPassword
                }
            })

            if (updatedData) {
                res.status(200).send({success: true, msg: "password updated successfully!"})
            } else {
                res.status(500).send({success: false, msg: "something went wrong!"})
            }
        })
    })

}

module.exports = {registerController, loginController, forgotPasswordController, resetPasswordController}