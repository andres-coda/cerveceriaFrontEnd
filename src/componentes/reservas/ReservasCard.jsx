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
    <div className={!reserva.deleted ? "pedido-card" : "pedido-card-eliminado"}>
      <>
        <div className='pedido-encabezado'>
          <p className={`pedido-hora ${reserva.usuario ? '' : 'unavailable'}`}>{reserva.usuario ? reserva.usuario.username : 'Usuario no disponible'}</p>
          <p className='pedido-hora'>Hora de reserva: {formatoHora(reserva.fecha, reserva.hora)}</p>
        </div>
        <div className='pedido-cuerpo'>    
          <div className='reserva-cuerpo'>
            <p>Nombre:  {reserva.usuario ? `${reserva.usuario.name} ${reserva.usuario.lastname}` : 'Nombre no disponible'}</p>
            <p>Mail: {reserva.usuario ? reserva.usuario.email : 'Email no disponible'}</p>
            <p>Personas:  {reserva.cantidad}</p>
          </div>        
        <div className='botonera-admin'>
          <button className='comun'><Link to={`reservas/editar/${reserva.id}`} ><FaEdit /></Link></button>
          <button className='comun' onClick={() => onDelete(reserva.id)}><FaTrash /></button>
        </div>
        </div>
        <p className='pedido-importe'><b>Meza: </b> # {reserva.numeroMesa} </p>
      </>
    </div>
  );
};

export default ReservasCard;
