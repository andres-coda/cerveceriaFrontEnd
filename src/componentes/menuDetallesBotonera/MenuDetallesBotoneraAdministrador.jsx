import Boton from '../boton/Boton';
import './MenuDetallesBotonera.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
function MenuDetallesBotonera({btnClick, idTexto}){
    return(
        <div className='botoneraAdministrador'>
            <Boton btn={{id:"editar", clase:"comun", texto: <FaEdit/>}} btnClick={btnClick}/>
            <Boton btn={{id:idTexto, clase:"comun", texto: <FaTrash/>}} btnClick={btnClick}/>
        </div>
    );
};

export default MenuDetallesBotonera;