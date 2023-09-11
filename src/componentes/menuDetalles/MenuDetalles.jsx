import './MenuDetalles.css'
import {  useState } from "react";
import Parrafo from '../parrafo/Parrafo';
import Boton from '../boton/Boton';
function MenuDetalles( {dato, setMenuDetalles } ) {
    let [cantidad, setCantidad] = useState(0);
    const btnClick =(e) => {
        const btn = e.target.id;
        switch(btn){
            case "menos":
                setCantidad((prev)=>(prev> 0 ? prev-=1 : 0));
                break;
            case "mas":
                setCantidad((prev)=>(prev+=1));
                break;
            case "aceptar":
                console.log("preciono aceptar");
                break;
            case "cerrar" :
                setMenuDetalles(undefined);
                break;
            default:
                console.log("boton todavía no implementado");
                break;
        }
    }
    return (
        <div className="transparente">
            <div className='menuDetalleElementos'>            
                <div className='menuDetalle'>
                    <h3> { dato.category } </h3>
                    <h2> { dato.title } </h2>
                    <div className='menuFotoDescripcion'>
                        <img src={dato.img} alt={dato.title} />
                        <Parrafo texto={`DESCRIPCIÓN: ${dato.description}`} />
                        <Parrafo texto={`INGREDIENTES: ${dato.ingredients}`}/>
                    </div>
                    <div className='valoracionPrecio'>
                        <Parrafo texto={`VARLORACION: ${dato.valoration}`}/>
                        <Parrafo texto={`PRECIO: $${dato.price}`}/>
                    </div>
                    <div className='botonesMasMenos'>
                        <Boton btn={{id:"menos", clase:"comun", texto: "-"}} btnClick={btnClick}/>
                        <Parrafo texto={cantidad} />
                        <Boton btn={{id:"mas", clase:"comun", texto: "+"}} btnClick={btnClick}/>
                    </div>
                    <div className='total'>
                        <Parrafo texto={`TOTAL: $${cantidad*dato.price}`} />
                        <Boton btn={{id:"aceptar", clase:"comun", texto: "añadir al carrito"}} btnClick={btnClick}/>
                    </div>
                </div>
                <Boton  btn={{id:`cerrar`, clase:`cerrar`, texto : `x`}} btnClick={btnClick} />
            </div>
        </div>
    );
};

export default MenuDetalles;