import './MenuDetalles.css'
import { useContext, useState, useEffect } from "react";
import { contexto } from '../contexto/contexto';
import { useNavigate } from 'react-router-dom';
import Parrafo from '../parrafo/Parrafo';
import Boton from '../boton/Boton';
function MenuDetalles( {dato} ) {
    const { datos, setDatos } = useContext(contexto);
    const navigate = useNavigate();
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
                navigate('/menu');
                break;
            default:
                console.log("boton todavía no implementado");
                break;
        }
    }
    return (
        <div className="transparente">
            <div className='menuDetalle'>
                <h2> { dato.category } </h2>
                <h3> { dato.title } </h3>
                <div className='menuFotoDescripcion'>
                    <img src={dato.img} alt={dato.title} />
                    <Parrafo texto={dato.description} />
                </div>
                <Parrafo texto={dato.ingredients}/>
                <div className='valoracionPrecio'>
                    <Parrafo texto={`VARLORACION: ${dato.valoration}`}/>
                    <Parrafo texto={`$ ${dato.price}`}/>
                </div>
                <div className='botonesMasMenos'>
                    <Boton btn={{id:"menos", clase:"comun", texto: "-"}} btnClick={btnClick}/>
                    <Parrafo texto={cantidad} />
                    <Boton btn={{id:"mas", clase:"comun", texto: "+"}} btnClick={btnClick}/>
                </div>
                <div className='total'>
                    <Parrafo texto={`$ ${cantidad*dato.price}`} />
                    <Boton btn={{id:"aceptar", clase:"comun", texto: "añadir al carrito"}} btnClick={btnClick}/>
                </div>
                <Boton  btn={{id:`cerrar`, clase:`cerrar`, texto : `x`}} btnClick={btnClick} />
            </div>
        </div>
    );
};

export default MenuDetalles;