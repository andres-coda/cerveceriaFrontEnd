import React from 'react';
import './ReservasCard.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ReservasCard = ({ reserva, onDelete }) => {
  const formatoHora = (fecha, hora) => {
    const date = new Date(`${fecha}T${hora}`);
    const opciones = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString('es-ES', opciones);
  };

  return (
    <div className={!reserva.deleted ? "reserva-card" : "reserva-card-eliminado"}>
      <>
        <div className='reserva-encabezado'>
          <p className={`reserva-hora ${reserva.usuario ? '' : 'unavailable'}`}>{reserva.usuario ? reserva.usuario.username : 'Usuario no disponible'}</p>
          <p className={`reserva-hora ${reserva.usuario ? '' : 'unavailable'}`}>{reserva.usuario ? reserva.usuario.email : 'Email no disponible'}</p>
          <p className='reserva-hora'>Hora de reserva: {formatoHora(reserva.fecha, reserva.hora)}</p>
        </div>
        <div className='reserva-cuerpo'>
          <div className='pedido-reserva'>
            <p><b>Nombre:</b> {reserva.usuario ? `${reserva.usuario.name} ${reserva.usuario.lastname}` : 'Nombre no disponible'}</p>
            <p><b>Mesa:</b> {reserva.numeroMesa}</p>
            <p><b>Personas:</b> {reserva.cantidad}</p>
          </div>
        </div>
        <div className='reserva-acciones'>
          <Link to={`reservas/editar/${reserva.id}`} className='btn-editar'><FaEdit /></Link>
          <button className='btn-eliminar' onClick={() => onDelete(reserva.id)}><FaTrash /></button>
        </div>
      </>
    </div>
  );
};

export default ReservasCard;
