import React, { useState, useContext, useEffect } from 'react';
import './DondeEstamos.css';
import CardsSucursal from './CardsSucursal';
import { contexto } from '../contexto/contexto';
import { Parallax } from 'react-parallax';
import Contacto from '../Contacto/Contacto';
import Parrafo from '../parrafo/Parrafo';
import MapL from '../Mapa/MapaLeaflet';
import EditarSucursal from './editarSucursal';

// Array de imágenes
const slides = [
    { image: "https://aderezo.mx/wp-content/uploads/2021/05/IMG_8326.jpg", title: "Variedad de Cervezas y menú Sin TACC", description: "Sin Gluten y con un toque Green" },
    { image: "https://www.institucionalcolombia.com/wp-content/uploads/2023/01/Pizza_vegetariana.jpg", title: "Menú especial para vegetarianos", description: "Queremos que todos disfruten de nuestros locales" },
    { image: "https://assets.elgourmet.com/wp-content/uploads/2023/03/ymr7g8nfi5_portadasandwich-1024x683.jpg.webp", title: "Super Sandwichs", description: "Los mejores sandwich de la casa" },
    { image: "https://fotos.perfil.com/2023/08/04/trim/1280/720/cerveza-artesanal-20230804-1624907.jpg", title: "La mejor cerveza tirada", description: "Rubia, Negra, Roja... Probalas Todas!" },
];

const DondeEstamos = () => {
    const { datos } = useContext(contexto);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [sucursalPorEditar, setSucursalPorEditar] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 4000); // Cambia la imagen cada 3 segundos

        return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
    }, []);

    return (
        <>
            <div >
                <div className="bgimg-1">
                    <div className="caption">
                    </div>
                </div>
            </div>

            <div className="section-1">
                <h3 className="border">
                    Somos Nosotros...Somos ustedes...
                </h3>
                <p className='paragrafh-nosotrosSomos'>
                    Porque cada linea de esta web, cada código, cada minuto empleado, cada momento en que la frustración
                    parecía ganar, siempre hubo un motivo para seguir. A pesar del cansancio y de nuestros compromisos,
                    podemos decir que todo valió la pena. Porque tenemos Green esperanza, tenemos Green Beer...🍻
                </p>
            </div>

            <div className="bgimg-2">
                <div className="caption">
                </div>
            </div>
{/*                 {sucursalPorEditar != null ? <EditarSucursal sucursalPorEditar={sucursalPorEditar} /> : (null)}
 */}            <div className="section">
                <h3 className="border">
                    ¡Te invitamos a Conocernos!
                </h3>

                <div>
                    {datos.sucursales.map(sucursal => (
                        <CardsSucursal key={sucursal.id} sucursal={sucursal} setSucursalPorEditar={setSucursalPorEditar} />
                    ))}
                </div>
            </div>

            <div className="bgimg-3">
                <div className="caption-gastronomia"> 
                <span className="border">Tenemos una amplia variedad gastronómica apta para todos los sentidos</span>

                </div>
            </div>
            <div className="section-2">
                
              <div className='slider-container'>
                        <div className='slider'>
                            <img
                                src={slides[currentSlide].image}
                                alt={slides[currentSlide].title}
                                className='slider-image'
                            />
                            <div className='slider-info'>
                                <h3>{slides[currentSlide].title}</h3>
                                <p>{slides[currentSlide].description}</p>
                            </div>
                        </div>
                    </div>
                            <h3 className="border"> Pongámonos en contacto...   </h3>
                <div className='section'>
                    <img src='./src/assets/Logo.png' alt='logo' />
                    <Contacto />
                </div>
              <MapL />
            </div>
          
           


            {/* <div className='body'>

                <Parallax bgImage='https://www.lammsbraeu.de/hs-fs/hubfs/mail_images/2023/2023%20-%2008%20-%20B2C%20Bier/Brauereif%C3%BChrung%20nach%20der%20Zwicklprobe.png?width=768&height=396&name=Brauereif%C3%BChrung%20nach%20der%20Zwicklprobe.png'
                    strength={100}
                    bgImageStyle={{
                        width: '100%',
                        height: 'auto',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}>
                    <div className='parallax'></div>
                </Parallax>
                <div className='section'>
                    <h3 className='border'>GREEN BEER Estamos donde estés...</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid obcaecati voluptatum accusamus deleniti ipsa expedita sunt tenetur, alias voluptates, aspernatur repudiandae. Alias doloremque sapiente veritatis quos, delectus ipsam harum ullam!</p>
                </div>
                <Parallax bgImage='https://www.zona4arg.com.ar/wp-content/uploads/2021/04/club-de-la-birra-diseno-360-1400x702.jpg'
                    blur={{ min: -20, max: 20 }}
                    bgImageStyle={{
                        width: '100%',
                        height: 'auto',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}>
                    <div className='parallax'></div>
                </Parallax>
                {sucursalPorEditar != null ? <EditarSucursal  sucursalPorEditar={sucursalPorEditar}/>: (null)}

                <div className='section-sucursal'>
                    <h3 className='border'>NUESTRAS SUCURSALES</h3>
                    <Parrafo clase={"sucursales-paragrafh"} texto={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid obcaecati voluptatum accusamus deleniti ipsa expedita sunt tenetur, alias voluptates, aspernatur repudiandae. Alias doloremque sapiente veritatis quos, delectus ipsam harum ullam!'} />
                    <div>
                        {datos.sucursales.map(sucursal => (
                            <CardsSucursal key={sucursal.id} sucursal={sucursal} setSucursalPorEditar={setSucursalPorEditar} />
                        ))}
                    </div>
                </div>
                <div className='section-contacto'>
                    <h3 className='border'>¡PONGÁMONOS EN CONTACTO!</h3>
                </div>
                <Parallax strength={100} blur={{ min: -20, max: 20 }}
                    bgImageStyle={{
                        width: '100%',
                        height: 'auto',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    renderLayer={(percentage) => (
                        <div className="contacto-container">
                            <div className="logo-container">
                                <div className="logo-zoom" style={{
                                    background: `url(./src/assets/Logo.png) no-repeat center/cover`,
                                    width: (percentage * 350),
                                    height: (percentage * 350),
                                }}></div>
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
                        width: '100%',
                        height: 'auto',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}>
                    <div className='parallax'></div>
                </Parallax>
                <div className='section-mapa'>
                    <div className='section-contacto'>
                        <h3 className='border'>¡VENÍ A CONOCERNOS Y A PROBAR NUESTRAS VARIADAS CERVEZAS Y PLATOS!</h3>
                    </div>

                    <div className='slider-container'>
                        <div className='slider'>
                            <img
                                src={slides[currentSlide].image}
                                alt={slides[currentSlide].title}
                                className='slider-image'
                            />
                            <div className='slider-info'>
                                <h3>{slides[currentSlide].title}</h3>
                                <p>{slides[currentSlide].description}</p>
                            </div>
                        </div>
                    </div>
                    <div className='card-map'>
                        <MapL />
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default DondeEstamos;
