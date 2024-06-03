import React from 'react';
import './ModalReservas.css'
import Boton from '../boton/Boton';
import QRCode from 'qrcode.react';

function ModalReservas({ isVisible, onClose, reserva, estado, titulo }) {
  if (!isVisible) return null;

  const qrData = `Reserva exitosa!!\nFecha: ${reserva.fecha}\nHora: ${reserva.hora}\nNombre: ${reserva.nombre} ${reserva.apellido}\nCantidad: ${reserva.cantidad}\nMesa: ${reserva.numeroMesa}`;
    
  return (
    <div className="modal">
      <span className="close" onClick={onClose}>&times;</span>
      <img src="src/assets/Logo.png" alt="Logo del Restaurante" />
      <span className='line-modal'></span>
      <h3>¡¡{titulo}!!</h3>
      <p>Nombre y Apellido: <strong> {reserva.nombre} {reserva.apellido} </strong> </p>
      <p>Fecha: <strong>{reserva.fecha}</strong></p>
      <p>Hora: <strong>{reserva.hora}</strong></p>
      <p>{estado} <strong>{reserva.cantidad}</strong></p>
      <div className="qr-code">
        <QRCode value={qrData} />
      </div>
      <span className='line-modal'></span>
      <p>El Ticket de Reserva se ha enviado al email: <strong>{reserva.email}</strong></p>
      
      {/* <Boton className='close' btn={{ id: 'btn-cerrar', clase: 'cerrar', texto: 'X' }} btnClick={onClose} /> */}

    </div>
  );
}

export default ModalReservas;

