import { useEffect, useState } from 'react';
import './pedidos.css'
function PedidosCard({pedido, click}) {
	const [importe, setImporte] = useState(0);
	const formatoFecha = (fecha) => {
    const date = new Date(fecha);
    const dia = date.getDate();
    const mes = date.getMonth() + 1; // Los meses son de 0 a 11
    const año = date.getFullYear();
    return `${dia}/${mes}/${año}`;
	}

	useEffect(()=>{
		pedido.pedidosProducto.map((producto)=>{
			setImporte(importe+producto.cantidad*producto.producto.price)
	})
	},[])

	return (
		<div className={!pedido.deleted ? "pedido-card" : "pedido-card-eliminado"} onClick={click} id={pedido.id}>
			<p><b>Fecha: </b> {formatoFecha(pedido.fecha)} </p>
			{pedido.pedidosProducto.map((producto)=>(
				<div key={producto.producto.idProducto}>
					<p><b>{producto.cantidad} </b> {producto.producto.titulo} </p>
				</div>
			))}
			<p><b>Importe: </b> ${importe} </p>
		</div>
	)
}

export default PedidosCard;


/*
"name": "Marta",
    "lastname": "Pérez Martínez",
    "username": "josefina",
    "email": "extraño@tubarrio.com",
    "password": "enpijama",
    "age": 30,
    "direccion": "Calle Peatonal 987",
    "role": "admin",
    "id": 2,
    "deleted": false,
    "pedidos": [
        {
            "fecha": "2024-02-25T03:00:00.000Z",
            "detalle": "modificando la prueba",
            "id": 12,
            "deleted": false,
            "pedidosProducto": [
                {
                    "cantidad": 2,
                    "producto": {
                        "titulo": "ravioles con salsa blanca",
                        "img": "https://cocinerosargentinos.com/content/recipes/500x500/ravioles-de-papa-y-cebolla.1639.jpg",
                        "descripcion": "El secreto esta en la salsa de la abuela esta muy buena",
                        "ingredientes": "paz y mucha ciencia, pero pegados",
                        "price": 2500,
                        "valoracion": 5,
                        "idProducto": 1,
                        "deleted": false
                    },
                    "id": 4,
                    "deleted": false
                }
            ]
        },
				*/