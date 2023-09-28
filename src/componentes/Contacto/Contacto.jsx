import React, { useState } from 'react';
import './Contacto.css';
import Subtitulo from '../subtitulo/Subtitulo';
import Parrafo from '../parrafo/Parrafo';
import FormularioInput from '../formularioInput/FormularioInput'
import Boton from '../boton/Boton';
import {IoBeerOutline} from 'react-icons/io5';
import { useNavigate } from "react-router-dom";


function Contacto() {
  const navegate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    message: '',
  });

  const [mensajeEnviado, setMensajeEnviado] = useState(false);

  const onChan = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.name);
    console.log(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setMensajeEnviado(true);
    console.log(formData);
  };
  const mensaje = (e) => {
    e.preventDefault();
    navegate("/");
  }

  return (
    <section className="conteinerGeneral">
      <div className="contenedor">
        <div className='subtitulo'>
          <Subtitulo clase={"titulo"} texto={"Contacto"} />
        </div>
        <div className='container-form'>
          {mensajeEnviado ? (
              <div className='mensaje-Enviado'>
              <p>Su mensaje ha sido enviado exitosamente.</p>
              <p>En breve responderemos a su consulta.</p>
              <p>Muchas gracias por elegirnos! Grupo Green Beer.<IoBeerOutline className='beer-icon' /></p>
              <Boton btn={{ id: "Salir", clase: "comun", texto: "Salir" }} btnClick={mensaje} />

            </div>
          ) : (
            <>
            <Parrafo clase={"form-p"} texto={'¡Queremos conocerte. Dejanos tu mensaje y responderemos a la brevedad!'} />
                <FormularioInput id={`email`}
                 tipo={`email`} texto={"email"} onChan={onChan} />

                <textarea
                 className='textarea'
                name="message"
                value={formData.message}
                onChange={onChan} 
                placeholder="Deje aquí su comentario"
                required
                />
              <Boton btn={{ id: "enviar", clase: "comun", texto: "Enviar" }} btnClick={handleSubmit} />
                </>
          
          )}
        </div>
        <div className="imgLupuloContacto"> {/*componente fotoQSomos no funciona con la img*/}
          
            <img src="https://rentabilibar.s3-eu-west-1.amazonaws.com/media/lupulo_planta.jpg" alt="Lúpulo" />
        </div>
      </div>
    </section>
  );
}

export default Contacto;
