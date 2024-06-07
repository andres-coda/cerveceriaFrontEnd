import React, { useState, useContext, useEffect } from 'react';
import './DondeEstamos.css';
import CardsSucursal from './CardsSucursal';
import { contexto } from '../contexto/contexto';
import { Parallax } from 'react-parallax';
import Contacto from '../Contacto/Contacto'; // Asegúrate de que la ruta es correcta

import SectionMapa from './SectionMapa';
import Parrafo from '../parrafo/Parrafo';
const DondeEstamos = () => {
    const { datos } = useContext(contexto);


    return (
        <>
            <div className='body'>
                <Parallax bgImage='https://www.lammsbraeu.de/hs-fs/hubfs/mail_images/2023/2023%20-%2008%20-%20B2C%20Bier/Brauereif%C3%BChrung%20nach%20der%20Zwicklprobe.png?width=768&height=396&name=Brauereif%C3%BChrung%20nach%20der%20Zwicklprobe.png'
                    strength={100}
                    bgImageStyle={{
                        width: '100%', // Ancho al 100% del contenedor
                        height: 'auto', // Altura automática para mantener la proporción
                        backgroundSize: 'cover', // Ajuste de tamaño para cubrir completamente el contenedor
                        backgroundPosition: 'center', // Posición centrada de la imagen
                    }}>
                    <div className='parallax'  >
                    </div>
                </Parallax>
                <div className='section'>
                    <h3 className='border'>GREEN BEER Estamos donde estés...</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid obcaecati voluptatum accusamus deleniti ipsa expedita sunt tenetur, alias voluptates, aspernatur repudiandae. Alias doloremque sapiente veritatis quos, delectus ipsam harum ullam!</p>
                </div>
                <Parallax bgImage='https://www.zona4arg.com.ar/wp-content/uploads/2021/04/club-de-la-birra-diseno-360-1400x702.jpg'
                    blur={{ min: -20, max: 20 }}
                    bgImageStyle={{
                        width: '100%', // Ancho al 100% del contenedor
                        height: 'auto', // Altura automática para mantener la proporción
                        backgroundSize: 'cover', // Ajuste de tamaño para cubrir completamente el contenedor
                        backgroundPosition: 'center', // Posición centrada de la imagen
                    }}>
                    <div className='parallax' >
                    </div>
                </Parallax>
                <div className='section-sucursal'>
                    <h3 className='border'>NUESTRAS SUCURSALES</h3>
                    <Parrafo clase={"sucursales-paragrafh"} texto={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid obcaecati voluptatum accusamus deleniti ipsa expedita sunt tenetur, alias voluptates, aspernatur repudiandae. Alias doloremque sapiente veritatis quos, delectus ipsam harum ullam!'} />
                    <div>
                        {datos.sucursales.map(sucursal => (
                            <CardsSucursal key={sucursal.id} sucursal={sucursal} />
                        ))}
                    </div>
                </div>
                <div className='section-contacto'>
                    <h3 className='border'>¡PONGÁMONOS EN CONTACTO!</h3>
                </div>
                <Parallax strength={100}   blur={{ min: -20, max: 20 }}
                    bgImageStyle={{
                        width: '100%', 
                        height: 'auto', 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center', 
                    }} 
                    renderLayer={(percentage) => (
                        <div className="contacto-container">
                            <div>

                            <div className="logo-container">
                                <div className="logo-zoom" style={{
                                    background: `url(./src/assets/Logo.png) no-repeat center/cover`,
                                    width: percentage * 300,
                                    height: percentage * 300,
                                }}></div>
                            </div>
                                </div>
                            
                                <Contacto />
                            
                        </div>
                    )}>
                </Parallax>

                <Parallax
                    bgImage='https://cloudfront-us-east-1.images.arcpublishing.com/metroworldnews/7ZR6ZD2FRRC67ARSX2XWL7C5IQ.jpg'
                    strength={150}
                    blur={{ min: -20, max: 20 }}
                    bgImageStyle={{
                        width: '100%', // Ancho al 100% del contenedor
                        height: 'auto', // Altura automática para mantener la proporción
                        backgroundSize: 'cover', // Ajuste de tamaño para cubrir completamente el contenedor
                        backgroundPosition: 'center', // Posición centrada de la imagen
                    }}

                >
                    <div className='parallax'></div>
                </Parallax>
                <div className='section-mapa'>
                    <h3 className='border'>¡VENÍ A CONCOCERNOS!</h3>
                    <div className='card-map'>
                        <SectionMapa />
                    </div>
                </div>


            </div>

        </>
    );
};

export default DondeEstamos;
