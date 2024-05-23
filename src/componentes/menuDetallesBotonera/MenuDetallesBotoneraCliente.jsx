import Boton from '../boton/Boton';
import Parrafo from '../parrafo/Parrafo';
import './MenuDetallesBotonera.css'
function MenuDetallesBotoneraCliente({btnClick, cantidad, dato}){
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
            </div>           
        </>
    );
};

export default MenuDetallesBotoneraCliente;