import React, { useContext, useState } from 'react';
import './carrito.css';
import Subtitulo from '../subtitulo/Subtitulo';
import Boton from '../boton/Boton';
import { contexto } from '../contexto/contexto';
import FormularioRadio from '../formularioInput/formularioRadio';

function MetodosPago () {
    const [metodoPago, setMetodoPago] = useState('');
    const {datos} = useContext(contexto);

    const handleChange = (e) => {
        setMetodoPago(e.target.value);
    }
    const btnClick = (e) =>{
        e.preventDefault();    
        console.log(metodoPago); 
    }
    return (
        <>
        <div className="metodos-pago">
            <Subtitulo texto={"Método de pago"} clase={"subtitulo"}/>
            {datos.metodoPago ? (datos.metodoPago.map((dato, index)=>(
                <FormularioRadio nombre={index} tipo={"radio"} valor={dato.metodoPago} onChan={handleChange} texto={dato.metodoPago} key={index}/>
            ))):(null)}
            <Boton btn={{id:"pago", clase: "comun", texto:"Pagar"}} btnClick={btnClick} />
        </div>
        </>
    );
};

export default MetodosPago;