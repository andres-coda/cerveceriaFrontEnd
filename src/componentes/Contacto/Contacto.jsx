import React, { useState, useEffect } from 'react';
import './Contacto.css';
import Subtitulo from '../subtitulo/Subtitulo';
import Parrafo from '../parrafo/Parrafo';
import Boton from '../boton/Boton';
import { IoBeerOutline } from 'react-icons/io5';
import { useNavigate } from "react-router-dom";
import FormularioInput from '../formularioInput/FormularioInput';

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
  const [errors, setErrors] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'message'];
    let errorMessage = '';
  
    requiredFields.forEach(field => {
      if (!formData[field]) {
        errorMessage = 'Por favor, complete todos los campos.';
      }
    });
  
    setErrors(errorMessage);
    return errorMessage === '';
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setMensajeEnviado(true);
      console.log(formData);
    } else {
    
      return 'por favor complete todos los campos'
    }
  };

  const mensaje = (e) => {
    e.preventDefault();
    navigate("/");
  }

  return (
       
            <div className='container-form'>
          {mensajeEnviado ? (
            <div className='mensaje-Enviado'>
              <img src="src/assets/Logo.png" alt="Logo del Restaurante" />
              <p>Su mensaje ha sido enviado exitosamente.</p>
              <p>En breve responderemos a su consulta.</p>
              <p>Muchas gracias por elegirnos! Grupo Green Beer.<IoBeerOutline className='beer-icon' /></p>
              <Boton btn={{ id: "Salir", clase: "comunContacto", texto: "Salir" }} btnClick={mensaje} />
            </div>
          ) : (
            <>
             
              <form onSubmit={handleSubmit} className='form-contacto' >
{/*               <FormularioInput id={"nombre"} value={formData.firstName} tipo={"text"} texto={"Nombre"} onChan={handleChange} />
              <FormularioInput id={"apellido"} value={formData.lastName} tipo={"text"} texto={"lastName"} onChan={handleChange} />
              <FormularioInput id={"email"} value={formData.email} tipo={"text"} texto={"email"} onChan={handleChange} />
 */}         
 <label>Nombre</label>
              <input value={formData.firstName} type='text' placeholder='Nombre' className='nombre'/>
              <label>Email</label>
              <input value={formData.email} type='text' placeholder='Email' className='email'/>
              <label>Mensaje</label>
                <textarea
                  className='textarea'
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Mensaje"
                  required />
                 <p className="error">{errors}</p>
                 <Boton btn={{ id: "enviar", clase: "comunContacto", texto: "Enviar" }} btnClick={handleSubmit} />

              </form>
            </>
          )}
        </div>
       

  );
}

export default Contacto;