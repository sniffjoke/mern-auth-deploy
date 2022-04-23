import React from 'react';
import {
    Box, Button,
    CssBaseline,
    FormControl,
    InputLabel,
    OutlinedInput,
    Typography
} from "@mui/material";
import {makeStyles} from "@mui/styles"
import {blue} from "@mui/material/colors"
import axios from "axios";


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

const ForgotPassword = () => {
    const classes = useStyles();

    const [email, setEmail] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!email) {
            window.alert('Email not present!')
            return
        }
        axios
            .post('/api/auth/forgotpassword', {email})
            .then(res => {
                console.log(res.data.msg)
                alert(res.data.msg)
            })
            .catch(err => {
                console.log(err.response.data.msg)
                window.alert(err.response.data.msg)
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
                    Forgot Password
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
                    <Button
                        sx={{m: 1}}
                        variant="contained"
                        type={"submit"}
                        fullWidth
                    >
                        Forgot Password
                    </Button>
                </Box>
            </div>
        </>
    );
};

export default ForgotPassword;