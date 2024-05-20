import { useContext, useEffect, useState } from 'react'
import './MenuDetalles.css'
import Parrafo from '../parrafo/Parrafo';
import Boton from '../boton/Boton';
import MenuDetallesBotoneraCliente from '../menuDetallesBotonera/MenuDetallesBotoneraCliente';
import { useNavigate } from 'react-router-dom';
import MenuDetallesBotonera from '../menuDetallesBotonera/MenuDetallesBotoneraAdministrador';
import { useAuth } from '../auth/AuthContext';
import { contexto } from '../contexto/contexto';
import EliminarAlerta from '../eliminarAlerta/EliminarAlerta';

function MenuDetallesAux({dato, setMenuDetalles}) {
    const { datos, setDatos } = useContext(contexto);
    const [ cantidad, setCantidad ] = useState(0);
    const [ vista, setVista ] = useState(false);
    const [ alerta, setAlerta ] = useState(false);
    const navegate = useNavigate();
    let indice = datos.carrito?.findIndex((carrito)=>(carrito.idProducto===dato.idProducto));

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
                setDatos((prev)=>({...prev, datoAEditar: dato}));
                if (datos.datoAEditar) {
                    navegate('/cargarmenu');
                };
                break;
            case "eliminar" :
                setAlerta(true);
                break
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
            {dato != {} && dato.categoria != undefined && dato.tipo != undefined ? (
                <>     
                <div className="transparente">
            <div className={dato.deleted ? 'menuDetalleElementosEliminado' : 'menuDetalleElementos'}>            
                <div className='menuDetalle'>
                    <h3> { dato.categoria.nombre } </h3>
                    <h2> { dato.titulo } </h2>
                    <div className='menuFotoDescripcion'>
                        <img src={dato.img} alt={dato.titulo.nombre} />
                        <Parrafo clase={"menuParrafo"} texto={`DESCRIPCIÓN: ${dato.descripcion}`} />
                        <Parrafo clase={"menuParrafo"} texto={`INGREDIENTES: ${dato.ingredientes}`}/>
                    </div>
                    <div className='valoracionPrecio'>
                        <Parrafo clase={"menuParrafo"} texto={`VARLORACION: ${dato.valoracion}`}/>
                        <Parrafo clase={"menuParrafo"} texto={`PRECIO: $${dato.price}`}/>
                    </div>
                    <>
                        {datos.userAct && datos.userAct.role ==="admin" && vista === false ? (
                                <MenuDetallesBotonera btnClick={btnClick} dato={dato}/>
                        ) : (
                            <MenuDetallesBotoneraCliente btnClick={btnClick} cantidad={cantidad} dato={dato} />
                        )}
                    </>
                </div>
                <Boton  btn={{id:`cerrar`, clase:`cerrar`, texto : `x`}} btnClick={btnClick} />
                { alerta ? (
                    <EliminarAlerta setAlerta={setAlerta} dato={dato} />
                ) : (null)}
            </div>
        </div>
        </>

        ): (null)}
        </div>
    );
};

export default MenuDetallesAux;