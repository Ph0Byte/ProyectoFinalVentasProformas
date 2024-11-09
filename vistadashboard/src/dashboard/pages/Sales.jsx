import React, { useState, useEffect } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, TextField, Table, TableBody, TableCell,
  TableHead, TableRow, Typography, TableContainer, Paper
} from '@mui/material';
import { PlusCircle } from 'lucide-react';

import { useSales } from '../service/useSales';
import { ImprimirPDF } from '../components/ImprimirPDF';
import { HistorialClientes } from '../components/HistorialClientes';

export const Sales = () => {
  const { products, cart, fetchProducts, addToCart, updateQuantity, calculateTotal, registerSale, vaciarCarrito, history, fetchPurchaseHistory } = useSales();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({ nombre: '', dni: '', telefono: '' });
  const [clienteId, setClienteId] = useState(null);

  useEffect(() => {
    setTotal(calculateTotal());
  }, [cart, calculateTotal]);

  useEffect(() => {
    fetchPurchaseHistory();
  }, [fetchPurchaseHistory]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchProducts(e.target.value);
  };

  const handleAddProduct = (product) => addToCart(product);

  const handleConfirmSale = async () => {
    try {
      const sale = await registerSale(customerInfo);
      setClienteId(sale.clienteId); 

      await fetchPurchaseHistory();

      setTimeout(() => {
        setOpen(false);
        setCustomerInfo({ nombre: '', dni: '', telefono: '' });
      }, 500); // Delay 
    } catch (error) {
      console.error("Error al confirmar la venta:", error);
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom> Ventas </Typography>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Nueva compra
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Nueva Compra</DialogTitle>
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

          <Typography variant="h6" gutterBottom>
            Resultados de búsqueda:
          </Typography>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
                <Typography>{product.nombre}</Typography>
                <Button
                  variant="outlined"
                  startIcon={<PlusCircle />}
                  onClick={() => handleAddProduct(product)}
                >
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
                        onChange={(e) => updateQuantity(item.id, e.target.value)}
                        inputProps={{ min: 1 }}
                      />
                    </TableCell>
                    <TableCell>${item.precio.toFixed(2)}</TableCell>
                    <TableCell>${(item.precio * item.cantidad).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" style={{ marginTop: '20px' }}>
            Total: ${total.toFixed(2)}
          </Typography>

          <Button variant="outlined" color="secondary" fullWidth onClick={vaciarCarrito} style={{ marginTop: '10px' }}>
            Vaciar Carrito
          </Button>

          <TextField
            label="Nombre del Cliente"
            variant="outlined"
            fullWidth
            margin="dense"
            value={customerInfo.nombre}
            onChange={(e) => setCustomerInfo({ ...customerInfo, nombre: e.target.value })}
          />
          <TextField
            label="DNI"
            variant="outlined"
            fullWidth
            margin="dense"
            value={customerInfo.dni}
            onChange={(e) => setCustomerInfo({ ...customerInfo, dni: e.target.value })}
          />
          <TextField
            label="Teléfono"
            variant="outlined"
            fullWidth
            margin="dense"
            value={customerInfo.telefono}
            onChange={(e) => setCustomerInfo({ ...customerInfo, telefono: e.target.value })}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '20px' }}
            onClick={handleConfirmSale}
          >
            Confirmar Venta
          </Button>
        </DialogContent>
      </Dialog>

      <Typography variant="h5" style={{ marginTop: '20px' }}>Historial de Compras</Typography>
      <HistorialClientes history={history} clienteId={clienteId} />
    </>
  );
};
