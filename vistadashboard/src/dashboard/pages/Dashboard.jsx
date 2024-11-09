import React, { useEffect, useState } from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Dashboard = () => {
  const urlBase = "http://localhost:8080";

  const [data, setData] = useState({
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [
      {
        label: 'Ventas',
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  });

  useEffect(() => {
    fetch(`${urlBase}/cliente/grafico `)
      .then(response => response.json())
      .then(data => {
        const updatedData = [data['Lunes'], data['Martes'], data['Miércoles'], data['Jueves'], data['Viernes'], data['Sábado'], data['Domingo']];
        setData(prevData => ({
          ...prevData,
          datasets: [{ ...prevData.datasets[0], data: updatedData }],
        }));
      });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ventas Diarias',
      },
    },
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Detalles Rapidos
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Ventas Semanales
          </Typography>
          <Bar data={data} options={options} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Proformas Hechas
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};
