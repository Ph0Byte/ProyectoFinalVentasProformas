import axios from "axios";
import { useEffect, useState } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlBase = "http://localhost:8080/productos";

  // BUSCAR en los productos
  const fetchSearchProducts = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`${urlBase}/buscar?nombre=${query}`);
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      setError('Error al buscar productos');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${urlBase}/listar`);
      setProducts(response.data);
    } catch (error) {
      setError("Error al listar los productos");
    }finally{
      setLoading(false);
    }
  };

  // agregar un nuevo producto
  const addProduct = async (product) => {
    try {
      await axios.post(`${urlBase}/agregar`, product);
      fetchProducts();
    } catch (error) {
      setError("Error al añadir el producto");
    }
  };

  // useProducts.js
  const updateProduct = async (id, product) => {
    try {
        await axios.put(`${urlBase}/actualizar/${id}`, product, {
            headers: { 'Content-Type': 'application/json' },
        });
        fetchProducts();
    } catch (error) {
        setError("Error al actualizar el producto");
    }
  };


  // eliminar
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${urlBase}/eliminar/${id}`);
      fetchProducts();
    } catch (error) {
      setError("Error al eliminar producto");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchSearchProducts,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};
