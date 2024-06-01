import React, { useEffect, useContext } from 'react';
import MapL from '../Mapa/MapaLeaflet.jsx';
import './DondeEstamos.css';
import CardsSucursal from './CardsSucursal';
import { contexto } from '../contexto/contexto';
import { Parallax } from 'react-parallax';
import Boton from '../boton/Boton.jsx';

const DondeEstamos = () => {
    const { datos } = useContext(contexto);

    return (
        <>
            <div className='body'>
                <Parallax 
                    bgImage='https://www.lammsbraeu.de/hs-fs/hubfs/mail_images/2023/2023%20-%2008%20-%20B2C%20Bier/Brauereif%C3%BChrung%20nach%20der%20Zwicklprobe.png?width=768&height=396&name=Brauereif%C3%BChrung%20nach%20der%20Zwicklprobe.png'
                    strength={80}>
                    <div style={{ height: "90vh", width: "100vw", marginTop: "0" }} />
                </Parallax>
                <div className='section'>
                    <h3 className='border'>GREEN BEER Estamos donde estés...</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid obcaecati voluptatum accusamus deleniti ipsa expedita sunt tenetur, alias voluptates, aspernatur repudiandae. Alias doloremque sapiente veritatis quos, delectus ipsam harum ullam!</p>
                </div>
                <Parallax 
                    bgImage='https://www.zona4arg.com.ar/wp-content/uploads/2021/04/club-de-la-birra-diseno-360-1400x702.jpg'
                    blur={{ min: -5, max: 5 }}>
                    <div style={{ height: "60vh", width: "100vw", marginTop: "0" }} />
                </Parallax>
                <div className='section-sucursal'>
                    <h3 className='border'>NUESTRAS SUCURSALES</h3>
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
                    renderLayer={(percentage) => {
                        const size = percentage * 350;
                        return (
                            <div className="contact-container">
                                <div className="logo-zoom" style={{
                                    position: "relative",
                                    background: `url(./src/assets/Logo.png) no-repeat center/cover`,
                                    borderRadius: "50%",
                                    width: size,
                                    height: size,
                                }} />
                    
                                <div className="form-container">
                                    
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="name">Nombre</label>
                                            <input type="text" id="name" name="name" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Correo Electrónico</label>
                                            <input type="email" id="email" name="email" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="message">Mensaje</label>
                                            <textarea id="message" name="message" required></textarea>
                                        </div>
                                        <Boton btn={{ id: "editar", clase: "comun", texto: "Guardar" }}  />

                                        
                                    </form>
                                </div>
                            </div>
                        );
                    }}>
                  
                </Parallax>
                <Parallax 
                    bgImage='https://img.freepik.com/fotos-premium/mejores-hamburguesas-happy-hour-cerveza-fria-mesa-madera-restaurante-lechuga-verde_482257-19720.jpg'
                    strength={80}>
                    <div style={{ height: "90vh", width: "60vw",objectFit:"cover", marginTop: "0" }} />
                </Parallax>
                <div className='section'>
                    <h3 className='border'>VENÍ A CONOCERNOS!</h3>
                    <p>Contamos con variedades de platos rápidos preparados por un chef. Somos vanguardia en elaborar las 
                        hamburguesas más originales para los paladares más exigentes. También contamos con un menú apto celíacos y otro apto vegetarianos
                    </p>
                </div>
                <MapL />
            </div>
        </>
    );
};

export default DondeEstamos;
