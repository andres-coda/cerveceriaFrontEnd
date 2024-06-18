import React from 'react'
import Slider from '../CarouselDeImagenes/Carousel2'
import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    // Scroll a la parte superior de la página cuando el componente se monta
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='conteinerGeneral'>
      <Slider />
    </div>
  )
}

export default Home;
