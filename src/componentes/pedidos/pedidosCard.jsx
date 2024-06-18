import {  useEffect, useState } from 'react';
import './pedidosCard.css'
import { FaEdit, FaTrash, FaUndo } from 'react-icons/fa';
import AlertaGeneral from '../eliminarAlerta/AlertaGeneral';
import Boton from '../boton/Boton';
import { URL_PEDIDO } from '../../endPoints/endPoints';
import { fetchDelete, fetchPatCh } from '../funciones fetch/funciones';
function PedidosCard({pedido}) {
	const [importe, setImporte] = useState(0);
    const [isOpen, setIsOpen ] = useState(false)
    const [texto, setTexto ] = useState({proceso:false, texto:"procesando...", idTexto: pedido.deleted?"reactivar":"eliminar", condicion:false});
	const formatoFecha = (fecha) => {
    const date = new Date(fecha);
    const dia = date.getDate();
    const mes = date.getMonth() + 1; 
    const año = date.getFullYear();
    return `${dia}/${mes}/${año}`;
	}

    const onEdit = (pedidoInterno)=>{
        setTexto((prev)=>({
            ...prev, 
            proceso:true, 
            texto: `Desea reactivar el pedido del día ${formatoFecha(pedidoInterno.fecha)}`,
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
            texto: `Desea ${!pedido.deleted ? 'eliminar':'reactivar'} el pedido del día ${formatoFecha(pedidoInterno.fecha)}`,
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
		<div className={!pedido.deleted ? "pedido-card" : "pedido-card-eliminado"} id={pedido.id}>
            <div className='pedido-encabezado'>
                <p className='pedido-fecha'> {formatoFecha(pedido.fecha)}  </p>
            </div>
            <div className='pedido-cuerpo'>
                <div className='pedido-productos-content' >
                    {pedido.pedidosProducto.map((producto)=>(
                        <div className='pedido-producto' key={producto.producto.idProducto}>
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
            <p className='pedido-importe'><b>Importe: </b> ${importe} </p>
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

export default PedidosCard; 
