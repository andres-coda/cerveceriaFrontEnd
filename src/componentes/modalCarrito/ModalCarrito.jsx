import React, { useContext, useState } from 'react';
import './Modal.css';
import Boton from '../boton/Boton';
import { contexto } from '../contexto/contexto';
import AnimatedSVG from '../animacion/AnimatedSVG';
import FormularioInput from '../formularioInput/FormularioInput';
import { FaTimes } from 'react-icons/fa';
import { convertEnumValueToDisplayValue } from '../../utils/convertValue';
import { URL_PEDIDO } from '../../endPoints/endPoints';
import ModalPago from '../reservas/ModalPago';

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
        metodoPago: "Metodo de pago"
    });
    const [modalTarjeta, setModalTarjeta] =useState(false);

    const handlePagoClose = () => {
        setModalTarjeta(false);
    };

    const handlePagoSubmit= (datos) => {
        console.log(datos);
        setTarjeta((prev)=>({...prev, texto: "Realizar pedido", id: "pago"}))
    };

    const pago = async (e)=> {
        try {
            const pedido = {
                fecha: new Date(),
                detalle: detalle.detalle,
                usuario: datos.userAct.sub,
                metodoPago: detalle.metodoPago
            }
            const resp = await fetchPost(URL_PEDIDO, localStorage.getItem('token'), pedido)
            if (resp==true) {
                setTexto((prev)=>({...prev, texto:"El pedido fue aprobado", estado:true}));
            }

        }catch (error) {
            setTexto((prev)=>({...prev, texto: "El pedido no fue aprobado"}))

        }
    }

    const onselect=(e) => {
        const select = e.target.value;
        const option= datos.metodoPago.find(metodo => convertEnumValueToDisplayValue(metodo.metodoPago) === select);
        setDetalle((prev)=>({...prev, metodoPago: convertEnumValueToDisplayValue(option.metodoPago)}));
    
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
                setTexto((prev)=>({...prev, texto:"Procesando pedido...", estado:true}));
                pago();
            break;
            case "tarjeta" :
                setModalTarjeta(true)
            default:
                console.log("boton no implementado");
            break;
        }
    }

    if (texto.espera) {
        if (datos.metodoPago  && datos.metodoPago.length > 0) {
            setTexto((prev)=>({...prev, espera:false}))
        }
    }

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