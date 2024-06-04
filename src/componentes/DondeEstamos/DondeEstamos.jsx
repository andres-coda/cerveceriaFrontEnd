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
            <img src='https://www.lammsbraeu.de/hs-fs/hubfs/mail_images/2023/2023%20-%2008%20-%20B2C%20Bier/Brauereif%C3%BChrung%20nach%20der%20Zwicklprobe.png?width=768&height=396&name=Brauereif%C3%BChrung%20nach%20der%20Zwicklprobe.png'/>
{/*           <Parallax
  bgImage='https://www.lammsbraeu.de/hs-fs/hubfs/mail_images/2023/2023%20-%2008%20-%20B2C%20Bier/Brauereif%C3%BChrung%20nach%20der%20Zwicklprobe.png?width=768&height=396&name=Brauereif%C3%BChrung%20nach%20der%20Zwicklprobe.png'
  strength={100}
  bgImageStyle={{
    width: '100%', // Asegúrate de que el ancho sea el 100% del contenedor
    height: 'auto', // Ajusta la altura automáticamente para mantener la proporción
    backgroundSize: 'cover', // Ajusta el tamaño de la imagen para cubrir completamente el contenedor
    backgroundPosition: 'center' // Centra la imagen en el contenedor
  }}
>
  <div style={{ height: '90vh', width: '100%' }}></div>
</Parallax>

 */}        </div>
    );
};

export default DondeEstamos;
