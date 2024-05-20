import Parrafo from '../parrafo/Parrafo';
import './MenuTarjeta.css'

function MenuTarjeta( { dato, click } ){
    return (
        <div className={dato.deleted ? "menuTarjetaEliminado" : "menuTarjeta"} onClick={click} id={dato.idProducto}>
            <h5>{dato.titulo}</h5>
            <img src={dato.img} alt={dato.titulo} />
            <Parrafo texto={`$ ${dato.price}`} clase={"menuParrafo"} />
        </div>
    );
};
export default MenuTarjeta;