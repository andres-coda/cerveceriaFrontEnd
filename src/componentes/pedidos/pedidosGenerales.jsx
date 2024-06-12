import React from 'react';
import './pedidos.css'
import { useContext, useEffect, useState } from "react";
import Subtitulo from "../subtitulo/Subtitulo";
import { contexto } from "../contexto/contexto";
import { URL_PEDIDO, URL_USUARIO } from "../../endPoints/endPoints";
import AnimatedSVG from "../animacion/AnimatedSVG";
import PedidosCard from "./pedidosCard";
import { fetchGet } from "../funciones fetch/funciones";
import PedidosGeneralesCard from './pedidosGeneralesCard';

function MostrarPedidosGenerales(){
    const {datos} = useContext(contexto);
    const [pedidos, setPedidos] = useState(null)
    let fechaAnterior = null;

    const extraerFecha = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('es-ES', options); // Formato DD/MM/YYYY
    };

    const fetchPedidos = async () =>{
        try {
            const pedidosFettch = await fetchGet(URL_PEDIDO, localStorage.getItem('token'));
            if (pedidosFettch) {
                setPedidos(pedidosFettch)
            }
        }catch (error) {
            console.log(error);
        }
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
                                <React.Fragment key={`${dato.id}-${index}`}>
                                    {fechaMostrar && (
                                        <p className='fecha-general' key={`${dato.id}-${index}-1`}>{fechaActual}</p>
                                    )}
                                    <PedidosGeneralesCard pedido={dato} click={btnClick} key={`${dato.id}-${index}-2`}/>
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

