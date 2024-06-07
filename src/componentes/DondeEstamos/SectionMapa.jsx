import React, { useState, useEffect } from 'react';
import MapL from '../Mapa/MapaLeaflet';
import './SectionMapa.css'
import { URL_SUCURSAL } from '../../endPoints/endPoints';
import CardsSucursal from './CardsSucursal';
import { fetchGet } from '../funciones fetch/funciones';

const SectionMapa = ({ sucursalId }) => {
  const [sucursal, setSucursal] = useState(null);

  useEffect(() => {
    // Función para obtener los datos de la sucursal específica
    const fetchSucursal = async () => {
      try {
        const response = await fetchGet(`${URL_SUCURSAL}/${14}`); // Reemplaza con la URL de tu API
        const data = await response.json();
        setSucursal(data);
      } catch (error) {
        console.error('Error al obtener la información de la sucursal:', error);
      }
    };

    fetchSucursal();
  }, [sucursalId]);

  return (
   
    
      <div className='contenedor-mapa-card'>
        <div className='card-sucursal'>
          {sucursal ? (
            <>
             <div className='card-content'>
             <img className='card-img' src={sucursal.imagen} alt={sucursal.nombre} />
                <h4>{sucursal.nombre}</h4>
                <p>{sucursal.direccion}</p>
                <p>Teléfono: {sucursal.telefono}</p>
                <p>Email: {sucursal.email}</p>
                <p>Whatsapp: {sucursal.instagram}</p>
              </div>
            </>
          ) : (
           null
          )}
        </div>
   
       {/*    <MapL />   */}
      
      </div>
   
  );
};

export default SectionMapa;
