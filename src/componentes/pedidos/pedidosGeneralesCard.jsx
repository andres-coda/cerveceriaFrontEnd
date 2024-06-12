import React from 'react';
import { useEffect, useState } from 'react';
import './pedidosCard.css'
import AlertaGeneral from '../eliminarAlerta/AlertaGeneral';
import { FaEdit, FaTrash, FaUndo } from 'react-icons/fa';
import Boton from '../boton/Boton';
import { fetchDelete, fetchPatCh } from '../funciones fetch/funciones';
import { URL_PEDIDO } from '../../endPoints/endPoints';
function PedidosGeneralesCard({pedido, click}) {
	const [importe, setImporte] = useState(0);
	const formatoHora = (fecha) => {
        const date = new Date(fecha);
        const horas = date.getHours().toString().padStart(2, '0'); 
        const minutos = date.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
	}
    const [isOpen, setIsOpen ] = useState(false)
    const [texto, setTexto ] = useState({proceso:false, texto:"procesando...", idTexto: pedido.deleted?"reactivar":"eliminar", condicion:false});

    const onEdit = (pedidoInterno)=>{
        setTexto((prev)=>({
            ...prev, 
            proceso:true, 
            texto: `Desea reactivar el pedido del usuario ${pedidoInterno.usuario.username}`,
            idTexto: `reactivar`
        }))
        setIsOpen(true)
        console.log(`deleted pedido ${pedidoInterno.id}`);
    }

    const onDeleted = (pedidoInterno) => {
        console.log(pedido.deleted);
        setTexto((prev)=>({
            ...prev, 
            proceso:true, 
            texto: `Desea ${!pedido.deleted ? 'eliminar':'reactivar'} el pedido del usuario ${pedidoInterno.usuario.username}`,
            idTexto: !pedido.deleted ? 'eliminar':'reactivar'
        }))
        setIsOpen(true)
        console.log(`deleted pedido ${pedidoInterno.id}`);
    }

    const btnClick = async (e) => {
        const btn = e.target.id;
        setTexto((prev)=>({...prev, proceso: false, texto:"procesando..."}))
        switch (btn) {
            case 'eliminar' :
                try {
                    const response = await fetchDelete(URL_PEDIDO+'/'+pedido.id,localStorage.getItem('token'))
                    if (response==true) {
                        setTexto((prev)=>({...prev, texto: "El pedido fue eliminado con exito", proceso :true, condicion:true}));
                    }
                } catch (error) {
                    setTexto((prev)=>({...prev, texto: `El pedido no pudo ser borrado: ${error.message}`, proceso :true, condicion:true}));
                }
            break;
            case 'reactivar' :
                try {
                    const response = await fetchPatCh(URL_PEDIDO+'/'+pedido.id,localStorage.getItem('token'))
                    if (response==true) {
                        setTexto((prev)=>({...prev, texto: "El pedido fue reactivado con exito", proceso :true, condicion:true}));
                    }
                } catch (error) {
                    setTexto((prev)=>({...prev, texto: `El pedido no pudo ser reactivado: ${error.message}`, proceso :true, condicion:true}));
                }
            break;

        }
    }

    const onClose = () =>{
        setIsOpen(false);
        window.location.reload();
    }

	useEffect(()=>{
		pedido.pedidosProducto.map((producto)=>{
			setImporte(importe+producto.cantidad*producto.producto.price)
	})
	},[])

	return (
    <>
		<div className={!pedido.deleted ? "pedido-card-general" : "pedido-card-eliminado-general"} onClick={click} id={pedido.id}>
            <div className='pedido-encabezado'>
                <p className='pedido-hora'>{pedido.usuario.username}</p> 
                <p className='pedido-hora'>Hora de pedido: {formatoHora(pedido.fecha)} </p>
            </div>
            <div className='pedido-cuerpo'>
                <div className='pedido-productos-content' >
                    {pedido.pedidosProducto.map((producto,index)=>(
                        <div className='pedido-producto' key={`${producto.producto.idProducto}-${index}-3`}>
                            <p><b>{producto.cantidad} </b></p>
                            <img src={producto.producto.img} alt={producto.producto.titulo} />
                            <p> {producto.producto.titulo} </p>
                        </div>
                    ))}
                </div>
                <p className='pedido-detalle'>Detalles del pedido: {pedido.detalle}</p>
                <div className='botonera-admin'>
                    <button id='pedido-edit' className='comun' onClick={(e)=> {e.stopPropagation(); onEdit(pedido)}}><FaEdit /></button>
                    <button id='pedido-deleted' className='comun' onClick={(e)=> {e.stopPropagation(); onDeleted(pedido)}}>{ !pedido.deleted ? <FaTrash/> : <FaUndo/> }</button>
            </div>
            </div>
            <p className='pedido-importe'><b>Total: </b> ${importe} </p>
		</div>
        <AlertaGeneral
                texto={texto}
                btnClick={btnClick}
                children={
                    !texto.condicion ? (
                        <>
                        <div>
                        <>
                        {pedido.pedidosProducto.map((producto)=>(
                            <div className='pedido-producto-alerta' key={producto.producto.idProducto}>
                                <p><b>{producto.cantidad} </b></p>
                                <img src={producto.producto.img} alt={producto.producto.titulo} />
                                <p> {producto.producto.titulo} </p>
                            </div>
                        ))}
                         <p className='pedido-importe-alerta'><b>Importe: </b> ${importe} </p>
                    </>
                    </div>
                    <div className='boton-alerta-pedido'>
                        <Boton btn={{id:texto.idTexto, clase:"alerta", texto: texto.idTexto}} btnClick={btnClick}/>
                        <Boton btn={{id:"cancelar", clase:"alerta", texto: "Cancelar"}} btnClick={onClose}/>
                    </div>
                    </>
                    ):(null)
                }
                isOpen={isOpen}
                onClose={onClose}
            />
    </>
	)
}

export default PedidosGeneralesCard;