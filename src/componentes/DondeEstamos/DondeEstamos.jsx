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

            <div class="parallax-container">
                <div className="bgimg-1">
                    <div className="caption-nosotros">
                        <span className="border">¡Nos reinventamos!</span>
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
                    <span className="border">Tenemos una amplia variedad gastronómica apta para todos los paladares</span>

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
                            <h2>{slides[currentSlide].title}</h2>
                            <p>{slides[currentSlide].description}</p>
                        </div>
                    </div>
                </div>
                <div className='contenedor-h3-contacto'>
                <h3 className="border"> Pongámonos en contacto...   </h3>
                </div>
                <div className='section' >
                    <div className='contenedor-logo-form'>
                        <div className="zoom-container">
                            <img src='./src/assets/Logo.png' alt='logo' className="zoom-image" />
                        </div>
                        <Contacto />
                    </div>
                </div>
                <MapL />
            </div>
        </>
    )
}

export default DondeEstamos;

{/* 
 const contenedorRef = useRef(null);

const scrollLeft = () => {
    contenedorRef.current.scrollBy({ left: -100, behavior: 'smooth' });
};

const scrollRight = () => {
    contenedorRef.current.scrollBy({ top: 100, behavior: 'smooth' });
};

<div className='contenedor-cards-sucursal' ref={contenedorRef}>
 {datos.sucursales.map(sucursal => (
     <CardsSucursal key={sucursal.id} sucursal={sucursal} setSucursalPorEditar={setSucursalPorEditar} />
 ))}
</div>
</div>
<button onClick={scrollLeft} className="scroll-button">
 <FontAwesomeIcon icon={faChevronLeft} />
</button>
<button onClick={scrollRight} className="scroll-button">
 <FontAwesomeIcon icon={faChevronRight} />
</button> */}