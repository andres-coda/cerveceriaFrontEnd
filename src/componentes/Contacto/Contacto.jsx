import React from 'react'
import FotoQSomos from '../FotoQSomos/FotoQSomos'
import './Contacto.css'
import Subtitulo from '../subtitulo/Subtitulo'
import FormularioInput from '../formularioInput/FormularioInput';
import Parrafo from '../parrafo/Parrafo';

function Contacto() {
    return (
      <section className="conteinerGeneral">
        <div className="contenedor">
        <div className='subtitulo'>
            <Subtitulo clase={"titulo"} texto={"Contacto"} />
            </div>
            <div className='form'>
                <Parrafo texto={'¡Queremos conocerte. Dejanos tu mensaje y contestaremos lo más pronto posible!'}/>

            <FormularioInput 
    
             id={"contacto"}
             tipo={"text"}
             texto={""}
             onChan={''}
             value={''}
             />
            
            <textarea className='textarea'>Deje aquí su comentario</textarea>
             </div>
          <div className="imgLupuloContacto">
            <img src="https://rentabilibar.s3-eu-west-1.amazonaws.com/media/lupulo_planta.jpg" alt="Lúpulo" />
          </div>
        </div>
      </section>
    );
  }

export default Contacto