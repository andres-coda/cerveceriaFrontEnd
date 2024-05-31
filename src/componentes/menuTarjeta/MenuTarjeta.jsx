import Parrafo from '../parrafo/Parrafo';
import './MenuTarjeta.css'

function MenuTarjeta( { dato, click } ){
    return (
        <div className={dato.deleted ? "menuTarjetaEliminado" : "menuTarjeta"} onClick={click} id={dato.idProducto}>
            <img src={dato.img} alt={dato.titulo} />
            <h5>{dato.titulo}</h5>
            <Parrafo texto={`$ ${dato.price}`} clase={dato.deleted ? "menuPrecioEliminado" : "menuPrecio"} />
        </div>
    );
};
export default MenuTarjeta;