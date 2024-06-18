import React, { useState, useEffect } from 'react';
import { getUserDetails } from './actions/getUserDetails';
import { useAuth } from '../auth/AuthContext';
import Subtitulo from '../subtitulo/Subtitulo';
import AnimatedSVG from '../animacion/AnimatedSVG';
import './ReservasCard.css';
import ReservasCard from './ReservasCard';
import { Reserva } from './actions/typeReserva';

const ReservasRealizadas = ({ reload }) => {
  const { auth } = useAuth();
  const { user, token } = auth || {};
  const userId = user?.sub;
  const [reservas, setReservas] = useState<Reserva[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const userDetails = await getUserDetails(userId, token);
      if (userDetails && userDetails.reservas) {
        setReservas(userDetails.reservas);
      }
    };

    fetchData();
  }, [userId, token]);

  return (
    <div className='conteinerGeneral'>
    <div className='wrapper-realizadas'>
      <Subtitulo clase={"subtitulo"} texto={`Mis Reservas`} />
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
