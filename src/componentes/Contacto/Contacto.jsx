import React, { useState } from 'react';
import './Contacto.css';
import Subtitulo from '../subtitulo/Subtitulo';
import Parrafo from '../parrafo/Parrafo';
import Boton from '../boton/Boton';
import {IoBeerOutline} from 'react-icons/io5';
import { useNavigate } from "react-router-dom";

function Contacto() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [mensajeEnviado, setMensajeEnviado] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName) {
      errors.firstName = 'Por favor, ingrese su nombre';
    }

    if (!formData.lastName) {
      errors.lastName = 'Por favor, ingrese su apellido';
    }

    if (!formData.email) {
      errors.email = 'Por favor, ingrese su correo electrónico';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'El correo electrónico no es válido';
    }

    if (!formData.message) {
      errors.message = 'Por favor, ingrese su mensaje';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setMensajeEnviado(true);
      console.log(formData);
    }
  };

  const mensaje = (e) => {
    e.preventDefault();
    navigate("/");
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
              <form onSubmit={handleSubmit}>
                <input
                  id='consulta'
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Nombre"
                  required />
                {errors.firstName && <p className="error">{errors.firstName}</p>}
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Apellido"
                  required />
                {errors.lastName && <p className="error">{errors.lastName}</p>}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Correo electrónico"
                  required />
                {errors.email && <p className="error">{errors.email}</p>}
                <textarea
                  className='textarea'
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Mensaje"
                  required />
                {errors.message && <p className="error">{errors.message}</p>}
                <Boton btn={{ id: "enviar", clase: "comun", texto: "Enviar" }} btnClick={handleSubmit}/>
              </form>
            </>
          )}
        </div>
        <div className="imgLupuloContacto">
          <img src="https://rentabilibar.s3-eu-west-1.amazonaws.com/media/lupulo_planta.jpg" alt="Lúpulo" />
        </div>
      </div>
    </section>
  );
}

export default Contacto;