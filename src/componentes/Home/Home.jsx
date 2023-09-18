import React from 'react'
import CarouselImg from '../Carousel/Carousel';
import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    // Scroll a la parte superior de la página cuando el componente se monta
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='conteinerGeneral'>
        <CarouselImg/>
  
    </div>
  )
}

export default Home;
