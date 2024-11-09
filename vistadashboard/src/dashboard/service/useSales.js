import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';

export const useSales = () => {
    const urlBase = "http://localhost:8080";
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [history, setHistory] = useState([]); // Historial de ventas
    const [carritoId, setCarritoId] = useState(null);

    const { user } = useAuthStore();

    useEffect(() => {
        crearNuevoCarrito();
    }, []);

    const crearNuevoCarrito = async () => {
        const response = await axios.post(`${urlBase}/carrito/nuevo`);
        setCarritoId(response.data.id);
    };

    const fetchProducts = async (query = '') => {
        const response = await axios.get(`${urlBase}/carrito/buscador`, { params: { nombre: query } });
        setProducts(response.data);
    };

    const addToCart = async (product) => {
        const existingItem = cart.find((item) => item.id === product.id);
        if (existingItem) {
            setCart(cart.map((item) =>
                item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
            ));
        } else {
            setCart([...cart, { ...product, cantidad: 1 }]);
        }

        if (carritoId) {
            await axios.post(`${urlBase}/carrito/${carritoId}/agregar`, null, {
                params: { productoId: product.id, cantidad: 1, vendedorId: user.id }
            });
        }
    };

    const updateQuantity = (productId, cantidad) => {
        setCart(cart.map((item) =>
            item.id === productId ? { ...item, cantidad: parseInt(cantidad) } : item
        ));
    };

    const calculateTotal = () => cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    const vaciarCarrito = async () => {
        if (carritoId) {
            await axios.delete(`${urlBase}/carrito/${carritoId}/vaciar`);
            setCart([]);
        }
    };

    const registerSale = async (customerInfo) => {
        const saleData = {
            nombreCliente: customerInfo.nombre,
            dni: customerInfo.dni,
            telefono: customerInfo.telefono, 
            itemsComprados: cart.map(item => ({
                productoId: item.id,
                cantidad: item.cantidad
            }))
        };
    
        try {
            const response = await axios.post(`${urlBase}/carrito/${carritoId}/comprar`, saleData, {
                params: { vendedorId: user.id }
            });
            await crearNuevoCarrito();  // Crear nuevo carrito después de la compra
            setCart([]); // Limpiar carrito
            return response.data;
        } catch (error) {
            console.error("Error al registrar la venta:", error.response?.data || error.message);
        }
    };

    // Nueva función para obtener el historial completo de ventas
    const fetchPurchaseHistory = async () => {
        try {
            const response = await axios.get(`${urlBase}/cliente/historial`, {params: { vendedorId: user.id }} );
            setHistory(response.data);
        } catch (err) {
            console.error("Error al obtener el historial:", err);
        }
    };

    return { 
        products, 
        cart, 
        fetchProducts, 
        addToCart, 
        updateQuantity, 
        calculateTotal, 
        registerSale, 
        vaciarCarrito, 
        history,
        fetchPurchaseHistory 
    };
};
