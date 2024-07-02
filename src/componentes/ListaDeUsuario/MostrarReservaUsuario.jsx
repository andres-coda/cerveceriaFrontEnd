import React, { useState, useEffect, useContext } from 'react';
import Subtitulo from '../subtitulo/Subtitulo';
import AnimatedSVG from '../animacion/AnimatedSVG';
import '../reservas/ReservasCard.css';
import ReservasCard from '../reservas/ReservasCard';
import { contexto } from '../contexto/contexto';

const ReservasRealizadas = ({ reload }) => {
  const {datos} = useContext(contexto);
  const [reservas, setReservas] = useState(datos.pedidosUsuarioActual.reservas);

  return (
    <div className='conteinerGeneral'>
    <div className='wrapper-realizadas'>
      <Subtitulo clase={"subtitulo"} texto={`Reservas de ${datos.pedidosUsuarioActual.username}`} />
      <p className='pedido-cantidad'>{`${reservas.length} Reservas recibidas`}</p>
      {reservas !== null && reservas.length > 0 ? (
        reservas.map((reserva, index) => (
          <ReservasCard key={index} reserva={reserva} reload={reload} fieldsToShow={['hora', 'fecha-encabezado', 'personas', 'edit', 'delete', 'mesa']}/>
        ))
      ) : (
        <AnimatedSVG />
      )}
    </div>
    </div>
  );
};

export default ReservasRealizadas;
