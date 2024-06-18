import React, { useState, useContext, useEffect, useRef } from 'react';
import './DondeEstamos.css';
import CardsSucursal from './CardsSucursal';
import { contexto } from '../contexto/contexto';
import Contacto from '../Contacto/Contacto';
import MapL from '../Mapa/MapaLeaflet';

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
        const captions = document.querySelectorAll('.caption');
    
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.animation = 'TitleMove 5s ease forwards';
            } else {
              entry.target.style.animation = 'none'; // Reiniciar la animación al salir del viewport
            }
          });
        }, {
          threshold: 0.1 // Iniciar la animación cuando el 10% del elemento es visible
        });
    
        captions.forEach(caption => observer.observe(caption));
    
        return () => {
          captions.forEach(caption => observer.unobserve(caption));
        };
      }, []);
    
  
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 4000); // Cambia la imagen cada 3 segundos

        return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
    }, []);

    return (
        <>
<div className='conteiner-general'>

           
                <div className="bgimg-1">
                <div className="caption">¡Nos Reinventamos!</div>       
                </div>
                    <div className="section-1">
                <h3>Somos Nosotros...Somos ustedes... </h3>
                <p className='paragrafh-nosotrosSomos'>
                    Porque cada linea de esta web, cada código, cada minuto empleado, cada momento en que la frustración
                    parecía ganar, siempre hubo un motivo para seguir. A pesar del cansancio y de nuestros compromisos,
                    podemos decir que todo valió la pena. Porque tenemos Green esperanza, tenemos Green Beer...🍻
                </p>
            </div>
            <div className="bgimg-2">
                <div className="caption"> ¡Te invitamos a Conocernos! </div>
            </div>
           <div className="section">  
                <div>
                    {datos.sucursales.map(sucursal => (
                        <CardsSucursal key={sucursal.id} sucursal={sucursal} setSucursalPorEditar={setSucursalPorEditar} />
                    ))}
                </div>
            </div>

            <div className="bgimg-3">
                   <div className="caption">Tenemos una aplia variedad gastronómica para todos los paladares </div>
              
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
                    <h3 > Pongámonos en contacto...   </h3>
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