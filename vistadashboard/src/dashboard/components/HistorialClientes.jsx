import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button
} from '@mui/material';
import { FileText } from 'lucide-react';

import { ImprimirPDF } from './ImprimirPDF';

export const HistorialClientes = ({ history, clienteId, loading, error }) => {
  const [selectedClienteId, setSelectedClienteId] = useState(clienteId);

  const handlePrint = (id) => {
    setSelectedClienteId(id); // Asigna el ID del cliente seleccionado para imprimir
  };

  if (loading) {
    return <Typography variant="h6">Cargando productos...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre del Cliente</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>DNI</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Monto</TableCell>
            <TableCell>Ver Detalles</TableCell> {/* Nueva columna para las acciones */}
          </TableRow>
        </TableHead>
        <TableBody>
          {history && history.length > 0 ? (
            history.map((cliente, index) => (
              <TableRow key={index}>
                <TableCell>{cliente.nombreCliente}</TableCell>
                <TableCell>{new Date(cliente.fechaCompra).toLocaleDateString()}</TableCell>
                <TableCell>{cliente.dni}</TableCell>
                <TableCell>{cliente.telefono}</TableCell>
                <TableCell>{cliente.montoTotal}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handlePrint(cliente.id)}>
                    <FileText /> Imprimir Detalle
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6}>
                <Typography align="center">No hay historial disponible</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Componente que se activa para generar el PDF */}
      {selectedClienteId && <ImprimirPDF clienteId={selectedClienteId} />}
    </TableContainer>
  );
};
 