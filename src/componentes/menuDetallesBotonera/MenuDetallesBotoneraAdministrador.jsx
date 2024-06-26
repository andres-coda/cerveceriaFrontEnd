import Boton from '../boton/Boton';
import './MenuDetallesBotonera.css';
import { FaEdit, FaTrash, FaUndo } from 'react-icons/fa';
function MenuDetallesBotonera({btnClick, idTexto}){
    return(
        <div className='botoneraAdministrador'>
            <Boton btn={{id:"editar", clase:"icono", texto: <FaEdit/>}} btnClick={btnClick} titulo="editar"/>
            <Boton btn={{id:idTexto, clase:"icono", texto: idTexto === "eliminar" ? <FaTrash/> : <FaUndo/>}} btnClick={btnClick} titulo={idTexto}/>
        </div>
    );
};

export default MenuDetallesBotonera;