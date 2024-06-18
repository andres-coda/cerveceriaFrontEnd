import React, { useContext, useEffect, useState } from 'react';
import './Modal.css';
import { contexto } from '../contexto/contexto';
import { URL_PEDIDO, URL_PEDIDO_PRODUCTO } from '../../endPoints/endPoints';
import ModalPago from '../reservas/ModalPago';
import { fetchPost } from '../funciones fetch/funciones';
import ModalGeneral from '../modalGeneral/modalGeneral';
import PedidoInternoCard from '../pedidos/pedidoInternoCard';
import CarritoFormulario from './CarritoFormulario';
import AlertaGeneral from '../eliminarAlerta/AlertaGeneral';
import { useNavigate } from 'react-router-dom';

function ModalCarrito ({setModal, modal}) {
    const [isOpen, setIsOpen ] = useState(modal.metodoPago);
    const [alertaOpen, setAlertaOpen]= useState(false);
    const {datos, setDatos} = useContext(contexto);
    const navegate = useNavigate();
    const [texto, setTexto ] = useState({ 
        subtitulo: "Realizar pedido",
        proceso: true,
        texto: null
    });
    const [tarjeta, setTarjeta] = useState({
        texto: "Añadir tarjeta",
        id: "tarjeta"
    });
    const [detalle, setDetalle ] = useState({
        detalle: "",
        metodoPago: "Metodo de pago",
        idMetodo: null
    });
    const [modalTarjeta, setModalTarjeta] =useState(false);

    const handlePagoClose = () => {
        setModalTarjeta(false);
    };

    const handlePagoSubmit= () => {
        setTarjeta((prev)=>({...prev, texto: "Realizar pedido", id: "pago"}));
        setModalTarjeta(false);
    };

    const pago = async (e)=> {
        try {
            const pedido = {
                fecha: new Date(),
                detalle: detalle.detalle,
                usuario: datos.userAct.sub,
                metodoPago: detalle.idMetodo
            }
            const resp = await fetchPost(URL_PEDIDO, localStorage.getItem('token'), pedido)
            if (resp) {
                guardarPedido(resp.id);
            }   

        }catch (error) {
            setTexto((prev)=>({...prev,  proceso: true, texto: "El pedido no fue aprobado"+error}))

        }
    }

    const guardarPedido = async (idPedido) => {
       
        for (const producto of datos.carrito) {
            try {
                const pedido = {
                    cantidad: producto.cantidad,
                    pedido: idPedido,
                    producto: producto.producto.idProducto
                }
                const resp = await fetchPost(URL_PEDIDO_PRODUCTO, localStorage.getItem('token'), pedido);
                if (resp) {                    
                    setTexto((prev) => ({ ...prev, proceso: true, texto: "El pedido fue aprobado" }));
                }
            } catch (error) {
                setTexto((prev) => ({ ...prev, proceso: true, texto: "El pedido no fue aprobado. Error: " + error.message, espera: true }));
            }
        }
       
    }

    const btnClick = (e) =>{
        e.preventDefault(); 
        const btn = e.currentTarget.id
        switch (btn) {
            case "cerrar" :
                setModal((prev)=>({...prev, metodoPago:false}));
            break;
            case "pago" :
                setIsOpen(false);
                setAlertaOpen(true)
                setTexto((prev)=>({...prev, texto:"Procesando pedido...", proceso:false}));
                pago();
            break;
            case "tarjeta" :
                setModalTarjeta(true);
            default:
                console.log("boton no implementado");
            break;
        }
    }

    const handleAlertaClose=()=>{
        setAlertaOpen(false);
        setDatos((prev)=>({...prev, carrito:[]}));
        navegate('/pedidos')
    }

    const onClose = (e) =>{
        setIsOpen(false);
      };

    useEffect(()=>{
        if (texto.espera) {
            if (datos.metodoPago  && datos.metodoPago.length > 0) {
                setTexto((prev)=>({...prev, espera:false}))
            }
        }
    },[]);


    return (
        <>
        <ModalGeneral
            onClose={onClose}
            isOpen={isOpen}
            children={
                <div className='modal-metodo-pago'>
                <h3>{texto.subtitulo}</h3>
                <PedidoInternoCard productos={datos.carrito}/>
                <CarritoFormulario btnClick={btnClick} tarjeta={tarjeta} detalle={detalle} setDetalle={setDetalle}/>
                <ModalPago
                    isVisible={modalTarjeta}
                    onClose={handlePagoClose}
                    metodoPago="Tarjeta"
                    onSubmitPago={handlePagoSubmit}
                />
            </div>}
        />
        <AlertaGeneral 
            texto={texto} 
            isOpen={alertaOpen} 
            onClose={handleAlertaClose}
            children={
                <PedidoInternoCard productos={datos.carrito}/>
            }
        />
        </>
    );
};

export default ModalCarrito;