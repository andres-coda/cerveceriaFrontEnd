import { useContext } from 'react';
import Boton from '../boton/Boton';
import Parrafo from '../parrafo/Parrafo';
import './MenuDetallesBotonera.css'
import { contexto } from '../contexto/contexto';
import { FaCartPlus, FaMinus, FaPlus} from 'react-icons/fa';
function MenuDetallesBotoneraCliente({btnClick, cantidad, dato}){
    const {datos}= useContext(contexto)
    return(
        <>           
            <div className='botonesMasMenos'>
                <Boton btn={{id:"menos", clase:"iconBtn", texto: <FaMinus />}} btnClick={btnClick}/>
                <Parrafo clase={"menuParrafo"} texto={cantidad} />
                <Boton btn={{id:"mas", clase:"iconBtn", texto: <FaPlus />}} btnClick={btnClick}/>
            </div>
            <div className='total'>
                <Parrafo clase={"menuParrafo"} texto={`TOTAL: $${cantidad*Number(dato.price)}`} />
                <Boton btn={{id:"aceptar", clase:"iconGrande", texto: <FaCartPlus/>}} btnClick={btnClick}/>
            </div>           
        </>
    );
};

export default MenuDetallesBotoneraCliente;