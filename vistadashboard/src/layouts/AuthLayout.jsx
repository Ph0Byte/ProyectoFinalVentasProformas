import { Container, Paper } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <Container component='main' maxWidth='xs' >
        <Paper elevation={3} sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }} >
            <Outlet/>
        </Paper>

    </Container>
  )
}
