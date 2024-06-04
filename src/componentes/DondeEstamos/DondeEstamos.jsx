import React, { useEffect, useContext } from 'react';
import Subtitulo from '../subtitulo/Subtitulo';
import MapL from '../Mapa/MapaLeaflet.jsx';
import './DondeEstamos.css';
import Parrafo from '../parrafo/Parrafo';
import FotoQSomos from '../FotoQSomos/FotoQSomos';
import CardsSucursal from './CardsSucursal';
import { IoBeerOutline } from 'react-icons/io5';
import { contexto } from '../contexto/contexto';
import { Parallax } from 'react-parallax';

const DondeEstamos = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { datos } = useContext(contexto);

    return (
        <div className='prueba' >
       
                        {datos.sucursales.map(sucursal => (
                            <CardsSucursal key={sucursal.id} sucursal={sucursal} />
                        ))}
      </div>
    );
};

export default DondeEstamos;
