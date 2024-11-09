import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Link as MuiLink } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./service/useAuth.js";
import { useAuthStore } from "../store/useAuthStore.js"; // Importa el store de Zustand

export const Login = () => {
    const navigate = useNavigate();
    const { loginUser, loading, error } = useAuth();
    const { isAuthenticated, user } = useAuthStore(); // Accede al estado de Zustand
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginUser(username, password);
    };

    useEffect(() => {
        if (isAuthenticated) {
            console.log("Usuario autenticado:", user); // Imprime el objeto del usuario
            navigate("/dashboard");
        }
    }, [isAuthenticated, user, navigate]);

    return (
        <>
            <Typography variant="h4" gutterBottom>Iniciar Sesión</Typography>
            <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 16 }}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Nombre de Usuario"
                    name="username"
                    autoComplete="username"
                    autoFocus
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
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <Typography color="error">{JSON.stringify(error)}</Typography>}

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ margin: "24px 0 16px" }}
                    disabled={loading}
                >
                    {loading ? 'Cargando...' : 'Iniciar Sesión'}
                </Button>

                <MuiLink component={Link} to="/register" variant="body2">
                    {"¿No tienes una cuenta? Regístrate"}
                </MuiLink>
                <br />
                {/* <MuiLink component={Link} to="/recover" variant="body2">
                    {"¿Olvidaste tu contraseña?"}
                </MuiLink> */}
            </form>
        </>
    );
};
