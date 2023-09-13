import './MenuDetalles.css'
import {  useContext, useState, useEffect } from "react";
import { contexto } from '../contexto/contexto';
import Parrafo from '../parrafo/Parrafo';
import Boton from '../boton/Boton';
function MenuDetalles( {dato, setMenuDetalles } ) {
    const {datos,setDatos} = useContext(contexto);
    const [cantidad, setCantidad] = useState(0);
    const [datoCorroborado, setDatoCorroborado] = useState({});
    let indice = datos.carrito?.findIndex((carrito)=>(carrito.id===dato.id));
    useEffect(()=>{
        fetch(`http://localhost:3000/menu/${dato.id}`)
        .catch(error =>{
            console.error(`Error en el fetch: `, error);
            throw error;
        })
        .then(res=> res.json())
        .then(data =>{
            setDatoCorroborado(data);
    });
    },[]);
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
                    <h3> { datoCorroborado.category } </h3>
                    <h2> { datoCorroborado.title } </h2>
                    <div className='menuFotoDescripcion'>
                        <img src={datoCorroborado.img} alt={datoCorroborado.title} />
                        <Parrafo clase={"menuParrafo"} texto={`DESCRIPCIÓN: ${datoCorroborado.description}`} />
                        <Parrafo clase={"menuParrafo"} texto={`INGREDIENTES: ${datoCorroborado.ingredients}`}/>
                    </div>
                    <div className='valoracionPrecio'>
                        <Parrafo clase={"menuParrafo"} texto={`VARLORACION: ${datoCorroborado.valoration}`}/>
                        <Parrafo clase={"menuParrafo"} texto={`PRECIO: $${datoCorroborado.price}`}/>
                    </div>
                    <div className='botonesMasMenos'>
                        <Boton btn={{id:"menos", clase:"mas-menos", texto: "-"}} btnClick={btnClick}/>
                        <Parrafo clase={"menuParrafo"} texto={cantidad} />
                        <Boton btn={{id:"mas", clase:"mas-menos", texto: "+"}} btnClick={btnClick}/>
                    </div>
                    <div className='total'>
                        <Parrafo clase={"menuParrafo"} texto={`TOTAL: $${cantidad*datoCorroborado.price}`} />
                        <Boton btn={{id:"aceptar", clase:"comun", texto: "añadir al carrito"}} btnClick={btnClick}/>
                    </div>
                </div>
                <Boton  btn={{id:`cerrar`, clase:`cerrar`, texto : `x`}} btnClick={btnClick} />
            </div>
        </div>
    );
};

export default MenuDetalles;