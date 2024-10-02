import React, { useState } from "react";
import { Box, TextField, Button, Alert, Typography } from "@mui/material";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";

const loginUser = async (data) => {
    const response = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
});

if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
}
    return response.json();
};

export function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);

    const mutation = useMutation(loginUser, {
        onSuccess: (data) => {console.log("Login successful ", data);
            setLoginSuccess(true);
        },
        onError: (error) => {console.error("Login failed ", error);
            setLoginSuccess(false);
        },
    });

    const handleSubmit = (e) => { e.preventDefault();
        const loginData = {
            username: username,
            password: password,
        };
        mutation.mutate(loginData);
    };

    return (
        <Box sx={{ width: "70vh", margin: 2, padding: 2 }}>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="username"
                    label="Username"
                    variant="standard"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br />

                <Button
                    type="submit"
                    sx={{
                        marginTop: 2,
                        width: "100%",
                        backgroundColor: "palevioletred",
                        "&:hover": { backgroundColor: "rgb(130, 56, 81)" },
                    }}
                >
                    <Typography style={{ color: 'white', textDecoration: 'none' }}>
                        Login
                    </Typography>
                </Button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Sign Up here!</Link>
            </p>

            {loginSuccess && ( <Alert severity="success" sx={{ marginTop: 2 }}> Login successful!</Alert> )}

            {mutation.isError && ( <Alert severity="error" sx={{ marginTop: 2 }}>{mutation.error.message}</Alert>)}
        </Box>
    );
}
