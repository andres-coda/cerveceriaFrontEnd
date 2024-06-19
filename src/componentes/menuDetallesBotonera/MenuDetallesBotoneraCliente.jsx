import { useContext } from 'react';
import Boton from '../boton/Boton';
import Parrafo from '../parrafo/Parrafo';
import './MenuDetallesBotonera.css'
import { contexto } from '../contexto/contexto';
import { FaCartPlus, FaMinus, FaPlus} from 'react-icons/fa';
function MenuDetallesBotoneraCliente({btnClick, cantidad }){
    const {datos}= useContext(contexto)
    return(
        <>      
        <div className='botoneraCliente'>
            <div className='botonesMasMenos'>
                <Boton btn={{id:"menos", clase:"iconBtn", texto: <FaMinus />}} btnClick={btnClick} titulo="quitar unidad del producto"/>
                <Parrafo clase={"menuCantidad"} texto={cantidad} />
                <Boton btn={{id:"mas", clase:"iconBtn", texto: <FaPlus />}} btnClick={btnClick} titulo="agregar unidad del producto"/>
            </div>
            <div className='total'>
                <Parrafo clase={'menuCantidad'} texto={'Total: '} />
                <Parrafo clase={"menuCantidad"} texto={`$${cantidad*Number(datos.productoActual.price)}`} />
            </div>           
            <Boton btn={{id:"aceptar", clase:"iconGrande", texto: <FaCartPlus/>}} btnClick={btnClick} titulo="agregar al carrito"/>
            </div>     
        </>
    );
};

export default MenuDetallesBotoneraCliente;