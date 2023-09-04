import Parrafo from '../parrafo/Parrafo';
import './MenuTarjeta.css'

function MenuTarjeta( { dato } ){
    return (
        <div className="menuTarjeta">
            <h5>{dato.title}</h5>
            <img src={dato.img} alt={dato.title} />
            <Parrafo texto={`$ ${dato.price}`} />
        </div>
    );
};
export default MenuTarjeta;