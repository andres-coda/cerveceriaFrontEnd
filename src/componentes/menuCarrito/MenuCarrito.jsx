import Parrafo from '../parrafo/Parrafo';
import './MenuCarrito.css';

function MenuCarrito({ menu, click}){
    return(
        <div className='menuCarritoTarjeta' onClick={click} id={menu.id}>
            <Parrafo clase={'menuParrafo'} texto={menu.cantidad} />
            <h5>{menu.title}</h5>
            <img src={menu.img} alt={menu.title} />
            <Parrafo clase={'menuParrafo'}  texto={`$ ${menu.price*menu.cantidad}`} />
        </div>
    );
};

export default MenuCarrito;