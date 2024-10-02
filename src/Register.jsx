import React, { useState } from 'react';
import { Box, TextField, Button, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';

const registerUser = async (userData) => {
    const response = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Error registering user');
    }
    return response.json();
};
const getAlertColor = (num) => {
    switch (num) {
        case 1: return "warning";
        case 2: return "error";
        case 3: return "error";
        default: return null;
    }
};


export function Register() {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        repeatPassword: "",
    });

    const [errors, setErrors] = useState([]);
    const [serverError, setServerError] = useState(null);

    const { mutate, isLoading, isError, data } = useMutation(registerUser, {
        onSuccess: (data) => {
        console.log('Registration successful!', data);
        },
        onError: (error) => {
        setServerError(error.message);
        },
    });

    const validateForm = () => {
        const { email, username, password, repeatPassword } = formData;
        const passwordErrors = [];

        if (password.length < 8) {
            passwordErrors.push('Password must be at least 8 characters long!');
        }

        if (!/\d/.test(password)) {
            passwordErrors.push('Password must contain at least one number!');
        }

        if (password !== repeatPassword) {
            passwordErrors.push('Passwords do not match!');
        }

        return passwordErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
        return;
        }

        const { repeatPassword, ...userData } = formData;
        mutate(userData);
        setErrors([]);
    };

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };
    //console.log(errors.length);
    const alertColor='';
    return (
        <Box sx={{ width: '70vh', margin: 2, padding: 2 }}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="email"
                    label="E-mail"
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    value={formData.email}
                /> <br />
                <TextField
                    name="username"
                    label="Username"
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    value={formData.username}
                /><br />
                <TextField
                    name="password"
                    label="Password"
                    type="password"
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    value={formData.password}
                /><br />
                <TextField
                    name="repeatPassword"
                    label="Repeat password"
                    type="password"
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    value={formData.repeatPassword}
                /><br />
                <Button
                    type="submit"
                    size="small"
                    sx={{
                        marginTop: 2,
                        width: '100%',
                        backgroundColor: 'palevioletred',
                        '&:hover': { backgroundColor: 'rgb(130, 56, 81)' },
                        color: 'white',
                    }}
                    disabled={isLoading}
                >
                Register
                </Button>
            </form>
            {errors.length > 0 && (<Alert severity = {getAlertColor(errors.length)} sx={{ marginTop: 2 }}>
                {errors.map((error, index) => (<div key={index}>{error}</div>))}
                </Alert>
            )}

            {isError && <Alert severity="error" sx={{ marginTop: 2 }}>{serverError}</Alert>}
            {data && <Alert severity="success" sx={{ marginTop: 2 }}>Registration successful!</Alert>}

            <p>
                Already have an account? <Link to="/login">Sign In here!</Link>
            </p>
        </Box>
    );
}
