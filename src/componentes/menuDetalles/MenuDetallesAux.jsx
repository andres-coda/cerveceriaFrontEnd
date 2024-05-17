import { useContext, useEffect, useState } from 'react'
import './MenuDetalles.css'
import Parrafo from '../parrafo/Parrafo';
import Boton from '../boton/Boton';
import MenuDetallesBotoneraCliente from '../menuDetallesBotonera/MenuDetallesBotoneraCliente';
import context from 'react-bootstrap/esm/AccordionContext';
import { useNavigate } from 'react-router-dom';

function MenuDetallesAux({dato, setMenuDetalles}) {
    const URL_PRODUCTO = `http://localhost:3000/producto/${dato.idProducto}`
    const [ datoCorroborado, setDatoCorroborado ] = useState({});
    const [ cantidad, setCantidad ] = useState(0);
    const navegate = useNavigate();
    useEffect(()=>{
        fetch(URL_PRODUCTO)
        .then(res=> res.json())
        .then(data =>{
            setDatoCorroborado(data);
        })
        .catch(error => {
            console.error(`Error en el fetch. al intentar leer el producto: `, error);
        })
    },[dato.idProducto]);

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
                navegate("/menu")
                break;
                case "cerrar" :
                    setMenuDetalles(undefined)
                break;
            default:
                console.log("boton todavía no implementado");
                break;
        }
    }

    return (
        <div >
            {datoCorroborado != {} && datoCorroborado.categoria != undefined && datoCorroborado.tipo != undefined ? (
                <>     
                <div className="transparente">
            <div className='menuDetalleElementos'>            
                <div className='menuDetalle'>
                    <h3> { datoCorroborado.categoria.nombre } </h3>
                    <h2> { datoCorroborado.titulo } </h2>
                    <div className='menuFotoDescripcion'>
                        <img src={datoCorroborado.img} alt={datoCorroborado.titulo.nombre} />
                        <Parrafo clase={"menuParrafo"} texto={`DESCRIPCIÓN: ${datoCorroborado.descripcion}`} />
                        <Parrafo clase={"menuParrafo"} texto={`INGREDIENTES: ${datoCorroborado.ingredientes}`}/>
                    </div>
                    <div className='valoracionPrecio'>
                        <Parrafo clase={"menuParrafo"} texto={`VARLORACION: ${datoCorroborado.valoracion}`}/>
                        <Parrafo clase={"menuParrafo"} texto={`PRECIO: $${datoCorroborado.price}`}/>
                    </div>
                    <MenuDetallesBotoneraCliente btnClick={btnClick} cantidad={cantidad} datoCorroborado={datoCorroborado} />
                </div>
                <Boton  btn={{id:`cerrar`, clase:`cerrar`, texto : `x`}} btnClick={btnClick} />
            </div>
        </div>
        </>

        ): (null)}
        </div>
    );
};

export default MenuDetallesAux;