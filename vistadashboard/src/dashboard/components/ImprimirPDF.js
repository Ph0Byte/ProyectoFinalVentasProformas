import React, { useEffect } from 'react';
import { jsPDF } from 'jspdf';
import axios from 'axios';

export const ImprimirPDF = ({ clienteId }) => {
  useEffect(() => {
    if (clienteId) generarPDF();
  }, [clienteId]);

  const generarPDF = async () => {
    try {
      const { data: cliente } = await axios.get(`http://localhost:8080/cliente/${clienteId}/compras`);

      const doc = new jsPDF();
      doc.setFont("helvetica", "normal");

      // Agregar logo de la empresa (usando una URL de ejemplo)
      const logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png';
      const image = new Image();
      image.src = logoUrl;

      // Cuando la imagen se carga, se agrega al PDF y luego se genera el resto del contenido
      image.onload = () => {
        doc.addImage(image, 'PNG', 10, 10, 30, 30); 

        // Estilo y encabezado
        doc.setFontSize(30);// 16
        doc.text("Boleta de Venta", 105, 15, { align: 'center' });
        doc.setFontSize(20);// 16
        doc.text("KeaGamer", 105, 22, { align: 'center' });
        doc.setFontSize(10);
        doc.text("Dirección de la Tienda", 105, 28, { align: 'center' });
        doc.text("Teléfono: 123-456-7890", 105, 33, { align: 'center' });

        // Información del cliente y de la compra
        doc.setFontSize(12);
        // doc.text(`Fecha: ${new Date(cliente.fechaCompra).toLocaleDateString()}`, 10, 50);
        doc.text(`Fecha: ${cliente.fechaCompra}`, 10, 50);
        doc.text(`Cliente: ${cliente.nombreCliente}`, 10, 56);
        doc.text(`DNI: ${cliente.dni}`, 10, 62);
        doc.text(`Teléfono: ${cliente.telefono}`, 10, 68);

        // Encabezado de la tabla de productos
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Item", 10, 80);
        doc.text("Producto", 30, 80);
        doc.text("Cantidad", 100, 80);
        doc.text("Precio Unitario", 130, 80);
        doc.text("Subtotal", 170, 80);
        
        doc.setFont("helvetica", "normal");

        // Detalle de productos
        let posicionY = 88;
        cliente.itemsComprados.forEach((item, index) => {
          doc.text(`${index + 1}`, 10, posicionY);
          doc.text(item.producto.nombre, 30, posicionY);
          doc.text(`${item.cantidad}`, 100, posicionY);
          doc.text(`$${item.producto.precio.toFixed(2)}`, 130, posicionY);
          doc.text(`$${(item.cantidad * item.producto.precio).toFixed(2)}`, 170, posicionY);
          posicionY += 8;
        });

        // Total
        doc.setFont("helvetica", "bold");
        doc.text("Monto Total:", 130, posicionY + 10);
        doc.text(`$${cliente.montoTotal.toFixed(2)}`, 170, posicionY + 10);

        // Generar PDF
        doc.save(`Boleta_${cliente.nombreCliente}.pdf`);
      };
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  return null;
};