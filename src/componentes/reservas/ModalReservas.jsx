import React from 'react';
import './ModalReservas.css'
import Boton from '../boton/Boton';

function ModalReservas({ isVisible, onClose, reserva, claveReserva, estado, titulo }) {
  if (!isVisible) return null;

  return (
    <div className="modal">

      <img src="src/assets/Logo.png" alt="Logo del Restaurante" />
      <span className='line-modal'></span>
      <h3>¡¡{titulo}!!</h3>
      <p>Nombre y Apellido: <strong> {reserva.nombre} {reserva.apellido} </strong> </p>
      <p>Fecha: <strong>{reserva.fecha}</strong></p>
      <p>Hora: <strong>{reserva.hora}</strong></p>
      <p>{estado} <strong>{reserva.personas}</strong></p>
      <p>Clave de Reserva: <strong>{claveReserva}</strong></p>
      <span className='line-modal'></span>
      <p>El Ticket de Reserva se ha enviado al email: <strong>{reserva.email}</strong></p>
     
      <Boton btn={{ id: 'btn-cerrar', clase: 'cerrar button-reservas', texto: 'X' }} btnClick={onClose} />

    </div>
  );
}

export default ModalReservas;

