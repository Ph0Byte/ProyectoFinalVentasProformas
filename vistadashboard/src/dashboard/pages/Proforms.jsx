import React, { useState, useEffect } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, TextField, Table, TableBody, TableCell,
  TableHead, TableRow, Typography, TableContainer, Paper, IconButton
} from '@mui/material';
import { PlusCircle, Trash } from 'lucide-react';
import { useProforms } from '../service/useProforms';
import { HistorialProformas } from '../components/HistorialProformas';

export const Proforms = () => {
  const { products, cart, fetchProducts, addToProforma, updateQuantity, calculateTotal, 
          clearProforma, confirmProforma, removeFromProforma, history, fetchHistoryProforms } = useProforms();
  
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({ nombre: '', dni: '', telefono: '' });

  useEffect(() => {
    setTotal(calculateTotal());
  }, [cart]);

  useEffect(() => {
    fetchHistoryProforms();
  }, []); 

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchProducts(e.target.value);
  };

  const handleAddProduct = (product) => addToProforma(product);

 
  const handleConfirmProforma = async () => {
    try {
      const result = await confirmProforma(customerInfo);
      if (result) {
        setOpen(false);
        setCustomerInfo({ nombre: '', dni: '', telefono: '' });
      } else {
        console.warn("No se pudo confirmar la proforma.");
      }
    } catch (error) {
      console.error("Error al confirmar la proforma:", error);
    }
  };
  

  return (
    <>
      <Typography variant="h4" gutterBottom>Proformas</Typography>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Nueva Proforma
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Nueva Proforma</DialogTitle>
        <DialogContent>
          <TextField
            label="Buscar producto"
            variant="outlined"
            fullWidth
            value={search}
            onChange={handleSearch}
            placeholder="Ingrese nombre de producto"
            margin="dense"
          />

          <Typography variant="h6" gutterBottom>Resultados de búsqueda:</Typography>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
                <Typography>{product.nombre}</Typography>
                <Button variant="outlined" startIcon={<PlusCircle />} onClick={() => handleAddProduct(product)}>
                  Agregar
                </Button>
              </div>
            ))
          ) : (
            <Typography>No se encontraron productos</Typography>
          )}

          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Precio Unitario</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.nombre}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={item.cantidad}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        inputProps={{ min: 1 }}
                      />
                    </TableCell>
                    <TableCell>${item.precio.toFixed(2)}</TableCell>
                    <TableCell>${(item.precio * item.cantidad).toFixed(2)}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => removeFromProforma(item.id)} color="error">
                        <Trash />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" style={{ marginTop: '20px' }}>Total: ${total.toFixed(2)}</Typography>

          <Button variant="outlined" color="secondary" fullWidth onClick={clearProforma} style={{ marginTop: '10px' }}>
            Vaciar Proforma
          </Button>

          <TextField label="Nombre del Cliente" variant="outlined" fullWidth margin="dense" value={customerInfo.nombre} onChange={(e) => setCustomerInfo({ ...customerInfo, nombre: e.target.value })} />
          <TextField label="DNI" variant="outlined" fullWidth margin="dense" value={customerInfo.dni} onChange={(e) => setCustomerInfo({ ...customerInfo, dni: e.target.value })} />
          <TextField label="Teléfono" variant="outlined" fullWidth margin="dense" value={customerInfo.telefono} onChange={(e) => setCustomerInfo({ ...customerInfo, telefono: e.target.value })} />

          <Button variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }} onClick={handleConfirmProforma}>
            Confirmar Proforma
          </Button>
        </DialogContent>
      </Dialog>

      <Typography variant="h5" style={{ marginTop: '20px' }}>Historial de Proformas </Typography>
      <HistorialProformas history={history} />

    </>
  );
};
