import React, { useContext, useEffect, useState } from 'react';
import './Modal.css';
import Boton from '../boton/Boton';
import { contexto } from '../contexto/contexto';
import AnimatedSVG from '../animacion/AnimatedSVG';
import FormularioInput from '../formularioInput/FormularioInput';
import { FaTimes } from 'react-icons/fa';
import { convertEnumValueToDisplayValue } from '../../utils/convertValue';
import { URL_PEDIDO } from '../../endPoints/endPoints';
import ModalPago from '../reservas/ModalPago';
import { fetchPost } from '../funciones fetch/funciones';

function ModalCarrito ({setModal}) {
    const {datos} = useContext(contexto);
    const [texto, setTexto ] = useState({ 
        subtitulo: "Realizar pedido",
        espera: true
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

    const handlePagoSubmit= (datos) => {
        console.log(datos);
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
                setTexto((prev)=>({...prev, subtitulo:"El pedido fue aprobado", espera:true}));
            }

        }catch (error) {
            setTexto((prev)=>({...prev, subtitulo: "El pedido no fue aprobado"+error, espera:true}))

        }
    }

    const onselect=(e) => {
        const select = e.target.value;
        const option= datos.metodoPago.find(metodo => convertEnumValueToDisplayValue(metodo.metodoPago) === select);
        const idMetodo = datos.metodoPago.find(metodo => convertEnumValueToDisplayValue(metodo.metodoPago) === select)?.id;
        setDetalle((prev)=>({...prev, idMetodo:idMetodo,  metodoPago: convertEnumValueToDisplayValue(option.metodoPago)}));
      }

    const onChange = (e) => {
        setDetalle({
            ...detalle,
            [e.target.name]: e.target.value
        })
    }
    const btnClick = (e) =>{
        e.preventDefault(); 
        const btn = e.currentTarget.id
        switch (btn) {
            case "cerrar" :
                setModal((prev)=>({...prev, metodoPago:false}));
            break;
            case "pago" :
                setTexto((prev)=>({...prev, subtitulo:"Procesando pedido...", espera:true}));
                pago();
            break;
            case "tarjeta" :
                setModalTarjeta(true);
            default:
                console.log("boton no implementado");
            break;
        }
    }

    useEffect(()=>{
        if (texto.espera) {
            if (datos.metodoPago  && datos.metodoPago.length > 0) {
                setTexto((prev)=>({...prev, espera:false}))
            }
        }
    },[])


    return (
        <>
        <div className='modalFondoTransparente'>
            <div className="modalFondo">
                <div className='modal-metodo-pago'>
                    <h3>{texto.subtitulo}</h3>
                    {texto.espera ==false ? (
                        <form onSubmit={btnClick} className='formulario-metodo-pago'>
                            <FormularioInput 
                                id="metodoPago"
                                value={detalle.metodoPago} 
                                tipo={"select"} 
                                texto={"Metodo de Pago"} 
                                onChan={onselect} 
                                opciones={[...datos.metodoPago.map((metodo) => convertEnumValueToDisplayValue(metodo.metodoPago))]} 
                                />
                            <FormularioInput id={"detalle"} value={detalle.detalle} tipo={"text"} texto={"Detalles del pedido"} onChan={onChange} />
                            <Boton btn={{id:tarjeta.id, clase: "comun", texto:tarjeta.texto}} btnClick={btnClick} />
                        </form>
                    ):(
                    <>
                        <AnimatedSVG />
                    </>
                    )}
                    <Boton btn={{id:"cerrar", clase: "cerrar", texto:<FaTimes />}} btnClick={btnClick} />
                    <ModalPago
                        isVisible={modalTarjeta}
                        onClose={handlePagoClose}
                        metodoPago="Tarjeta"
                        onSubmitPago={handlePagoSubmit}
                    />
                </div>
            </div>
        </div>
        </>
    );
};

export default ModalCarrito;