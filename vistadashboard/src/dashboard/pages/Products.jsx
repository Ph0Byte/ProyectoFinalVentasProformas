import React, { useState, useEffect } from 'react';
import {
  Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField
} from '@mui/material';
import { useProducts } from '../service/useProducts';

export const Products = () => {
  const { products, loading, error, addProduct, updateProduct, deleteProduct } = useProducts();
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ nombre: '', precio: '', stock: '' });

  const handleOpen = (product = null) => {
    setCurrentProduct(product ? product : { nombre: '', precio: '', stock: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProduct({ nombre: '', precio: '', stock: '' });
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      if (currentProduct.id) {
        await updateProduct(currentProduct.id, currentProduct);
      } else {
        await addProduct(currentProduct);
      }
      handleClose();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>Productos</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()} style={{ marginBottom: '20px' }}>
        Agregar Producto
      </Button>

      {loading ? (
        <Typography variant="h6">Cargando productos...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre del producto</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="right">Stock</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.nombre}</TableCell>
                  <TableCell align="right">${product.precio.toFixed(2)}</TableCell>
                  <TableCell align="right">{product.stock}</TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleOpen(product)}>Editar</Button>
                    <Button onClick={() => handleDelete(product.id)} color="secondary">Eliminar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentProduct?.id ? 'Editar Producto' : 'Agregar Producto'}</DialogTitle>
        <form onSubmit={handleSave}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nombre"
              type="text"
              fullWidth
              value={currentProduct.nombre}
              onChange={(e) => setCurrentProduct({ ...currentProduct, nombre: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Precio"
              type="number"
              fullWidth
              value={currentProduct.precio}
              onChange={(e) => setCurrentProduct({ ...currentProduct, precio: parseFloat(e.target.value) })}
            />
            <TextField
              margin="dense"
              label="Stock"
              type="number"
              fullWidth
              value={currentProduct.stock}
              onChange={(e) => setCurrentProduct({ ...currentProduct, stock: parseInt(e.target.value) })}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" color="primary">Guardar</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
