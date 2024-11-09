import { useState } from "react";
import axios from "axios";

export const useRecoverAccount = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [recoveryCode, setRecoveryCode] = useState(null);
    const [isCodeValid, setIsCodeValid] = useState(false);   

    const urlBase = 'http://localhost:8080/login'; 

    const requestRecoveryCode = async (username) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${urlBase}/recovery`, { username });
            setRecoveryCode(response.data.codigoRecuperacion); // Backend envía el código
        } catch (error) {
            setError(error.response?.data || "Error al solicitar el código de recuperación.");
        } finally {
            setLoading(false);
        }
    };

    const verifyRecoveryCode = (inputCode) => {
        if (parseInt(inputCode) === recoveryCode) {
            setIsCodeValid(true);
            setError(null);
        } else {
            setError("El código ingresado es incorrecto.");
        }
    };

    const changePassword = async (username, newPassword) => {
        if (!isCodeValid) {
            setError("El código de recuperación no ha sido validado.");
            return false;
        }
        setLoading(true);
        setError(null);
        try {
            await axios.post(`${urlBase}/change-password`, { username, nuevoPassword: newPassword, codigoRecuperacion: recoveryCode });
            return true; // Indica éxito
        } catch (error) {
            setError(error.response?.data || "Error al cambiar la contraseña.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        requestRecoveryCode,
        verifyRecoveryCode,
        changePassword,
        recoveryCode,
        isCodeValid
    };
};
