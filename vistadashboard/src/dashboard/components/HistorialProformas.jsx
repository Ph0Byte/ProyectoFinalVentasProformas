// HistorialProformas.jsx
import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button
} from '@mui/material';
import { FileText } from 'lucide-react';
import { ImprimirProformaPDF } from './ImprimirProformaPDF';

export const HistorialProformas = ({ history }) => {
  const [selectedClienteId, setSelectedClienteId] = useState(null);

  const handlePrint = (id) => {
    console.log("Id de la proforma: ", id);
    setSelectedClienteId(id);
  };

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
            <TableCell>Ver Detalles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history && history.length > 0 ? (
            history.map((cliente, index) => (
              <TableRow key={index}>
                <TableCell>{cliente.nombreCliente}</TableCell>
                <TableCell>{cliente.fechaProforma}</TableCell>
                <TableCell>{cliente.dni}</TableCell>
                <TableCell>{cliente.telefono}</TableCell>
                <TableCell>{cliente.montoTotal}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary"
                    onClick={() => handlePrint(cliente.id)}>
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

      {selectedClienteId && <ImprimirProformaPDF clienteId={selectedClienteId} />}
    </TableContainer>
  );
};
