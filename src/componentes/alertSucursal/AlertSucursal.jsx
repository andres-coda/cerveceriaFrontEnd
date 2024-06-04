import { useContext, useState } from 'react';
import Boton from '../boton/Boton';
import Parrafo from '../parrafo/Parrafo';
/* import './EliminarAlerta.css';
 */import { contexto } from '../contexto/contexto';
import AnimatedSVG from '../animacion/AnimatedSVG';

function AlertSucursal({ setAlerta, idTexto, handleAlertAction, mensaje, IsSaveng }) {
    const { setDatos } = useContext(contexto);
    const [texto, setTexto] = useState({
        texto: mensaje,
        condicion: true,
    });

    const btnClick = (e) => {
        const btn = e.target.id;
        setTexto({ texto: <AnimatedSVG />, condicion: false });
        handleAlertAction(btn);
    };

    return (
        <div className='transparenteAlerta'>
            <div className='alertaEliminar'>
                <Parrafo clase={"alertaParrafo"} texto={texto.texto} />
                {texto.condicion ? (
                    <div className='botonSiNo'>
                        <Boton btn={{ id: idTexto, clase: "alerta", texto: idTexto }} btnClick={btnClick} />
                        <Boton btn={{ id: "cancelar", clase: "alerta", texto: "Cancelar" }} btnClick={btnClick} />
                    </div>
                ) : null}
                <Boton btn={{ id: "cerrar", clase: "cerrar", texto: "X" }} btnClick={btnClick} />
            </div>
        </div>
    );
};

export default AlertSucursal;
