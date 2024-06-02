import React, { useState, useContext, useEffect } from 'react';
import './DondeEstamos.css';
import CardsSucursal from './CardsSucursal';
import { contexto } from '../contexto/contexto';
import { Parallax } from 'react-parallax';
import Contacto from '../Contacto/Contacto'; // Asegúrate de que la ruta es correcta

const DondeEstamos = () => {
    const { datos } = useContext(contexto);

    return (
        <>
            <div className='body'>
                <Parallax bgImage='https://www.lammsbraeu.de/hs-fs/hubfs/mail_images/2023/2023%20-%2008%20-%20B2C%20Bier/Brauereif%C3%BChrung%20nach%20der%20Zwicklprobe.png?width=768&height=396&name=Brauereif%C3%BChrung%20nach%20der%20Zwicklprobe.png'
                    strength={80}>
                    <div style={{ height: "90vh", width: "100vw", marginTop: "0" }} >
                    </div>
                </Parallax>
                <div className='section'>
                    <h3 className='border'>GREEN BEER Estamos donde estés...</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid obcaecati voluptatum accusamus deleniti ipsa expedita sunt tenetur, alias voluptates, aspernatur repudiandae. Alias doloremque sapiente veritatis quos, delectus ipsam harum ullam!</p>
                </div>
                <Parallax bgImage='https://www.zona4arg.com.ar/wp-content/uploads/2021/04/club-de-la-birra-diseno-360-1400x702.jpg'
                    blur={{ min: -5, max: 5 }}>
                    <div style={{ height: "60vh", width: "100vw", marginTop: "0" }}>
                    </div>
                </Parallax>
                <div className='section-sucursal'>
                    <h3 className='border'>Nuestras Sucursales</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid obcaecati voluptatum accusamus deleniti ipsa expedita sunt tenetur, alias voluptates, aspernatur repudiandae. Alias doloremque sapiente veritatis quos, delectus ipsam harum ullam!</p>
                    <div>
                        {datos.sucursales.map(sucursal => (
                            <CardsSucursal key={sucursal.id} sucursal={sucursal} />
                        ))}
                    </div>
                </div>
                    <div className='section-contacto'>
                    <h3 className='border'>¡PONGÁMONOS EN CONTACTO!</h3>
                </div>
                    <Parallax strength={100}
                        renderLayer={(percentage) => (
                            <div className="contacto-container">
                                <div className="logo-zoom" style={{
                                    background: `url(./src/assets/Logo.png) no-repeat center/cover`,
                                    width: percentage * 350,
                                    height: percentage * 350,
                                }}></div>
                                <div>
                                    <div >
                                <Contacto  />

                                    </div>

                                </div>
                            </div>
                        )}>
                    
                        
                    </Parallax>
                </div>
            
        </>
    );
};

export default DondeEstamos;
