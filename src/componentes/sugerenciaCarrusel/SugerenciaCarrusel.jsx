import { useState } from 'react';
import Parrafo from '../parrafo/Parrafo';
import './SugerenciaCarrusel.css'

function SugerenciaCarrusel(){
    const carrusel = [
        {
            img: 'https://s7e6w6d2.rocketcdn.me/wp-content/uploads/2013/02/Antares--696x463.jpg',
            title: 'GREEN BEER',
            text: 'Pasión por lo que hacemos desde 1999' 
          },
          {
            img: 'https://thecookandthewine.files.wordpress.com/2019/04/cerveza-artesanal_opt.jpg',
            title: 'El esfuerzo de lo natural',
            text: 'El componente más importante del producto acabado son nuestras manos. ' 
          },
          {
            img: 'https://soldepiedra.com.ar/wp-content/uploads/2017/11/tomar-cervezas-artesanales-cordoba.jpg',
            title: 'Una variedad, una historia',
            text: 'Historias que unen a tres generaciones' 
          }
    ]
    const [actual, setActual] = useState(0);
    const flechaClick = (e) => {
        const btn = e.target.className;
        const image = document.querySelector(".imgPrincipal");
      
        let newTranslateX = 0;
      
        if (btn === "flechaDerecha") {
          if (actual < carrusel.length - 1) {
            newTranslateX = -100 * (actual + 1);
            setActual(actual + 1);
          } else {
            newTranslateX = 0;
            setActual(0);
          }
        } else {
          if (actual === 0) {
            newTranslateX = -100 * (carrusel.length - 1);
            setActual(carrusel.length - 1);
          } else {
            newTranslateX = -100 * (actual - 1);
            setActual(actual - 1);
          }
        }
        image.style.transform = `translateX(${newTranslateX}%)`;
      };
      
    
    return (
        <div className='conteinerGeneral'>
            <div className='carruselConteiner'>
                <img className='imgPrincipal' src={carrusel[actual].img} alt={carrusel[actual].title} />
                <p className='flechaDerecha' onClick={flechaClick}>&gt;</p>
                <p className='flechaIzauierda' onClick={flechaClick}>&lt;</p>
                <h1>{carrusel[actual].title}</h1>
                <Parrafo texto={carrusel[actual].text}/>
            </div>
        </div>
    );
};

export default SugerenciaCarrusel;