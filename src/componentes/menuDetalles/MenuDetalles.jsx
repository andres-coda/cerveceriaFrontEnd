import './MenuDetalles.css'
import {  useContext, useState, useEffect } from "react";
import { contexto } from '../contexto/contexto';
import Parrafo from '../parrafo/Parrafo';
import Boton from '../boton/Boton';
import MenuDetallesBotoneraCliente from '../menuDetallesBotonera/MenuDetallesBotoneraCliente';
import MenuDetallesBotonera from '../menuDetallesBotonera/MenuDetallesBotoneraAdministrador';
import { useNavigate } from 'react-router-dom';
import EliminarAlerta from '../eliminarAlerta/EliminarAlerta';
function MenuDetalles( {dato, setMenuDetalles } ) {
    const {datos,setDatos} = useContext(contexto);
    const [cantidad, setCantidad] = useState(0);
    const [datoCorroborado, setDatoCorroborado] = useState({});
    const navegate = useNavigate();
    const [ admin, setAdmin ] = useState(datos.usuarioActivo.administrador);
    const [ alerta, setAlerta ] = useState(false);
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
                const filterCarrito = newCarrito.filter((dato)=>{
                    if(dato.cantidad>0) return dato;
                })
                setDatos((prev)=>({...prev, carrito:filterCarrito}));
                setMenuDetalles(undefined);
                break;
            case "original" :
                setAdmin(false);
                break;
            case "editar" :
                setDatos((prev)=>({...prev, datoAEditar : dato }));
                navegate('/cargarmenu');             
                break;
            case "eliminar" :
                setAlerta(true);
                break;
            case "cerrar" :
                    console.log(`estiy aqui`);
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
                    {!datos.usuarioActivo.administrador ? (
                        <MenuDetallesBotoneraCliente btnClick={btnClick} cantidad={cantidad} datoCorroborado={datoCorroborado} />
                    ):(
                        <MenuDetallesBotonera btnClick={btnClick} />
                    )}
                </div>
                <Boton  btn={{id:`cerrar`, clase:`cerrar`, texto : `x`}} btnClick={btnClick} />
                { alerta ? (
                    <EliminarAlerta setAlerta={setAlerta} dato={dato} />
                ) : (null)}
            </div>
        </div>
    );
};

export default MenuDetalles;