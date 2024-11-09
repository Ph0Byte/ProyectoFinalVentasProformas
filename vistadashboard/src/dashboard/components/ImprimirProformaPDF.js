// ImprimirProformaPDF.jsx
import React, { useEffect } from 'react';
import { jsPDF } from 'jspdf';
import axios from 'axios';

export const ImprimirProformaPDF = ({ clienteId }) => {
  useEffect(() => {
    if (clienteId) generarPDF();
  }, [clienteId]);

  const generarPDF = async () => {
    console.log("Se ha impreso la proforma del usuario:" + clienteId);
    try {
      const { data: cliente } = await axios.get(`http://localhost:8080/proforma/imprimir/${clienteId}`);

      if (!cliente || !Array.isArray(cliente.itemsProformas)) {
        console.error("Los datos del cliente o itemsProformas no están disponibles o no son un array");
        return;
      }

      const doc = new jsPDF();
      doc.setFont("helvetica", "normal");

      const logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png';
      const image = new Image();
      image.src = logoUrl;

      image.onload = () => {
        doc.addImage(image, 'PNG', 10, 10, 30, 30);

        doc.setFontSize(30);// 16
        doc.text("PROFORMA", 105, 15, { align: 'center' });
        doc.setFontSize(20);// 16
        doc.text("KeaGamer", 105, 22, { align: 'center' });
        doc.setFontSize(10);
        doc.text("Dirección de la Tienda", 105, 28, { align: 'center' });
        doc.text("Teléfono: 123-456-7890", 105, 33, { align: 'center' });

        doc.setFontSize(12);
        doc.text(`Fecha: ${new Date(cliente.fechaProforma).toLocaleDateString()}`, 10, 50);
        doc.text(`Cliente: ${cliente.nombreCliente}`, 10, 56);
        doc.text(`DNI: ${cliente.dni}`, 10, 62);
        doc.text(`Teléfono: ${cliente.telefono}`, 10, 68);

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Item", 10, 80);
        doc.text("Producto", 30, 80);
        doc.text("Cantidad", 100, 80);
        doc.text("Precio Unitario", 130, 80);
        doc.text("Subtotal", 170, 80);

        doc.setFont("helvetica", "normal");

        let posicionY = 88;
        cliente.itemsProformas.forEach((item, index) => {
          doc.text(`${index + 1}`, 10, posicionY);
          doc.text(item.producto.nombre || "", 30, posicionY);
          doc.text(`${item.cantidad || 0}`, 100, posicionY);
          doc.text(`$${(item.producto.precio || 0).toFixed(2)}`, 130, posicionY);
          doc.text(`$${(item.cantidad * (item.producto.precio || 0)).toFixed(2)}`, 170, posicionY);
          posicionY += 8;
        });

        doc.setFont("helvetica", "bold");
        doc.text("Monto Total:", 130, posicionY + 10);
        doc.text(`$${(cliente.montoTotal || 0).toFixed(2)}`, 170, posicionY + 10);

        doc.save(`Boleta_${cliente.nombreCliente}.pdf`);
      };
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  return null;
};
