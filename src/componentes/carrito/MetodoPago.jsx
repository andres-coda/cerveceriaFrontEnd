import React, { useContext, useState } from 'react';
import './Carrito.css';
import Subtitulo from '../subtitulo/Subtitulo';
import Boton from '../boton/Boton';
import { contexto } from '../contexto/contexto';
import FormularioRadio from '../formularioInput/formularioRadio';
import AnimatedSVG from '../animacion/AnimatedSVG';
import FormularioInput from '../formularioInput/FormularioInput';

function MetodosPago () {
    const [metodoPago, setMetodoPago] = useState('');
    const {datos} = useContext(contexto);
    const [detalle, setDetalle ] = useState({
        detalle: "",
        metodoPago: "Metodo de pago"
    })

    const onselect=(e) => {
        const select = e.target.value;
        const option= datos.metodosPago.find(metodo => metodo.metodoPago === select);
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
        <div className="metodos-pago">
            <Subtitulo texto={"Método de pago"} clase={"subtitulo"}/>
            {datos.metodosPago  && datos.metodosPago.length > 0? (
                <>
                <FormularioInput 
                    id="metodoPago"
                    value={detalle.metodoPago} 
                    tipo={"select"} 
                    texto={"Metodo de Pago"} 
                    onChan={onselect} 
                    opciones={[...datos.metodosPago.map((metodo) => metodo.metodoPago)]} 
                />
                    {datos.metodoPago.map((dato, index)=>(
                            <FormularioRadio nombre={index} tipo={"radio"} valor={dato.metodoPago} onChan={onselect} texto={dato.metodoPago} key={index}/>
                    ))}
                    <FormularioInput id={"detalle"} value={detalle.detalle} tipo={"text"} texto={"Detalles del pedido"} onChan={onChange} />
                    <Boton btn={{id:"pago", clase: "comun", texto:"Pagar"}} btnClick={btnClick} />
                </>
            ):(
            <>
                <AnimatedSVG />
            </>
            )}
        </div>
        </>
    );
};

export default MetodosPago;