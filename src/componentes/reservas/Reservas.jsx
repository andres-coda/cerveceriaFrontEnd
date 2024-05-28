import React, { useState, useEffect, useRef } from 'react';
import './Reservas.css';
import FormularioInput from '../formularioInput/FormularioInput';
import '../boton/Boton.css';
import ModalPago from './ModalPago';
import ModalReservas from './ModalReservas';
import { useAuth } from '../auth/AuthContext';
import { getUserDetails } from './actions/getUserDetails';
import {generarClaveReserva}  from './actions/claveReserva';
import { BASE_URL } from '../../endPoints/endPoints';
import { data } from '../CarouselDeImagenes/imgCarous';
import { convertEnumValueToDisplayValue } from './actions/convertEnumValueToDisplayValue';

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
    const { fecha, hora, cantidad, numeroMesa, metodoPago } = formulario;
    const requestBody = {
      fecha,
      hora,
      cantidad: parseInt(cantidad),
      numeroMesa: parseInt(numeroMesa),
      idUsuario: parseInt(userId),
      idMetodoPago: parseInt(formulario.idMetodoPago),
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

  const handlePagoClose = () => {
    setIsModalPagoVisible(false);
  };

  const closeModal = () => {
    setIsModalReservaVisible(false);
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
        <FormularioInput id="cantidad" tipo="numero" texto="Cantidad de Personas" value={formulario.cantidad} onChan={onChan} />
        <FormularioInput id="nombre" tipo="text" texto="Nombre" value={formulario.nombre} onChan={onChan} />
        <FormularioInput id="apellido" tipo="text" texto="Apellido" value={formulario.apellido} onChan={onChan} />
        <FormularioInput id="numeroMesa" tipo="numero" texto="Numero de Mesa" value={formulario.numeroMesa} onChan={onChan} />
        <FormularioInput id="email" tipo="email" texto="Correo Electrónico" value={formulario.email} onChan={onChan} />

        <div className="form-group">
          <label htmlFor="metodoPago">Método de Pago</label>
          <select id="idMetodoPago" name="idMetodoPago" value={formulario.idMetodoPago} onChange={onChan}>
  <option value="">Seleccione un método de pago</option>
  {metodosPago.map((metodo) => (
    <option key={metodo.idMetodoPago} value={metodo.idMetodoPago}>{metodo.metodoPago}</option>
  ))}
</select>
        </div>

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
        <ModalReservas
          isVisible={ismodalReservaVisible}
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

