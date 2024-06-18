import React, { useCallback, useContext, useState } from 'react';
import './ReservasCard.css';
import { FaEdit, FaTrash, FaUndo } from 'react-icons/fa';
import { fetchDelete, fetchPatCh, fetchPut } from '../funciones fetch/funciones';
import { URL_RESERVA } from '../../endPoints/endPoints';
import AlertaGeneral from '../eliminarAlerta/AlertaGeneral';
import Boton from '../boton/Boton';
import FormularioInput from '../formularioInput/FormularioInput';
import { contexto } from '../contexto/contexto';

const ReservasCard = ({ reserva, reload, fieldsToShow }) => {
  const [isEdit, setIsEdit] = useState(false);
  const {datos} = useContext(contexto)
  const [isOpen, setIsOpen ] = useState(false);
  const [texto, setTexto ] = useState({proceso:false, texto:"procesando...", idTexto: reserva.deleted?"reactivar":"eliminar", condicion:false});
  const [ editReserva, setEditReserva ] = useState({
    fecha: reserva ? reserva.fecha : '',
    hora: reserva ? reserva.hora : '',
    cantidad: reserva ? reserva.cantidad : '',
    numeroMesa: reserva ? reserva.numeroMesa : '',
  })
  const formatoHora = (fecha, hora) => {
    const date = new Date(`${fecha}T${hora}`);
    const opciones = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString('es-ES', opciones);
  };

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

  const extraerFecha = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options); // Formato DD/MM/YYYY
};

  const onEdit = ()=>{
    setTexto((prev)=>({
        ...prev, 
        proceso:true, 
        texto: `Desea editar la reserva`,
        idTexto: `editar`
    }))
    setIsEdit(true);
  };
  const onDeleted = () => {
    setTexto((prev)=>({
        ...prev, 
        proceso:true, 
        texto: `Desea ${!reserva.deleted ? 'eliminar':'reactivar'} la reserva`,
        idTexto: !reserva.deleted ? 'eliminar':'reactivar'
    }))
    setIsOpen(true)
  };
  const onChange = (e)=>{
    setEditReserva({
        ...editReserva,
        [e.target.name]: e.target.value
    });
  };
  const onClose = () =>{
    setTexto((prev)=>({...prev,proceso:false, texto:"procesando...", idTexto: reserva.deleted?"reactivar":"eliminar", condicion:false}));
    setIsOpen(false);
    setIsEdit(false);
  };

  const btnClick = async (e) => {
    e.preventDefault(); 
    const btn = e.target.id;
    setTexto((prev)=>({...prev, proceso: false, texto:"procesando..."}))
    switch (btn) {
        case 'eliminar' :
            try {
                const response = await fetchDelete(URL_RESERVA+'/'+reserva.id,localStorage.getItem('token'))
                if (response==true) {
                    const reloadLocal = await reload();
                    if (reloadLocal) {
                        setTexto((prev)=>({...prev, texto: "La reserva fue eliminado con exito", proceso :true, condicion:true}));
                    }
                }
            } catch (error) {
                setTexto((prev)=>({...prev, texto: `La reserva no pudo ser borrado: ${error.message}`, proceso :true, condicion:true}));
            }
        break;
        case 'reactivar' :
            try {
                const response = await fetchPatCh(URL_RESERVA+'/'+reserva.id,localStorage.getItem('token'))
                if (response) {
                    const reloadLocal = await reload();
                    if (reloadLocal) setTexto((prev)=>({...prev, texto: "La reserva fue reactivado con exito", proceso :true, condicion:true}));
                }
            } catch (error) {
                setTexto((prev)=>({...prev, texto: `La reserva no pudo ser reactivado: ${error.message}`, proceso :true, condicion:true}));
            }
        break;
        case 'editar' :
            try {
              const reservaActualizado = {
                fecha: editReserva.fecha,
                hora: editReserva.hora,
                cantidad: parseInt(editReserva.cantidad),
                numeroMesa: parseInt(editReserva.numeroMesa),
                idUsuario: parseInt(datos.userAct.sub),
                idMetodoPago: parseInt(reserva.metodoPago.id),

              };
              console.log(reservaActualizado);
                const response = await fetchPut(URL_RESERVA+'/'+reserva.id,localStorage.getItem('token'),reservaActualizado);
                if (response) {
                    const reloadLocal = await reload();
                    if (reloadLocal) {
                        setTexto((prev)=>({...prev, texto: "La resereva fue editado con exito", proceso :true, condicion:true}));
                    }
                }

            } catch (error) {
                setTexto((prev)=>({...prev, texto: `La resereva no pudo ser editado: ${error.message}`, proceso :true, condicion:true}));
            }

    }
  };

  return (
    <>
      <div className={!reserva.deleted ? "pedido-card" : "pedido-card-eliminado"}>
        <div className='pedido-encabezado'>
          {fieldsToShow.includes('username') && <p className={`pedido-hora ${reserva.usuario ? '' : 'unavailable'}`}>{reserva.usuario ? reserva.usuario.username : 'Usuario no disponible'}</p>}
          {fieldsToShow.includes('hora-encabezado') && <p className='pedido-hora'>Hora de reserva: {formatoHora(reserva.fecha, reserva.hora)}</p>}
          {fieldsToShow.includes('fecha-encabezado') && <p className='fecha-encabezado'>{extraerFecha(reserva.fecha)}</p>}
        </div>)
        <div className='pedido-cuerpo'>
          <div className='reserva-cuerpo'>
            {fieldsToShow.includes('nombre') && <p>Nombre: {reserva.usuario ? `${reserva.usuario.name} ${reserva.usuario.lastname}` : 'Nombre no disponible'}</p>}
            {fieldsToShow.includes('mail') &&<p>Mail: {reserva.usuario ? reserva.usuario.email : 'Email no disponible'}</p>}
            {fieldsToShow.includes('hora') &&<p>Hora: {reserva.hora}</p>}
            {fieldsToShow.includes('personas') &&<p>Personas: {reserva.cantidad}</p>}
          </div>
          <div className='botonera-admin'>
            {fieldsToShow.includes('edit') && <button id='pedido-edit' className='comun' onClick={(e) => { e.stopPropagation(); onEdit(reserva) }}><FaEdit /></button>}
            {fieldsToShow.includes('delete') && <button id='pedido-deleted' className='comun' onClick={(e) => { e.stopPropagation(); onDeleted(reserva) }}>{!reserva.deleted ? <FaTrash /> : <FaUndo />}</button>}
          </div>
        </div>
        {fieldsToShow.includes('mesa') && <p className='pedido-importe'><b>Mesa: </b> # {reserva.numeroMesa} </p>}
      </div>
      <AlertaGeneral
        texto={texto}
        btnClick={btnClick}
        children={
          !texto.condicion ? (
            <>
           <div className='reserva-cuerpo-alerta'>
              <p>Nombre:  {reserva.usuario ? `${reserva.usuario.name} ${reserva.usuario.lastname}` : 'Nombre no disponible'}</p>
              <p>Mail: {reserva.usuario ? reserva.usuario.email : 'Email no disponible'}</p>
              <p>Personas:  {reserva.cantidad}</p>
              <p>Fecha de reserva: {extraerFecha(reserva.fecha)} </p>
              <p>Hora de reserva: {formatoHora(reserva.fecha, reserva.hora)}</p>
              <p className='pedido-importe'><b>Mesa: </b> # {reserva.numeroMesa} </p>
          </div>   
            <div className='boton-alerta-pedido'>
                <Boton btn={{id:texto.idTexto, clase:"alerta", texto: texto.idTexto}} btnClick={btnClick}/>
                <Boton btn={{id:"cancelar", clase:"alerta", texto: "Cancelar"}} btnClick={onClose}/>
            </div>
            </>
          ) : (null)
        } 
        isOpen={isOpen}
        onClose={onClose}
      />
      <AlertaGeneral
        texto={texto}
        btnClick={btnClick}
        children={
            !texto.condicion ? (
              <form onSubmit={btnClick} className='formulario-alerta'>
              <FormularioInput
                id="fecha"
                tipo="date"
                texto="Fecha"
                value={editReserva.fecha}
                onChan={onChange}          
              />
              <div className="renglonInput-alerta">
              <label htmlFor="hora">HORA</label>
              <select
                id="hora"
                name="hora"
                value={editReserva.hora}
                onChange={onChange}
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
                value={editReserva.cantidad}
                onChan={onChange}          
              />
              <FormularioInput
                id="numeroMesa"
                tipo="numero"
                texto="Numero de Mesa"
                value={editReserva.numeroMesa}
                onChan={onChange}
              />
            <div className='boton-alerta-pedido'>
                <Boton btn={{id:texto.idTexto, clase:"alerta", texto: texto.idTexto}} btnClick={btnClick}/>
                <Boton btn={{id:"cancelar", clase:"alerta", texto: "Cancelar"}} btnClick={onClose}/>
            </div>
            </form>
            ):(null)
        }
        isOpen={isEdit}
        onClose={onClose}
      />
      </>
  );
};

export default ReservasCard;
