import React from 'react';
import './pedidos.css'
import { useContext, useState } from "react";
import Subtitulo from "../subtitulo/Subtitulo";
import { contexto } from "../contexto/contexto";
import { URL_PEDIDO } from "../../endPoints/endPoints";
import AnimatedSVG from "../animacion/AnimatedSVG";
import PedidosCard from "./pedidosCard";
import { fetchGet } from "../funciones fetch/funciones";

function MostrarPedidosGenerales(){
    const {datos} = useContext(contexto);
    const [pedidos, setPedidos] = useState(null)
    let fechaAnterior = null;

    const formatoHora = (fecha) => {
        const date = new Date(fecha);
        const horas = date.getHours().toString().padStart(2, '0'); 
        const minutos = date.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
	}

    const extraerFecha = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('es-ES', options); // Formato DD/MM/YYYY
    };

    const reload = async () => {
        try {
            const pedidosFettch = await fetchGet(URL_PEDIDO, localStorage.getItem('token'));
            if (pedidosFettch) {
                setPedidos(pedidosFettch);
                return pedidosFettch;              
            }
        }catch (error) {
            console.log(error);
            return error;
        }
    }

    const fetchPedidos = async () =>{
        const pedidosFetch = await reload();
    }
    if (datos.userAct&& pedidos == null) fetchPedidos();

    const btnClick = (e) =>{
        const btn = e.currentTarget.id;
        console.log(btn);
    }

    
    return(
        <div className="conteinerGeneral">
            <Subtitulo texto={'Lista de pedidos'}/>
            {pedidos!=null && pedidos.length >0 ? (
                <>
                    <p className='pedido-cantidad'>{`${pedidos.length} pedidos recibidos`}</p>
                    <div className="pedidos-menu">
                        {pedidos.map((dato,index)=>{
                            const fechaActual=extraerFecha(dato.fecha);
                            const fechaMostrar = fechaActual != fechaAnterior;
                            if (fechaMostrar) {
                                fechaAnterior=fechaActual;
                            }
                            return (
                                <React.Fragment key={`fragmento-${dato.id}-${index}`}>
                                    {fechaMostrar && (
                                        <p className='fecha-general' key={`fecha-${dato.id}-${index}`}>{fechaActual}</p>
                                    )}
                                    <PedidosCard
                                        pedido={dato}
                                        key={`pedido-${dato.id}-${index}`}
                                        reload={reload}
                                        children={
                                            <>
                                                <p className='pedido-hora' key={`username-${dato.id}-${index}`}>{dato.usuario.username}</p>
                                                <p className='pedido-hora' key={`hora-${dato.id}-${index}`}>Hora de pedido: {formatoHora(dato.fecha)}</p>
                                            </>
                                        }
                                        textoAlerta={`el pedido del usuario ${dato.usuario.username}`}
                                    />
                                </React.Fragment>
                            )})}
                    </div>
                </>

            ):(
                <>
                    <AnimatedSVG />
                </>
            )}
        </div>
    )
}

export default MostrarPedidosGenerales;

