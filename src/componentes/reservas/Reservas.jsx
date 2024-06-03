import React, { useState, useEffect, useRef } from 'react';
import './Reservas.css';
import FormularioInput from '../formularioInput/FormularioInput';
import '../boton/Boton.css';
import ModalPago from './ModalPago';
import Modal from '../../utils/genericModal/GenericModal.jsx';
import { useAuth } from '../auth/AuthContext';
import { getUserDetails } from './actions/getUserDetails';
import {generarClaveReserva}  from './actions/claveReserva';
import { BASE_URL } from '../../endPoints/endPoints';
import { convertEnumValueToDisplayValue } from '../../utils/convertValue.js'
import Subtitulo from '../subtitulo/Subtitulo.jsx';

const Reservas = () => {
  const {auth} = useAuth();
  const {user, token} = auth || {};
  const userId = user?.sub;
  
  const initialState = {
    fecha: '',
    hora: '',
    cantidad: '',
    numeroMesa: '',
    nombre: user?.name || '',
    apellido: user?.lastname || '',
    email: user?.email || '',
    idMetodoPago: '',
    metodoPago: ""
  };

  const [formulario, setFormulario] = useState(initialState);
  const [ismodalReservaVisible, setIsModalReservaVisible] = useState(false);
  const [ismodalPagoVisible, setIsModalPagoVisible] = useState(false);
  const [claveReserva, setClaveReserva] = useState('');
  const [formularioKey, setFormularioKey] = useState(0);
  const [camposCompletos, setCamposCompletos] = useState(false);
  const [metodosPago, setMetodosPago] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    
    window.scrollTo(0, 0);

    if (userId && token) {
      getUserDetails(userId, token).then(userDetails => {
        setFormulario({
          ...initialState,
          nombre: userDetails.name || '',
          apellido: userDetails.lastname || '',
          email: userDetails.email || '',
        });
      }).catch(error => {
        console.error('Error fetching user details:', error);
      });
     }

     fetch(`${BASE_URL}/metodoPago`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        
        data = data.map(metodoPago => ({
          ...metodoPago,
          metodoPago: convertEnumValueToDisplayValue(metodoPago.metodoPago)
        }));

        
        setMetodosPago(data);
      })
      .catch(error => {
        console.error('Error fetching payment methods:', error);
      });
  
  }, [userId, token]);

  

  const onChan = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });

    const inputElements = formRef.current.querySelectorAll('input');
    const areAllInputsFilled = Array.from(inputElements).every((inputElement) => inputElement.value !== '');

    setCamposCompletos(areAllInputsFilled);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const claveReserva = generarClaveReserva();
         
      setClaveReserva(claveReserva);
      setIsModalPagoVisible(true);
    
  };

  const handlePagoSubmit = async (formData) => {      
    console.log('formData',formData); 
    const { fecha, hora, cantidad, numeroMesa, metodoPago,idMetodoPago } = formulario;
    const requestBody = {
      fecha,
      hora,
      cantidad: parseInt(cantidad),
      numeroMesa: parseInt(numeroMesa),
      idUsuario: parseInt(userId),
      idMetodoPago: parseInt(idMetodoPago),
    };
    console.log('Request body:', requestBody);
    try {
      const response = await fetch(`${BASE_URL}/reserva`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos de la reserva');
      }
      
      setIsModalPagoVisible(false);
      setIsModalReservaVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onselect=(e) => {
    const select = e.target.value;
    const option= metodosPago.find(metodo => metodo.metodoPago === select);
    setFormulario((prev)=>({...prev, idMetodoPago:option.idMetodoPago, metodoPago: option.metodoPago}));

  }

  const handlePagoClose = () => {
    setIsModalPagoVisible(false);
  };

  const closeModal = () => {
    setIsModalReservaVisible(false);
    setFormularioKey(formularioKey + 1); 
    setFormulario(initialState); 
    setCamposCompletos(false);
  };

  const generateReservaQRData = (reserva) => {
    return `Reserva exitosa!!\nFecha: ${reserva.fecha}\nHora: ${reserva.hora}\nNombre: ${reserva.nombre} ${reserva.apellido}\nEmail: ${reserva.email}\nCantidad de Personas: ${reserva.cantidad}\nMesa: ${reserva.numeroMesa}`;
  };

  const contentStructure = [
    { type: 'paragraph', label: 'Nombre y Apellido:', field: 'nombreApellido' },
    { type: 'paragraph', label: 'Fecha:', field: 'fecha' },
    { type: 'paragraph', label: 'Hora:', field: 'hora' },
    { type: 'paragraph', label: 'Cantidad de Personas:', field: 'cantidad' },
    { type: 'paragraph', label: 'Numero de Mesa:', field: 'numeroMesa' },
    { type: 'paragraph', label: 'Email:', field: 'email' },
  ];

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 10; hour <= 24; hour++) { // Rango de 10:00 a 22:00
      for (let minutes of ['00', '30']) {
        const time = `${hour < 10 ? '0' + hour : hour}:${minutes}`;
        options.push(time);
      }
    }
    return options;
  };

  return (
    <div className="conteinerGeneral reservas">
      <Subtitulo texto={"Reserva de mesa"} />
      <hr />
      <form className="formulario" key={formularioKey} ref={formRef}>
        <FormularioInput id="fecha" tipo="date" texto="Fecha" value={formulario.fecha} onChan={onChan} />        
        <div className="renglonInput">
          <label htmlFor="hora">HORA</label>
          <select id="hora" name="hora" value={formulario.hora} onChange={onChan} required>
            <option value="">Seleccione horario de reserva</option>
            {generateTimeOptions().map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
        <FormularioInput id="cantidad" tipo="numero" texto="Cantidad de Personas" value={formulario.cantidad} onChan={onChan} />
        <FormularioInput id="nombre" tipo="text" texto="Nombre" value={formulario.nombre} onChan={onChan} />
        <FormularioInput id="apellido" tipo="text" texto="Apellido" value={formulario.apellido} onChan={onChan} />
        <FormularioInput id="numeroMesa" tipo="numero" texto="Numero de Mesa" value={formulario.numeroMesa} onChan={onChan} />
        <FormularioInput id="email" tipo="email" texto="Correo Electrónico" value={formulario.email} onChan={onChan} />
         <FormularioInput 
         id="idMetodoPago"
         value={formulario.metodoPago} 
         tipo={"select"} 
         texto={"Metodo de Pago"} 
         onChan={onselect} 
         opciones={[...metodosPago.map((metodo) => metodo.metodoPago)]} 
     />
        <button className='button-reservas' onClick={handleSubmit} disabled={!camposCompletos}>RESERVAR</button>
        
      </form>
      {ismodalPagoVisible && (
        <ModalPago
        isVisible={ismodalPagoVisible}
        onClose={handlePagoClose}
        metodoPago="Tarjeta"
        onSubmitPago={handlePagoSubmit}
      />
      )}     
      {ismodalReservaVisible && (
        <Modal
          isVisible={ismodalReservaVisible}
          onClose={closeModal}
          data={{
            ...formulario,
            nombreApellido: `${formulario.nombre} ${formulario.apellido}`,
            titulo: 'Reserva Exitosa'
          }}          
          qrDataTemplate={generateReservaQRData}
          contentStructure={contentStructure}
        />
      )}
    </div>
  );
}

export default Reservas;

