import { TextField, Button, Typography, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useAuth } from './service/useAuth.js';

export const Register = () => {
    const { registerUser, loading, error } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        await registerUser(username, password);
        setSuccess(true);
    };

    useEffect(() => {
        if (success) {
            navigate("/login");
        }
    }, [success, navigate]);

    return (
        <>
            <Typography component="h1" variant="h5">Registrar Nuevo Usuario</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Nombre de Usuario"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="confirmPassword"
                    label="Confirmar Contraseña"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {success && <Typography color="success">¡Usuario registrado con éxito!</Typography>}
                {error && <Typography color="error">{error}</Typography>}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ margin: "24px 0 16px" }}
                    disabled={loading}
                >
                    {loading ? 'Registrando...' : 'Registrarse'}
                </Button>
                <MuiLink component={Link} to="/login" variant="body2">
                    ¿Ya tienes una cuenta? Inicia sesión
                </MuiLink>
            </form>
        </>
    );
};
