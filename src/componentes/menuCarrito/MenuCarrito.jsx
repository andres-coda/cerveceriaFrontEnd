import Parrafo from '../parrafo/Parrafo';
import './MenuCarrito.css';

function MenuCarrito({ menu, click}){
    return(
        <div className='menuCarritoTarjeta' onClick={click} id={menu.idProducto}>
            <Parrafo clase={'menuParrafo'} texto={menu.cantidad} />
            <h5>{menu.titulo}</h5>
            <img src={menu.img} alt={menu.titulo} />
            <Parrafo clase={'menuParrafo'}  texto={`$${menu.price*menu.cantidad}`} />
        </div>
    );
};

export default MenuCarrito;