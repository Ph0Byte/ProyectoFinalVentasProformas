import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';

export const usePurchaseHistory = () => {
  const { user } = useAuthStore();
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPurchaseHistory = async () => {
    if (!user || !user.id) {
      setError('Usuario no autenticado o ID de vendedor no disponible');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/cliente/historial', {
        params: { vendedorId: user.id },
      });
      setPurchaseHistory(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchaseHistory();
  }, []);

  return { purchaseHistory, loading, error };
};
