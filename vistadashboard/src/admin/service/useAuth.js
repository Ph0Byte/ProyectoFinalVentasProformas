import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/useAuthStore";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const {login, logout} = useAuthStore();

    const urlBase = 'http://localhost:8080/login';

    const loginUser = async (username, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${urlBase}/ingresar`, { username, password });
            if (response.status === 200) {
                setIsAuthenticated(true);  
                const userData = response.data; // Objeto del usuario recibido
                login(userData); // Guarda el usuario en Zustand
                console.log(userData);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data || "Error al iniciar sesión.");
            } else {
                setError("Error al conectar con el servidor.");
            }
        } finally {
            setLoading(false);
        }
    };

    const registerUser = async (username, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${urlBase}/register`, { username, password });
            if(response.status === 201){
                setIsAuthenticated(true);
            }
        } catch (error) {
            setError(error.response?.data || "Error al registrar.");
        }finally{
            setLoading(false);
        }
    };

    const recoverAccount = async (username) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${urlBase}/recovery`, { username });
            return response.data;
        } catch (error) {
            setError(error.response?.data || "Error en la recuperación de cuenta.");
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        loginUser,
        registerUser,
        recoverAccount,
        isAuthenticated,
    };
};
