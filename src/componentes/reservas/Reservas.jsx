import React, { useState, useEffect, useRef } from 'react';
import './Reservas.css';
import FormularioInput from '../formularioInput/FormularioInput';
import '../boton/Boton.css';
import ModalReservas from './ModalReservas';
import { useAuth } from '../auth/AuthContext';
import { BASE_URL } from '../../endPoints/endPoints';

const Reservas = () => {
  const {auth} = useAuth();
  const {user, token} = auth || {}  ;
  const initialState = {
    fecha: '',
    hora: '',
    personas: '',
    nombre: user?.name || '',
    apellido: user?.lastname || '',
    telefono: '',
    email: user?.email || '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/reserva`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formulario),
      });
  
      if (!response.ok) {
        throw new Error("Error al crear la reserva");
      }
  
      const responseData = await response.json();
      setClaveReserva(responseData.claveReserva);
      setModalVisible(true);
    } catch (error) {
      console.error("Error al crear la reserva", error);
    }
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

        <button className='button-reservas' onClick={handleSubmit} disabled={!camposCompletos}>RESERVAR</button>
        
      </form>
      {modalVisible && (
        <ModalReservas
          isVisible={modalVisible}
          onClose={closeModal}
          reserva={formulario}
          claveReserva={claveReserva}
          estado={"Cantidad de Personas:"}
          titulo={"Reserva Exitosa"}
        />
      )}
    </div>
  );
}

export default Reservas;

