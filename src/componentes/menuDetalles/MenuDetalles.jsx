import './MenuDetalles.css'
import {  useContext, useState, useEffect } from "react";
import { contexto } from '../contexto/contexto';
import Parrafo from '../parrafo/Parrafo';
import Boton from '../boton/Boton';
function MenuDetalles( {dato, setMenuDetalles } ) {
    const {datos,setDatos} = useContext(contexto);
    const [cantidad, setCantidad] = useState(0);
    let indice = datos.carrito?.findIndex((carrito)=>(carrito.id===dato.id));
    useEffect(()=>{
        if (indice!=-1) {
            setCantidad(datos.carrito[indice].cantidad); 
        } else {
            setCantidad(0);
        }
    }, [datos.carrito, indice]);

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
                const newCarrito = datos.carrito.slice();
                if (indice===-1){
                    const newObjet = { ...dato, cantidad};
                    newCarrito.push(newObjet);
                } else {
                    newCarrito[indice].cantidad=cantidad;
                }
                setDatos((prev)=>({...prev, carrito:newCarrito}));
                setMenuDetalles(undefined);
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