import Boton from '../boton/Boton';
import Parrafo from '../parrafo/Parrafo';
import './EliminarAlerta.css';
import AnimatedSVG from '../animacion/AnimatedSVG';
import { useNavigate } from 'react-router-dom';
function CargarPedidoAlerta({ texto, setTexto }){
    const navegate = useNavigate()
    const btnClick = (e) => {
        const btn = e.target.id;
        if ( btn == "cerrar") {
            if (texto.exito) {
                setTexto((prev)=>({...prev, porceso:false, texto:null }));
                navegate('/menu');
            }
        }
    }
    return (
        <div className='transparenteAlerta'>
            <div className='alertaEliminar'>
                <Parrafo clase={"alertaParrafo"} texto={texto.texto} />
                { texto.proceso ? (
                    <Boton btn={{id:"cerrar", clase:"cerrar", texto: "X"}} btnClick={btnClick}/> 
                ) : (
                    <AnimatedSVG />
                )}
            </div>
        </div>
    );
};

export default CargarPedidoAlerta;