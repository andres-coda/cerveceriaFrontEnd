import Parrafo from '../parrafo/Parrafo';
import './MenuTarjeta.css'

function MenuTarjeta( { dato, click } ){
    return (
        <div className="menuTarjeta" onClick={click} id={dato.id}>
            <h5>{dato.title}</h5>
            <img src={dato.img} alt={dato.title} />
            <Parrafo texto={`$ ${dato.price}`} clase={"menuParrafo"} />
        </div>
    );
};
export default MenuTarjeta;