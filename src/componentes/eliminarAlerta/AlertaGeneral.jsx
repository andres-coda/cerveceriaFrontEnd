import React from 'react';
import './EliminarAlerta.css';
import Boton from '../boton/Boton';
import AnimatedSVG from '../animacion/AnimatedSVG';
import Parrafo from '../parrafo/Parrafo';

function AlertaGeneral({texto, children, isOpen, onClose}) {
    if (!isOpen) return null;
    return(
        <div className='transparenteAlerta'>
        <div className='alertaEliminar'>
            <Parrafo clase={"alertaParrafo"} texto={texto.texto} />
            { texto.proceso ? (
                <>
                    <Boton btn={{id:"cerrar", clase:"cerrar", texto: "X"}} btnClick={onClose}/> 
                    {children}
                </>
            ) : (
                <AnimatedSVG />
            )}
        </div>
    </div>
    )
}
export default AlertaGeneral;