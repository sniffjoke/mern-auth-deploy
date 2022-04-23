import React from 'react';
import Navbar from "./Navbar";
import {CssBaseline} from "@mui/material";

const Home = ({isLoggedIn, user, logoutUser}) => {

    return (
        <>
            <CssBaseline />
            <Navbar isLoggedIn={isLoggedIn} user={user} logoutUser={logoutUser} />
            <h1>Welcome to Home page</h1>
        </>
    );
};

export default Home;