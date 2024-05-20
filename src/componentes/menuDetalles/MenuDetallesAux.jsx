import { useContext, useEffect, useState } from 'react'
import './MenuDetalles.css'
import Parrafo from '../parrafo/Parrafo';
import Boton from '../boton/Boton';
import MenuDetallesBotoneraCliente from '../menuDetallesBotonera/MenuDetallesBotoneraCliente';
import context from 'react-bootstrap/esm/AccordionContext';
import { useNavigate } from 'react-router-dom';
import { contexto } from '../contexto/contexto';
import MenuDetallesBotonera from '../menuDetallesBotonera/MenuDetallesBotoneraAdministrador';

function MenuDetallesAux({dato, setMenuDetalles}) {
    const URL_PRODUCTO = `http://localhost:3000/producto/${dato.idProducto}`
    const [ datoCorroborado, setDatoCorroborado ] = useState({});
    const { datos, setDatos } = useContext(contexto);
    const [ cantidad, setCantidad ] = useState(0);
    const [ vista, setVista ] = useState(false);
    const navegate = useNavigate();
    let indice = datos.carrito?.findIndex((carrito)=>(carrito.idProducto===dato.idProducto));
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
                const filterCarrito = newCarrito.filter((dato)=>{
                    if(dato.cantidad>0) return dato;
                })
                setDatos((prev)=>({...prev, carrito:filterCarrito}));
                setMenuDetalles(undefined);
                break;
            case "original" :
                setVista(true);
                break;
            case "editar" :
                console.log("estoy");
                setDatos((prev)=>({...prev, datoAEditar: dato}));
            case "cerrar" :
                    setMenuDetalles(undefined)
                break;
            default:
                console.log("boton todavía no implementado");
                break;
        }
    }

    useEffect(() => {
        if (datos.datoAEditar) {
            console.log(datos.datoAEditar);
            navegate('/cargarmenu');
        }
    }, [datos.datoAEditar, navegate]);

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
                    <>
                        {datos.userAct.role ==="admin" && vista === false ? (
                            <MenuDetallesBotonera btnClick={btnClick} />
                        ) : (
                            <MenuDetallesBotoneraCliente btnClick={btnClick} cantidad={cantidad} datoCorroborado={datoCorroborado} />
                        )}
                    </>
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