import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const items = [
  {
    src: 'https://s7e6w6d2.rocketcdn.me/wp-content/uploads/2013/02/Antares--696x463.jpg',
    altText: 'Green Beer',
    caption: 'Pasión por lo que hacemos desde 1999 ',
    key: 1,
  },
  {
    src: 'https://toledodiario.es/wp-content/uploads/2019/04/Fabrica-cervezas-Sagra_EDIIMA20190416_0721_20.jpg',
    altText: 'Naturalmente Artesanal',
    caption: 'El componente más importante del producto acabado son nuestras manos. Desde que empezamos con la idea de una receta, hasta que llega el producto a los barriles',
    key: 2,
  },
  {
    src: 'https://fotos.perfil.com/2023/02/21/trim/1280/720/cerveza-artesanal-sector-en-riesgo-por-falta-de-lupulo-1513243.jpg',
    altText: 'Slide 3',
    caption: 'Slide 3',
    key: 3,
  },
];

function CarouselImg(args) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} width={"100%"} height={"750px"}/>
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      {...args}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
}

export default CarouselImg;

