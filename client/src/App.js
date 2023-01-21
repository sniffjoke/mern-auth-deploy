import React, {useEffect, useState} from "react";
import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import VerifyEmail from "./Pages/VerifyEmail";
import jwt_decode from "jwt-decode";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(false)

    const navigate = useNavigate()

    const logoutUser = () => {
        setUser(null)
        setIsLoggedIn(false)
        navigate('/login')
        localStorage.removeItem('MERN_AUTH_TOKEN')
    }

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('MERN_AUTH_TOKEN'))

        // if (!token) {
        //     setUser(null)
        //     isLoggedIn(false)
        // }

        if (token) {
            const decodedToken = jwt_decode(token)
            if (decodedToken.exp * 1000 < Date.now()) {
                setUser(null)
                setIsLoggedIn(false)
                navigate('/login')
            } else {
                setUser(decodedToken)
                setIsLoggedIn(true)
            }
        }
    }, [])

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home isLoggedIn={isLoggedIn} user={user} logoutUser={logoutUser} />} />
                <Route path="/login" element={<Login ssesetUser={setUser} setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
                <Route path="/verifyEmail" element={<VerifyEmail />} />
            </Routes>

        </div>
    );
}

export default App;



// {/*
//         1. Home Page
//         2. Login
//         3. Register
//         4. Forgot Password
//         5. Reset Password
//         6. Verify Email
//         */}
