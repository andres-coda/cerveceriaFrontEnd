import React, { useState, useContext, useEffect, useRef } from 'react';
import './DondeEstamos.css';
import CardsSucursal from './CardsSucursal';
import { contexto } from '../contexto/contexto';
import Contacto from '../Contacto/Contacto';
import MapL from '../Mapa/MapaLeaflet';
import Subtitulo from '../subtitulo/Subtitulo';
import Parrafo from '../parrafo/Parrafo';
import logo from "../../assets/Logo.png";

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
          threshold: 0.5 // Iniciar la animación cuando el 10% del elemento es visible
        });
    
        captions.forEach(caption => observer.observe(caption));
    
        return () => {
          captions.forEach(caption => observer.unobserve(caption));
        };
      }, []);
    
      useEffect(() => {
        const zoomContainer= document.querySelectorAll('.zoom-container');
    
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.animation = 'zoomInOut 5s ease forwards';
            } else {   
              entry.target.style.animation = 'none'; // Reiniciar la animación al salir del viewport
            }
          });
        }, {
rootMargin:'40%'
        });
    
        zoomContainer.forEach(zoomContainer => observer.observe(zoomContainer));
    
        return () => {
            zoomContainer.forEach(zoomContainer => observer.unobserve(zoomContainer));
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
<div className='conteiner-General'>      
                <div className="bgimg-1">
                <div className="caption">¡Nos Reinventamos!</div>       
                </div>
                    <div className="section-1">
                        <Subtitulo  texto={'Somos Nosotros...Somos ustedes... '}/>
                        <Parrafo clase={'paragrafh-nosotrosSomos'}
                        texto={'Hace dos décadas Green nació de la mano de nuestros padres.Hoy seguimos reinventando esta pasión que une a tres familias.Tenemos todo lo que precisas y sobre todo tenemos Green esperanza, tenemos Green Beer...'}/>
                       <Parrafo clase={'paragrafh-nosotrosSomos'}
                        texto={'Desde 1943 se encuentra en el barrio de Villa Ortúzar. Su ambiente es familiar, de bodegón, con un énfasis en las cervezas de barril, que vienen en distintas medidas (imperial, balón, florero, jarra, avión) y con reconocidas y abundantes picadas. También cuenta con platos a la carta como las rabas o la ensalada de calamares, además de carnes a la parrilla, pastas, y cocina típica porteña que se mantiene a través de los tiempos'}/>

            </div>
            <div className="bgimg-2">
                <div className="caption-2"> ¡Te invitamos a Conocernos! </div>
            </div>
           <div className="section">  
                <>
                    {datos.sucursales.map(sucursal => (
                        <CardsSucursal key={sucursal.id} sucursal={sucursal} setSucursalPorEditar={setSucursalPorEditar} />
                    ))}
                </>
            </div>

            <div className="bgimg-3">
                   <div className="caption-3">Tenemos una amplia variedad gastronómica para todos los paladares.
                   </div>
              
            </div>
            <div className="section-2">

                <div className='slider-container'>
                  
                        <img
                            src={slides[currentSlide].image}
                            alt={slides[currentSlide].title}
                            className='slider-image'
                            />
                  
                        <div className='slider-info'>
                            <h2>{slides[currentSlide].title}</h2>
                            <Parrafo texto={slides[currentSlide].description}/>
                             </div>
                </div>
              
                <div className='contenedor-h3-contacto'>
                    <Subtitulo className={'subtitulo-contacto'} texto={'Pongámonos en contacto... '}/>
                 </div>
                    <div className='section' >
                    <div className='contenedor-logo-form'>
                        <div className="zoom-container">
                            <img src={logo} alt='logo' className="zoom-image" />
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



