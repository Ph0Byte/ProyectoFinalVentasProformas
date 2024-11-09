import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';

export const useProforms = () => {
  const { user } = useAuthStore();
  const urlBase = "http://localhost:8080/proforma";
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [proformaId, setProformaId] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    crearNuevaProforma();
  }, []);

  const crearNuevaProforma = async () => {
    if (!user) return console.log("Usuario no registrado");

    try {
      const response = await axios.post(
        `${urlBase}/nuevo`,
        JSON.stringify({ vendedorId: user.id }),
        { headers: { 'Content-Type': 'application/json' } }
      );
      setProformaId(response.data.id);
    } catch (error) {
      console.error("Error al crear nueva proforma:", error);
    }
  };

  const fetchProducts = async (query = '') => {
    const response = await axios.get(`${urlBase}/buscador`, { params: { nombre: query } });
    setProducts(response.data);
  };

  const addToProforma = async (product) => {
    if (!user) {
      console.warn("El usuario no está autenticado.");
      return;
    }

    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, cantidad: 1 }]);
    }

    if (proformaId) {
      await axios.post(
        `${urlBase}/${proformaId}/agregar`,
        null,
        {
          params: { productoId: product.id, cantidad: 1, vendedorId: user.id }
        }
      );
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(cart.map((item) =>
      item.id === productId ? { ...item, cantidad: newQuantity } : item));
  };

  const removeFromProforma = async (productId) => {
    await axios.delete(`${urlBase}/${proformaId}/eliminar`, { params: { productId } });
    setCart(cart.filter((item) => item.id !== productId));
  };

  const calculateTotal = () => cart.reduce((total, item) => total + item.precio * item.cantidad, 0);

  const clearProforma = async () => {
    await axios.delete(`${urlBase}/${proformaId}/vaciar`);
    setCart([]);
  };


  const confirmProforma = async (customerInfo) => {
    if (!user || !user.id) {
      console.warn("El usuario no está autenticado o no tiene un ID válido.");
      return;
    }

    const proformData = {
      nombreCliente: customerInfo.nombre,
      dni: customerInfo.dni,
      telefono: customerInfo.telefono,
      montoTotal: calculateTotal(),
      vendedor: { id: user.id },  // Modificar para enviar el vendedor como un objeto
      itemsProformas: cart.map(item => ({
        producto: { id: item.id },
        cantidad: item.cantidad
      })),
    };

    try {
      const response = await axios.post(
        `${urlBase}/${proformaId}/procesar`,
        proformData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      await crearNuevaProforma();
      setCart([]);
      console.log("Datos enviados al backend:", proformData);
      return response.data;
    } catch (error) {
      console.error("Error al registrar la proforma", error.response?.data || error.message);
    }
  };


  const fetchHistoryProforms = async () => {
    const response = await axios.get(`${urlBase}/historial`, { params: { vendedorId: user.id } });
    setHistory(response.data);
  };

  return {
    products,
    cart,
    fetchProducts,
    addToProforma,
    updateQuantity,
    calculateTotal,
    clearProforma,
    confirmProforma,
    removeFromProforma,
    history,
    fetchHistoryProforms
  };
};
