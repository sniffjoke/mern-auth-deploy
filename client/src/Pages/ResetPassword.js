import React, {useEffect, useState} from 'react';
import {
    Box, Button,
    CssBaseline,
    FormControl, IconButton, InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from "@mui/material";
import {makeStyles} from "@mui/styles"
import {blue} from "@mui/material/colors"
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useLocation} from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";


const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    heading: {
        color: blue[900],

    },
    form: {
        width: "30%"
    },
    forgotPasswordDiv: {
        margin: "10px 0",
        textAlign: "right"
    }
})

const ResetPassword = () => {
    const classes = useStyles();

    console.log('Это useMatch', useLocation())
    const token = useLocation().search.slice(0, useLocation().search.length).split("=").pop()
    console.log('Это токен', token)

    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const [isTokenVerified, setIsTokenVerified] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        const {email} = jwt_decode(token)


        axios
            .post('/api/auth/resetpassword', {email, newPassword: password, confirmNewPassword: confirmPassword})
            .then(res => {
                window.alert(res.data.msg)
                console.log(res.data)
            })
            .catch(err => {
                window.alert(err.response.data.msg)
                console.log(err.response)
            })
    }

    useEffect(() => {
        if (token) {
            axios
                .get(`/api/auth/verifyToken?token=${token}`)
                .then(res => {
                    console.log(res)
                    setIsTokenVerified(true)
                })
                .catch(err => {
                    console.log(err.response)
                    window.alert(err.response.data.msg)
                    setError(err.response.data.msg)
                })
        }

    }, [])

    if (error) {
        return (
            <p>
                {error}
            </p>
        )
    }

    if (!token && !error) {
        return (
            <p>Token not present</p>
        )
    }



    return (
        <>
            <CssBaseline/>
            <div className={classes.root}>
                {
                    isTokenVerified
                        ?
                        <>
                            <Typography
                                variant="h2"
                                gutterBottom
                                marginTop={5}
                                component="h2"
                                className={classes.heading}
                            >
                                Reset Password
                            </Typography>
                            <Box
                                marginTop={5}
                                marginBottom={8}
                                component="form"
                                className={classes.form}
                                autoComplete="off"
                                onSubmit={handleSubmit}
                            >

                                <FormControl
                                    required
                                    fullWidth
                                    // marginTop={2}
                                    sx={{m: 1}}
                                    variant="outlined"
                                >
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(prevshowPassword => !prevshowPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                        required
                                    />
                                </FormControl>

                                <FormControl
                                    required
                                    fullWidth
                                    // marginTop={2}
                                    sx={{m: 1}}
                                    variant="outlined"
                                >
                                    <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm
                                        Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-confirm-password"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowConfirmPassword(prevshowPassword => !prevshowPassword)}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Confirm Password"
                                        required
                                    />
                                </FormControl>

                                <Button
                                    sx={{m: 1}}
                                    variant="contained"
                                    type={"submit"}
                                    fullWidth
                                >
                                    Reset Password
                                </Button>
                            </Box>
                        </>
                        :
                        <Typography
                            variant="h2"
                            gutterBottom
                            marginTop={5}
                            component="h2"
                            className={classes.heading}
                        >
                            Verifying Token. Please wait...
                        </Typography>
                }
            </div>
        </>
    );
};

export default ResetPassword;