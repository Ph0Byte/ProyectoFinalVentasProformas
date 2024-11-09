import React, { useEffect } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Toolbar, AppBar, Typography, Divider, Button } from '@mui/material';
import { DollarSign, Home, LogOut, Package, User, FilePenLine } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const drawerWidth = 240;

export const DashboardLayout = () => {
  const location = useLocation(); // Para detectar la ruta actual
  const { isAuthenticated, user, logout } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirige a login si no está autenticado
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar Mejorado */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h5" noWrap component="div" sx={{ fontWeight: 'bold', letterSpacing: 0.5 }}>
            Kea Gamer | Sistema Proformas - Ventas
          </Typography>
          <Toolbar sx={{ gap: 2 }}>
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
              Bienvenido, {user?.username}
            </Typography>
            {/* Botón de salir */}
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="error"
              startIcon={<LogOut size={20} />} 
              onClick={logout}
              sx={{
                backgroundColor: '#D32F2F',
                '&:hover': {
                  backgroundColor: '#C62828',
                },
                fontWeight: 'bold',
                color: 'white',
                textTransform: 'none',
              }}
            >
              Salir
            </Button>
          </Toolbar>
        </Toolbar>
      </AppBar>

      {/* Sidebar Mejorado */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#F4F6F8', // Fondo claro
            borderRight: '1px solid #E0E0E0',
            boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.05)', // Sombra para Drawer
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Lista de Navegación */}
          <List sx={{ flexGrow: 1 }}>
            {[
              { text: 'Inicio', icon: <Home />, path: '/' },
              { text: 'Productos', icon: <Package />, path: '/products' },
              { text: 'Ventas', icon: <DollarSign />, path: '/sales' },
              { text: 'Cotización', icon: <FilePenLine />, path: '/proforms' },
              { text: 'Perfil', icon: <User />, path: '/profile' },
            ].map((item) => (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
                sx={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  marginBottom: '8px',
                  backgroundColor: location.pathname === item.path ? '#E3F2FD' : 'transparent', // Item activo
                  color: location.pathname === item.path ? '#1E88E5' : 'inherit',
                  '&:hover': {
                    backgroundColor: '#E3F2FD', // Efecto hover
                  },
                }}
              >
                <Box sx={{ minWidth: '40px', display: 'flex', justifyContent: 'center', color: '#1E88E5', fontSize: '24px' }}>
                  {item.icon}
                </Box>
                <ListItemText 
                  primary={item.text} 
                  sx={{ fontSize: '16px', fontWeight: location.pathname === item.path ? 'bold' : 'normal' }}
                />
              </ListItem>
            ))}
          </List>

          {/* Footer en Sidebar */}
          <Divider />
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="textSecondary" align="center">
              @2024 Kea Gamer
            </Typography>
          </Box>
        </Box>
      </Drawer>

      {/* Contenido Principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};
