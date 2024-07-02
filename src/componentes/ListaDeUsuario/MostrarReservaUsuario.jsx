import React, { useState, useEffect, useContext } from 'react';
import Subtitulo from '../subtitulo/Subtitulo';
import AnimatedSVG from '../animacion/AnimatedSVG';
import '../reservas/ReservasCard.css';
import ReservasCard from '../reservas/ReservasCard';
import { contexto } from '../contexto/contexto';
import { fetchGet } from '../funciones fetch/funciones';
import { URL_USUARIO } from '../../endPoints/endPoints';

const ReservasRealizadas = () => {
  const {datos} = useContext(contexto);
  const [reservas, setReservas] = useState(datos.pedidosUsuarioActual.reservas);
  const reload = async () => {
    try {
      const usuarioReload = await fetchGet(URL_USUARIO+'/'+datos.pedidosUsuarioActual.id, localStorage.getItem('token'));      
      if (usuarioReload) {
        setReservas(usuarioReload.reservas);
        return true
      }
    } catch (error) {
      console.log(error);
      return false
    }
  }
  return (
    <div className='conteinerGeneral'>
    <div className='wrapper-realizadas'>
      <Subtitulo clase={"subtitulo"} texto={`Reservas de ${datos.pedidosUsuarioActual.username}`} />
      <p className='pedido-cantidad'>{`${reservas.length} Reservas recibidas`}</p>
      {reservas !== null && reservas.length > 0 ? (
        reservas.map((reserva, index) => (
          <ReservasCard 
            key={index} 
            reserva={reserva} 
            reload={reload} 
            fieldsToShow={['hora', 'fecha-encabezado', 'personas', 'edit', 'delete', 'mesa']}
          />
        ))
      ) : (
        <AnimatedSVG />
      )}
    </div>
    </div>
  );
};

export default ReservasRealizadas;
