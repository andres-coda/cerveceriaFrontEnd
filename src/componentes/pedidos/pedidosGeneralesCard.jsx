import React from 'react';
import { useEffect, useState } from 'react';
import './pedidosCard.css'
function PedidosGeneralesCard({pedido, click}) {
	const [importe, setImporte] = useState(0);
	const formatoHora = (fecha) => {
        const date = new Date(fecha);
        const horas = date.getHours().toString().padStart(2, '0'); 
        const minutos = date.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
	}

	useEffect(()=>{
		pedido.pedidosProducto.map((producto)=>{
			setImporte(importe+producto.cantidad*producto.producto.price)
	})
	},[])

	return (
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
            </div>
            <p className='pedido-importe'><b>Total: </b> ${importe} </p>
		</div>
	)
}

export default PedidosGeneralesCard;