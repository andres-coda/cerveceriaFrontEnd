import React, { useState, useEffect, useRef } from 'react';
import './Reservas.css';
import FormularioInput from '../formularioInput/FormularioInput';
import '../boton/Boton.css';
import ModalPago from './ModalPago';
import Modal from '../../utils/genericModal/GenericModal.jsx';
import ConfirmModal from './ConfirmModal';
import { useAuth } from '../auth/AuthContext';
import { getUserDetails } from './actions/getUserDetails';
import { generarClaveReserva } from './actions/claveReserva';
import { BASE_URL } from '../../endPoints/endPoints';
import { convertEnumValueToDisplayValue } from '../../utils/convertValue.js';
import Subtitulo from '../subtitulo/Subtitulo.jsx';
import { useParams, useNavigate } from 'react-router-dom';

const Reservas = ({ reservaEdit }) => {
  const { auth } = useAuth();
  const { user, token } = auth || {};
  const userId = user?.sub;
  const { id } = useParams();
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    fecha: '',
    hora: '',
    cantidad: '',
    numeroMesa: '',
    nombre: '',
    apellido: '',
    email: '',
    idMetodoPago: '',
    metodoPago: '',
  });
  const [camposEditables, setCamposEditables] = useState({
    fecha: true,
    hora: true,
    cantidad: true,
    numeroMesa: true,
  });
  const [isModalReservaVisible, setIsModalReservaVisible] = useState(false);
  const [isModalPagoVisible, setIsModalPagoVisible] = useState(false);
  const [claveReserva, setClaveReserva] = useState('');
  const [formularioKey, setFormularioKey] = useState(0);
  const [camposCompletos, setCamposCompletos] = useState(false);
  const [metodosPago, setMetodosPago] = useState([]);
  const [isEditConfirmationVisible, setIsEditConfirmationVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(!!reservaEdit);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id && token) {
          const reservaResponse = await fetch(`${BASE_URL}/reserva/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const reservaData = await reservaResponse.json();

          setFormulario({
            fecha: reservaData.fecha,
            hora: reservaData.hora,
            cantidad: reservaData.cantidad,
            numeroMesa: reservaData.numeroMesa,
            nombre: reservaData.usuario.name,
            apellido: reservaData.usuario.lastname,
            email: reservaData.usuario.email,
            idMetodoPago: reservaData.idMetodoPago,
            metodoPago: reservaData.metodoPago.metodoPago,
          });
          setIsEditMode(true);
        } else if (userId && token) {
          const userDetails = await getUserDetails(userId, token);
          setFormulario((prevState) => ({
            ...prevState,
            nombre: userDetails.name || '',
            apellido: userDetails.lastname || '',
            email: userDetails.email || '',
          }));
        }

        const metodosPagoResponse = await fetch(`${BASE_URL}/metodoPago`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const metodosPagoData = await metodosPagoResponse.json();

        const metodosPagoFormatted = metodosPagoData.map((metodoPago) => ({
          ...metodoPago,
          metodoPago: convertEnumValueToDisplayValue(metodoPago.metodoPago),
        }));
        setMetodosPago(metodosPagoFormatted);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [userId, token, id]);

  const onChan = (e) => {
    const { name, value } = e.target;
    setFormulario((prevState) => ({ ...prevState, [name]: value }));

    const inputElements = formRef.current.querySelectorAll('input');
    const areAllInputsFilled = Array.from(inputElements).every(
      (inputElement) => inputElement.value !== ''
    );

    setCamposCompletos(areAllInputsFilled);
  };

  const sendConfirmationEmail = async (email, subject, message) => {
    try {
      const response = await fetch(`${BASE_URL}/email/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, subject, message }),
      });
  
      if (!response.ok) {
        throw new Error('Error al enviar el correo de confirmación');
      }
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      setIsEditConfirmationVisible(true);
    } else {
      const claveReserva = generarClaveReserva();
      setClaveReserva(claveReserva);
      setIsModalPagoVisible(true);
    }
  };

  const handleEditConfirmation = async () => {
    try {
      const { fecha, hora, cantidad, numeroMesa, idMetodoPago } = formulario;
      const requestBody = {
        fecha,
        hora,
        cantidad: parseInt(cantidad),
        numeroMesa: parseInt(numeroMesa),
        idUsuario: parseInt(userId),
        idMetodoPago: parseInt(idMetodoPago),
        subject: "Actualizacion de Reserva",
        message: `Estimado/a: ${nombre} ${apellido},\n\nSu reserva ha sido confirmada para el dia ${fecha} a las ${hora} horas.\n\nGracias por su preferencia.\n\nSaludos Cordiales,\nEl equipo de Cervecería Green Beer`
      };

      const response = await fetch(`${BASE_URL}/reserva/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar los datos de la reserva');
      }

      setIsEditConfirmationVisible(false);
      setIsModalReservaVisible(true);
      await sendConfirmationEmail(email, requestBody.subject, requestBody.message);
      setTimeout(() => navigate('/listadoreservas'), 5000); 
    } catch (error) {
      console.error(error);
    }
  };

  const handlePagoSubmit = async (formData) => {
    const { fecha, hora, cantidad, numeroMesa, idMetodoPago, email, nombre, apellido } = formulario;
    const requestBody = {
      fecha,
      hora,
      cantidad: parseInt(cantidad),
      numeroMesa: parseInt(numeroMesa),
      idUsuario: parseInt(userId),
      idMetodoPago: parseInt(idMetodoPago),
      email,
      subject: "Confirmación de Reserva",
      message: `Estimado/a: ${nombre} ${apellido},\n\nSu reserva ha sido confirmada para el ${fecha} a las ${hora} horas.\n\nGracias por su preferencia.\n\nSaludos Cordiales,\nEl equipo de Cervecería Green Beer`
    };
  
    try {
      const response = await fetch(`${BASE_URL}/reserva`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error('Error al enviar los datos de la reserva');
      }  
      
      await sendConfirmationEmail(email, requestBody.subject, requestBody.message);
  
      setIsModalPagoVisible(false);
      setIsModalReservaVisible(true);
      setTimeout(() => navigate('/'), 5000);
    } catch (error) {
      console.error(error);
    }
  };

  const onselect = (e) => {
    const select = e.target.value;
    const option = metodosPago.find((metodo) => metodo.metodoPago === select);
    setFormulario((prevState) => ({
      ...prevState,
      idMetodoPago: option.idMetodoPago,
      metodoPago: option.metodoPago,
    }));
  };

  const handlePagoClose = () => {
    setIsModalPagoVisible(false);
  };

  const closeModal = () => {
    setIsModalReservaVisible(false);
    setFormularioKey((prevKey) => prevKey + 1);
    setFormulario({
      fecha: '',
      hora: '',
      cantidad: '',
      numeroMesa: '',
      nombre: user?.name || '',
      apellido: user?.lastname || '',
      email: user?.email || '',
      idMetodoPago: '',
      metodoPago: '',
    });
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
    for (let hour = 10; hour <= 24; hour++) {
      for (let minutes of ['00', '30']) {
        const time = `${hour < 10 ? '0' + hour : hour}:${minutes}`;
        options.push(time);
      }
    }
    return options;
  };

  const buttonText = isEditMode ? 'Guardar' : 'Reservar';

  return (
    <div className="conteinerGeneral reservas">
      <Subtitulo texto={'Reserva de mesa'} />
      <hr />
      <form className="formulario" key={formularioKey} ref={formRef}>
        <FormularioInput
          id="fecha"
          tipo="date"
          texto="Fecha"
          value={formulario.fecha}
          onChan={onChan}          
        />
        <div className="renglonInput">
          <label htmlFor="hora">HORA</label>
          <select
            id="hora"
            name="hora"
            value={formulario.hora}
            onChange={onChan}
            required            
          >
            <option value="">Seleccione horario de reserva</option>
            {generateTimeOptions().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <FormularioInput
          id="cantidad"
          tipo="numero"
          texto="Cantidad de Personas"
          value={formulario.cantidad}
          onChan={onChan}          
        />
        <FormularioInput
          id="nombre"
          tipo="text"
          texto="Nombre"
          value={formulario.nombre}
          onChan={onChan}
          disabled 
        />
        <FormularioInput
          id="apellido"
          tipo="text"
          texto="Apellido"
          value={formulario.apellido}
          onChan={onChan}
          disabled
        />
        <FormularioInput
          id="numeroMesa"
          tipo="numero"
          texto="Numero de Mesa"
          value={formulario.numeroMesa}
          onChan={onChan}
        />
        <FormularioInput
          id="email"
          tipo="email"
          texto="Correo Electrónico"
          value={formulario.email}
          onChan={onChan}
          disabled
        />
        <FormularioInput
          id="idMetodoPago"
          value={formulario.metodoPago}
          tipo={'select'}
          texto={'Metodo de Pago'}
          onChan={onselect}
          opciones={[...metodosPago.map((metodo) => metodo.metodoPago)]}
          defaultValue={formulario.metodoPago || 'Seleccione Metodo de Pago'}
        />
        <button className="button-reservas" onClick={handleSubmit} disabled={!camposCompletos}>
          {buttonText}
        </button>
      </form>
      {isModalPagoVisible && (
        <ModalPago
          isVisible={isModalPagoVisible}
          onClose={handlePagoClose}
          metodoPago="Tarjeta"
          onSubmitPago={handlePagoSubmit}
        />
      )}
      {isModalReservaVisible && (
        <Modal
          isVisible={isModalReservaVisible}
          onClose={closeModal}
          data={{
            ...formulario,
            nombreApellido: `${formulario.nombre} ${formulario.apellido}`,
            titulo: 'Reserva Exitosa',
          }}
          qrDataTemplate={generateReservaQRData}
          contentStructure={contentStructure}
        />
      )}
      {isEditConfirmationVisible && (
        <ConfirmModal
          message="¿Está seguro que desea editar la reserva?"
          onConfirm={handleEditConfirmation}
          onCancel={() => setIsEditConfirmationVisible(false)}
        />
      )}
    </div>
  );
};

export default Reservas;
