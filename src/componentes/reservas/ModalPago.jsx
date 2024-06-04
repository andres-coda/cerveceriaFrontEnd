import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import './ModalPago.css';
import InputMask from 'react-input-mask';
import Boton from '../boton/Boton';
import { FaTimes } from 'react-icons/fa';

const ModalPago = ({ isVisible, onClose, metodoPago, onSubmitPago }) => {
  const [formData, setFormData] = useState({
    numeroTarjeta: '',
    nombreTitular: '',
    fechaVencimiento: '',
    cvv: '',
  });

  const [focused, setFocused] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitPago(formData);
  };

  const handleInputFocus = (e) => {
    setFocused(e.target.name);
  };

  if (!isVisible) return null;

  return (
    <div className="modalPago">
      <Boton btn={{id:"cerrar", clase: "cerrar", texto: <FaTimes />}} btnClick={onClose} />
      {//<span className="close" onClick={onClose}>&times;</span>
      }
      <h3>Pagar con {metodoPago}</h3>
      <div className="line-modal-pago"></div>
      <div className="modal-content">
        <div className="card-preview">
          <Cards
            cvc={formData.cvv}
            expiry={formData.fechaVencimiento}
            focused={focused}
            name={formData.nombreTitular}
            number={formData.numeroTarjeta}
          />
        </div>
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-group">
            <label htmlFor="numeroTarjeta">Número de Tarjeta</label>
            <InputMask
              mask="9999 9999 9999 9999"
              type="text"
              id="numeroTarjeta"
              name="numeroTarjeta"
              value={formData.numeroTarjeta}
              onChange={handleChange}
              onFocus={handleInputFocus}
              required
              />
          </div>
          <div className="form-group">
            <label htmlFor="nombreTitular">Nombre del Titular</label>
            <input
              type="text"
              id="nombreTitular"
              name="nombreTitular"
              value={formData.nombreTitular}
              onChange={handleChange}
              onFocus={handleInputFocus}
              required              
            />
          </div>
          <div className="form-group">
            <label htmlFor="fechaVencimiento">Fecha de Vencimiento</label>
            <InputMask
              mask="99/99"
              type="text"
              id="fechaVencimiento"
              name="fechaVencimiento"
              value={formData.fechaVencimiento}
              onChange={handleChange}
              onFocus={handleInputFocus}
              required
              
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <InputMask
              mask="999"
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              onFocus={handleInputFocus}
              required              
            />
          </div>
          <button className='comun' type="submit">Realizar Pago</button>
        </form>
      </div>
    </div>
  );
};

export default ModalPago;
