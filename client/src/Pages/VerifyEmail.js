import React, {useEffect, useState} from 'react';
import {
    CssBaseline,
    Typography
} from "@mui/material";
import {makeStyles} from "@mui/styles"
import {useLocation} from "react-router-dom";
import axios from "axios";


const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
})

const VerifyEmail = () => {
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState("")
    const classes = useStyles();

    const token = useLocation().search.slice(0, useLocation().search.length).split("=").pop()

    useEffect(() => {
        if (token) {
            axios.get(`/api/email/verify?token=${token}`).then(res =>{
                console.log(res)
                setVerified(true)
            }).catch(err => {
                console.log(err.response)
            })
        }
    }, [])

    if (!token) {
        return (
            <p>Token not present</p>
        )
    }

    return (
        <>
            <CssBaseline/>
            <div className={classes.root}>
                <Typography
                    variant="h2"
                    gutterBottom
                    marginTop={5}
                    component="h2"
                >
                    {
                        verified && !error ? "You are verified!" :
                            error? error :

                            "Verifiying. Please wait..."

                    }
                </Typography>
            </div>
        </>
    );
};

export default VerifyEmail;