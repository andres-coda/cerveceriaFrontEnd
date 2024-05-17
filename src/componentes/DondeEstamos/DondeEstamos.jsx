import React, { useEffect, useContext } from 'react';
import Subtitulo from '../subtitulo/Subtitulo';
import MapL from '../Mapa/MapaLeaflet.jsx';
import './DondeEstamos.css';
import Parrafo from '../parrafo/Parrafo';
import FotoQSomos from '../FotoQSomos/FotoQSomos';
import CardsSucursal from './CardsSucursal';
import { IoBeerOutline } from 'react-icons/io5';
import { contexto } from '../contexto/contexto.jsx';

function DondeEstamos() {
  useEffect(() => {
    // Scroll a la parte superior de la página cuando el componente se monta
    window.scrollTo(0, 0);
  }, []);

  const { sucursales } = useContext(contexto); // Extraer sucursales del contexto
  console.log('Sucursales:', sucursales); // Verificar el contenido de sucursales

  return (
    <section className='conteinerGeneral'>
      <div className='subtitulo'>
        <Subtitulo clase={"subtitulo-para"} texto={"¿Dónde estamos?"} />
      </div>
      <div className='container-all-map'>
        <div className='texto'>
          <div>
            <FotoQSomos props={'./src/assets/Logo.png'} />
          </div>
          <Parrafo clase={'paragrafh'} texto={'Somos parte de un viaje atravesado por lúpulo, verbo y amigos. Porque creemos que lo mejor que le podemos dar al mundo es nuestra cerveza'} />
          <h2>Contamos con 12 sucursales en la provincia, y nuestro mayor sueño es expandir nuestro negocio al país.</h2>
        </div>
        <div className='div-map-h1'>
          <MapL />
          <h1><IoBeerOutline className='beer' />Nuestra sede cervecera se encuentra en Bernando de Irigoyen 450 Las Flores, pcia. de Buenos Aires</h1>
        </div>
      </div>
      <div className='subtitulo'>
        <Subtitulo clase={"subtitulo-para"} texto={"Nuestras Sucursales"} />
      </div>
      <div className='container-all-cards'>
        {Array.isArray(sucursales) && sucursales.length > 0 ? (
          sucursales.map((sucursal) => (
            <CardsSucursal key={sucursal.id} sucursal={sucursal} />
          ))
        ) : (
          <p>No hay sucursales disponibles.</p>
        )}
      </div>
    </section>
  );
}

export default DondeEstamos;
