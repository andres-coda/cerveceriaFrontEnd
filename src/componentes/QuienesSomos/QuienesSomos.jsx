import React from 'react'
import FotoQSomos from '../FotoQSomos/FotoQSomos'
import './Qsomos.css'
import Parrafo from '../parrafo/Parrafo'

function QuienesSomos() {
  return (
    <section>
    <div className='portada'><h1><span>¿Quiénes somos?</span></h1></div>
  <div className='container-all'>
    <div className='img-container'>
    <div className='logo'>
    <FotoQSomos  props={'./src/assets/Logo.png'}/> 
    </div>
    <h1>Green Beer, nació en 1969 en una localidad de la provincia de Buenos Aires, cuando tres amigos deciden incursionar en un microemprendimiento sin saber que hoy iban a ser una de las cervezas más elegidas en todo el país</h1>
    <FotoQSomos  props={'https://santafemibarrio.com.ar/wp-content/uploads/2020/11/B-SCHNEIDER_ser-santafesino_05.jpg'}/>
    <FotoQSomos props={'https://birristica.com/wp-content/uploads/2023/04/021-Otto-Rodolfo-en-Recreo-Sch.-60-x-40-cm-1.jpg'} />
    </div>
  </div>
  
          <hr/>
      <div className='container-all'>
        <div className='img-container'>
         <h1>Hoy somos tres generaciones de abuelos, padres e hijos al frente de un negocio en expansión, con 12 sucursales en todo el país.</h1>
        <FotoQSomos  props={'https://www.infoblancosobrenegro.com/wp-content/uploads/2020/09/cerveceria-alemana.jpg'}/>
        <FotoQSomos props={'https://cdn.elmagallanews.cl/sites/elmagallanews.cl/files/imagecache/380x285/imagen_noticia/img_0322.jpg'} />
        </div>
      </div>

      <hr/>
      <div className='container-all'>
        <div className='img-container'>
         <h1>Contamos con seis variedades de cervezas totalmente artesanales</h1>
         <Parrafo texto={'Green Ipa - Green Pale Ale - Green Lambic - Green Lager - Green Bock - Green Dunkel - Green Plisner'}/>
        <FotoQSomos  props={'https://t1.uc.ltmcdn.com/es/posts/4/3/5/tipos_de_cerveza_52534_orig.jpg'}/>
        </div>
      </div>
  
<hr/>
<div className='container-all'>
        <div className='img-container'>
       <h1>Y nuestro orgullo cervecero Sin TACC</h1>
       <Parrafo texto={'Creada para ofrecer a los celíacos una alternativa que conserva el mismo sabor de su cerveza hermana'}/>
        <Parrafo texto={'Encontralas en sus tres sabores: IPa, Lambic y Dunkel'}/>
        <Parrafo texto={'Sus ingredientes incluyen agua, malta de cebada, maíz, levadura y lúpulo, que aportan aromas afrutados y un ligero amargor. Tiene una graduación alcohólica del 5,5%.'} />
        <FotoQSomos  props={'https://www.recetas-sin-gluten.com/base/stock/Post/30-image/30-image_small.jpg.webp'}/>
   </div>
   </div>
        </section>

 
  )
}

export default QuienesSomos;
