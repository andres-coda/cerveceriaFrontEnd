import { useContext } from 'react';
import Boton from '../boton/Boton';
import Parrafo from '../parrafo/Parrafo';
import './MenuDetallesBotonera.css'
import { contexto } from '../contexto/contexto';
function MenuDetallesBotoneraCliente({btnClick, cantidad, dato}){
    const {datos}= useContext(contexto)
    return(
        <>           
            <div className='botonesMasMenos'>
                <Boton btn={{id:"menos", clase:"mas-menos", texto: "-"}} btnClick={btnClick}/>
                <Parrafo clase={"menuParrafo"} texto={cantidad} />
                <Boton btn={{id:"mas", clase:"mas-menos", texto: "+"}} btnClick={btnClick}/>
            </div>
            <div className='total'>
                <Parrafo clase={"menuParrafo"} texto={`TOTAL: $${cantidad*Number(dato.price)}`} />
                <Boton btn={{id:"aceptar", clase:"comun", texto: "añadir al carrito"}} btnClick={btnClick}/>
                {datos.userAct && datos.userAct.role ==="admin" ? (
                    <Boton btn={{id:"volver", clase:"comun", texto: "volver vista administrador"}} btnClick={btnClick}/>
                ) : (null)}
            </div>           
        </>
    );
};

export default MenuDetallesBotoneraCliente;