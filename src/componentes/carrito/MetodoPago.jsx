import React, { useContext, useState } from 'react';
import './Carrito.css';
import Subtitulo from '../subtitulo/Subtitulo';
import Boton from '../boton/Boton';
import { contexto } from '../contexto/contexto';
import FormularioRadio from '../formularioInput/formularioRadio';
import AnimatedSVG from '../animacion/AnimatedSVG';
import FormularioInput from '../formularioInput/FormularioInput';
import { FaTimes } from 'react-icons/fa';

function MetodosPago () {
    const [metodoPago, setMetodoPago] = useState('');
    const {datos} = useContext(contexto);
    const [detalle, setDetalle ] = useState({
        detalle: "",
        metodoPago: "Metodo de pago"
    })

    const onselect=(e) => {
        const select = e.target.value;
        const option= datos.metodoPago.find(metodo => metodo.metodoPago === select);
        setDetalle((prev)=>({...prev, metodoPago: option.metodoPago}));
    
      }

    const onChange = (e) => {
        setDetalle({
            ...detalle,
            [e.target.name]: e.target.value
        })
    }
    const btnClick = (e) =>{
        e.preventDefault();    
        console.log(metodoPago); 
    }
    return (
        <>
        <div className='transparente'>
            <div className="metodos-pago">
                <>
                {console.log(datos.metodoPago)}
                {datos.metodoPago  && datos.metodoPago.length > 0? (
                    <form onSubmit={btnClick} className='formulario'>
                        <FormularioInput 
                            id="metodoPago"
                            value={detalle.metodoPago} 
                            tipo={"select"} 
                            texto={"Metodo de Pago"} 
                            onChan={onselect} 
                            opciones={[...datos.metodoPago.map((metodo) => metodo.metodoPago)]} 
                            />
                        <FormularioInput id={"detalle"} value={detalle.detalle} tipo={"text"} texto={"Detalles del pedido"} onChan={onChange} />
                        <Boton btn={{id:"pago", clase: "comun", texto:"Pagar"}} btnClick={btnClick} />
                    </form>
                ):(
                <>
                    <AnimatedSVG />
                </>
                )}
                <Boton btn={{id:"cerrar", clase: "cerrar", texto:<FaTimes />}} btnClick={btnClick} />
                </>
            </div>
        </div>
        </>
    );
};

export default MetodosPago;