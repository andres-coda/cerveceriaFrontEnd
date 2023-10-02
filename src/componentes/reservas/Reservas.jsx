import React, { useState, useEffect, useRef } from 'react';
import './Reservas.css';
import FormularioInput from '../formularioInput/FormularioInput';
import '../boton/Boton.css';
import ModalReservas from './ModalReservas';

const Reservas = () => {
  const initialState = {
    fecha: '',
    hora: '',
    personas: '',
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
  };

  const [formulario, setFormulario] = useState(initialState);
  const [modalVisible, setModalVisible] = useState(false);
  const [claveReserva, setClaveReserva] = useState('');
  const [formularioKey, setFormularioKey] = useState(0);
  const [camposCompletos, setCamposCompletos] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    
    window.scrollTo(0, 0);
  }, []);

  const onChan = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });

    const inputElements = formRef.current.querySelectorAll('input');
    const areAllInputsFilled = Array.from(inputElements).every((inputElement) => inputElement.value !== '');

    setCamposCompletos(areAllInputsFilled);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generar una clave de reserva aleatoria (6 caracteres alfanuméricos)
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let clave = '';
    for (let i = 0; i < 6; i++) {
      clave += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    setClaveReserva(clave);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setFormularioKey(formularioKey + 1); 
    setFormulario(initialState); 
    setCamposCompletos(false);
  };

  return (
    <div className="conteinerGeneral reservas">
      <h1>Reserva de Mesa</h1>
      <hr />
      <form className="formulario" key={formularioKey} ref={formRef}>
        <FormularioInput id="fecha" tipo="date" texto="Fecha" value={formulario.fecha} onChan={onChan} />
        <FormularioInput id="hora" tipo="time" texto="Hora" value={formulario.hora} onChan={onChan} />
        <FormularioInput id="personas" tipo="number" texto="Cantidad de Personas" value={formulario.personas} onChan={onChan} />
        <FormularioInput id="nombre" tipo="text" texto="Nombre" value={formulario.nombre} onChan={onChan} />
        <FormularioInput id="apellido" tipo="text" texto="Apellido" value={formulario.apellido} onChan={onChan} />
        <FormularioInput id="telefono" tipo="tel" texto="Teléfono" value={formulario.telefono} onChan={onChan} />
        <FormularioInput id="email" tipo="email" texto="Correo Electrónico" value={formulario.email} onChan={onChan} />

        <button className='comun button-reservas' onClick={handleSubmit} disabled={!camposCompletos}>Reservar</button>
        
      </form>
      {modalVisible && (
        <ModalReservas
          isVisible={modalVisible}
          onClose={closeModal}
          reserva={formulario}
          claveReserva={claveReserva}
        />
      )}
    </div>
  );
}

export default Reservas;

