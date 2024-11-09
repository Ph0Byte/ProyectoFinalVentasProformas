import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';  
import { AppRouter } from './Router/AppRouter';
import { colorTheme } from './theme/colorTheme';

export const App = () => {
  return (
    <ThemeProvider theme={colorTheme}>
      <CssBaseline />
      <BrowserRouter>  
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
};
