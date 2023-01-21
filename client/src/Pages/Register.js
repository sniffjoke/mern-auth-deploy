import React from 'react';
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
import axios from 'axios'
import {Link} from "react-router-dom";


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
    }
})

const Register = () => {
    const classes = useStyles();

    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [email, setEmail] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        if (confirmPassword === password) {
            const data = {
                name, email, password
            }

            // const {response, error} = await axios.post(`${window.hostname}/api/auth/register`, data)
            axios
                .post(`/api/auth/register`, data)
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                if (error.response.data.success === false) {
                    window.alert(error.response.data.msg)
                }
            })
        } else {
            window.alert("Passwords don't match")
        }
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
                    className={classes.heading}
                >
                    Register Here
                </Typography>
                <Box
                    // marginTop={5}
                    component="form"
                    className={classes.form}
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <FormControl
                        required
                        fullWidth
                        sx={{m: 1}}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <OutlinedInput
                            id="name"
                            type="text"
                            label="Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>

                    <FormControl
                        required
                        fullWidth
                        sx={{m: 1}}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <OutlinedInput
                            id="email"
                            type="email"
                            label="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>

                    <FormControl
                        required
                        fullWidth
                        marginTop={2}
                        sx={{m: 1}}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            label="Password"
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
                            required
                        />
                    </FormControl>

                    <FormControl
                        required
                        fullWidth
                        marginTop={2}
                        sx={{m: 1}}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-confirm-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            label="Confirm Password"
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
                            required
                        />
                    </FormControl>

                    <Button
                        sx={{m: 1}}
                        variant="contained"
                        type={"submit"}
                        fullWidth
                    >
                        Register
                    </Button>
                </Box>
                <div>
                    <Typography variant="subtitle2">
                        Are you already a member?&nbsp;
                        <Link
                            to="/login"
                            className={classes.forgotPasswordDiv}
                        >
                            Login
                        </Link>
                    </Typography>
                </div>
            </div>
        </>
    );
};

export default Register
