import React, { useState } from 'react';
import Parrafo from '../parrafo/Parrafo';
import './SugerenciaCarrusel.css';

const SugerenciaCarrusel = () => {
  const carrusel = [
    {
      img: 'https://s7e6w6d2.rocketcdn.me/wp-content/uploads/2013/02/Antares--696x463.jpg',
      title: 'GREEN BEER',
      text: 'Pasión por lo que hacemos desde 1999'
    },
    {
      img: 'https://thecookandthewine.files.wordpress.com/2019/04/cerveza-artesanal_opt.jpg',
      title: 'El esfuerzo de lo natural',
      text: 'El componente más importante del producto acabado son nuestras manos.'
    },
    {
      img: 'https://soldepiedra.com.ar/wp-content/uploads/2017/11/tomar-cervezas-artesanales-cordoba.jpg',
      title: 'Una variedad, una historia',
      text: 'Historias que unen a tres generaciones'
    }
  ];

  const [actual, setActual] = useState(0);

  const handleArrowClick = (direction) => {
    const newActual = direction === 'right' ? (actual + 1) % carrusel.length : (actual - 1 + carrusel.length) % carrusel.length;
    setActual(newActual);
  };

  return (
    <div className='conteinerGeneral'>
      <div className='carruselConteiner'>
        <p className='flechaDerecha' onClick={() => handleArrowClick('right')}>&gt;</p>
        <p className='flechaIzquierda' onClick={() => handleArrowClick('left')}>&lt;</p>
        <ul style={{ transform: `translateX(-${actual * 100}%)` }}>
          {carrusel.map((dato, indice) => (
            <li className='principal' key={indice}>
              <img src={dato.img} alt={dato.title} />
              <h1>{dato.title}</h1>
              <Parrafo texto={dato.text} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SugerenciaCarrusel;
