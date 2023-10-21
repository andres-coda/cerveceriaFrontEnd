import React, { useState, useEffect } from 'react';
import './Contacto.css';
import Subtitulo from '../subtitulo/Subtitulo';
import Parrafo from '../parrafo/Parrafo';
import Boton from '../boton/Boton';
import { IoBeerOutline } from 'react-icons/io5';
import { useNavigate } from "react-router-dom";

function Contacto() {

  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      errors.firstName = 'Por favor, complete todos los campos';
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
              <img src="src/assets/Logo.png" alt="Logo del Restaurante" />
              <p>Su mensaje ha sido enviado exitosamente.</p>
              <p>En breve responderemos a su consulta.</p>
              <p>Muchas gracias por elegirnos! Grupo Green Beer.<IoBeerOutline className='beer-icon' /></p>
              <Boton btn={{ id: "Salir", clase: "comun", texto: "Salir" }} btnClick={mensaje} />
            </div>
          ) : (
            <>
              <Parrafo clase={"form-p"} texto={'¡Queremos conocerte. Dejanos tu mensaje y responderemos a la brevedad!'} />
              <form onSubmit={handleSubmit} >
                <input
                  id='consulta'
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Nombre"
                  required />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Apellido"
                  required />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Correo electrónico"
                  required />
                <textarea
                  className='textarea'
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Mensaje"
                  required />
                {errors.firstName && <p className="error">{errors.firstName}</p>}

                <Boton btn={{ id: "enviar", clase: "comun", texto: "Enviar" }} btnClick={handleSubmit} />
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