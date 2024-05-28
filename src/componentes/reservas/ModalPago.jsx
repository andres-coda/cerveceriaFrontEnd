import React, { useState } from 'react';
import './ModalPago.css';

const ModalPago = ({ isVisible, onClose, metodoPago, onSubmitPago }) => {
  const [formData, setFormData] = useState({
    numeroTarjeta: '',
    nombreTitular: '',
    fechaVencimiento: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitPago(formData);
  };

  if (!isVisible) return null;

  return (
    <div className="modal">
      <span className="close" onClick={onClose}>&times;</span>
      <h3>Pagar con {metodoPago}</h3>
      <div className="line-modal"></div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="numeroTarjeta">Número de Tarjeta</label>
          <input type="text" id="numeroTarjeta" name="numeroTarjeta" value={formData.numeroTarjeta} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="nombreTitular">Nombre del Titular</label>
          <input type="text" id="nombreTitular" name="nombreTitular" value={formData.nombreTitular} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="fechaVencimiento">Fecha de Vencimiento</label>
          <input type="text" id="fechaVencimiento" name="fechaVencimiento" value={formData.fechaVencimiento} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} required />
        </div>
        <button type="submit">Realizar Pago</button>
      </form>
    </div>
  );
};

export default ModalPago;
