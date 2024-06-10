import React from 'react';
import './ReservasCard.css';

const ReservasCard = ({ reserva, onClick, onDelete, onEdit }) => {
    const formatoHora = (fecha, hora) => {
        const date = new Date(`${fecha}T${hora}`);
        const opciones = { hour: '2-digit', minute: '2-digit'};
        return date.toLocaleTimeString('es-ES', opciones);
      };    
    
      return (
        <div className={!reserva.deleted ? "reserva-card" : "reserva-card-eliminado"} onClick={onClick} id={reserva.id}>
          {reserva.usuario ? (
            <>
              <div className='reserva-encabezado'>
                <p className='reserva-hora'>{reserva.usuario.username}</p>
                {/* <p className='reserva-hora'>Email: {reserva.usuario.email}</p> */}
                <p className='reserva-hora'>Hora de reserva: {formatoHora(reserva.fecha, reserva.hora)}</p>
              </div>
              <div className='reserva-cuerpo'>                
                  <div className='pedido-reserva'>
                <p><b>Nombre:</b> {reserva.usuario.name} {reserva.usuario.lastname}</p> 
                <p><b>Email:</b> {reserva.usuario.email}</p>               
                <p><b>Mesa:</b> {reserva.numeroMesa}</p>
                <p><b>Personas:</b> {reserva.cantidad}</p>
                  </div>
                </div>              
              <div className='reserva-acciones'>
                <button className='btn-eliminar' onClick={(e) => { e.stopPropagation(); onDelete(reserva.id); }}>Eliminar</button>
                <button className='btn-editar' onClick={(e) => { e.stopPropagation(); onEdit(reserva.id); }}>Editar</button>
              </div>
            </>
          ) : (
            <div className='reserva-error'>
              <p>Error: Información de usuario no disponible para esta reserva.</p>
            </div>
          )}
        </div>
      );
    };
    

export default ReservasCard;
