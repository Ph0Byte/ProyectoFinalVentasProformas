import React, { useState } from 'react';
import { TextField, Button, Typography, Link as MuiLink } from '@mui/material';
import { Link } from "react-router-dom";
import { useRecoverAccount } from './service/useRecoverAccount';

export const RecoverAccount = () => {
    const { 
        loading, 
        error, 
        requestRecoveryCode, 
        verifyRecoveryCode, 
        changePassword, 
        recoveryCode, 
        isCodeValid 
    } = useRecoverAccount();

    const [username, setUsername] = useState('');
    const [inputCode, setInputCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordChanged, setPasswordChanged] = useState(false);

    const handleRequestCode = async (e) => {
        e.preventDefault();
        setPasswordChanged(false);
        await requestRecoveryCode(username);
    };

    const handleVerifyCode = () => {
        verifyRecoveryCode(inputCode);
    };

    const handleChangePassword = async () => {
        const success = await changePassword(username, newPassword);
        if (success) {
            setPasswordChanged(true);
        }
    };

    return (
        <>
            <Typography component="h1" variant="h5">Recuperar Cuenta</Typography>
            <form style={{ width: '100%', marginTop: 1 }} onSubmit={handleRequestCode}>
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ margin: '24px 0 16px' }}
                    disabled={loading}
                >
                    {loading ? "Enviando código..." : "Enviar Código de Recuperación"}
                </Button>
                {recoveryCode && (
                    <>
                        <Typography>Tu código de recuperación: {recoveryCode}</Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="inputCode"
                            label="Ingrese el Código de Recuperación"
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleVerifyCode}
                            style={{ margin: '16px 0' }}
                            disabled={loading || isCodeValid}
                        >
                            Verificar Código
                        </Button>
                    </>
                )}
                {isCodeValid && (
                    <>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="newPassword"
                            label="Nueva Contraseña"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleChangePassword}
                            style={{ margin: '16px 0' }}
                            disabled={loading}
                        >
                            Cambiar Contraseña
                        </Button>
                        {passwordChanged && (
                            <Typography color="primary">Contraseña cambiada exitosamente.</Typography>
                        )}
                    </>
                )}
                {error && <Typography color="error">{error}</Typography>}
                <MuiLink component={Link} to="/login" variant="body2">
                    {"Volver al inicio de sesión"}
                </MuiLink>
            </form>
        </>
    );
};
