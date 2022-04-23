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
import {Link} from "react-router-dom";
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

const Login = ({setIsLoggedIn, setUser}) => {
    const classes = useStyles();

    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault()

            const data = {
                email, password
            }

            // const {response, error} = await axios.post(`${window.hostname}/api/auth/register`, data)
        axios
            .post(`/api/auth/login`, data)
            .then(response => {
                window.alert(response.data.msg)
                console.log(response.data)
                const token = response.data.token

                localStorage.setItem('MERN_AUTH_TOKEN', JSON.stringify(token))

                const decodedToken = jwt_decode(token)

                setUser(decodedToken)
                setIsLoggedIn(true)

            }).catch((error) => {
            if (error.response.data.success === false) {
                window.alert(error.response.data.msg)
            }
        })
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
                    Login Here
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
                    <Button
                        sx={{m: 1}}
                        variant="contained"
                        type={"submit"}
                        fullWidth
                    >
                        Login
                    </Button>
                </Box>
                <div>
                    <Typography variant="subtitle2">
                        <Link
                            to="/forgotpassword"
                            className={classes.forgotPasswordDiv}
                        >
                            Forgot Password?
                        </Link>
                        &nbsp;Are you not a member?&nbsp;
                        <Link
                            to="/register"
                            className={classes.forgotPasswordDiv}
                        >
                            Sign up
                        </Link>
                    </Typography>
                </div>
            </div>
        </>
    );
};

export default Login;