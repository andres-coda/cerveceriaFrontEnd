import { useContext, useEffect, useState } from 'react'
import './MenuDetalles.css'
import Parrafo from '../parrafo/Parrafo';
import Boton from '../boton/Boton';
import MenuDetallesBotoneraCliente from '../menuDetallesBotonera/MenuDetallesBotoneraCliente';
import {  useNavigate } from 'react-router-dom';
import MenuDetallesBotonera from '../menuDetallesBotonera/MenuDetallesBotoneraAdministrador';
import { contexto } from '../contexto/contexto';
import EliminarAlerta from '../eliminarAlerta/EliminarAlerta';
import { fetchGet } from '../funciones fetch/funciones';
import { URL_PRODUCTO } from '../../endPoints/endPoints';
import {  FaTimes } from 'react-icons/fa';
import AnimatedSVG from '../animacion/AnimatedSVG';
import AlertaGeneral from '../eliminarAlerta/AlertaGeneral';
import { text } from '@fortawesome/fontawesome-svg-core';
import MenuDetalleInterno from './menuDetalleInterno';

function MenuDetalles({producto}) {
    const { datos, setDatos } = useContext(contexto);
    const [ cantidad, setCantidad ] = useState(0);
    const [ alerta, setAlerta ] = useState({estado:false, refresh:false});
    const [ isOpen, setIsOpen ] = useState(false);
    const [texto, setTexto ] = useState({proceso:false, texto:"procesando...", idTexto: producto.deleted?"reactivar":"eliminar", condicion:false});
    const navegate = useNavigate();
    let indice = datos.carrito?.findIndex((carrito)=>(carrito.idProducto===producto.idProducto));
   
    useEffect(()=>{
            if (indice!=-1) {
                setCantidad(datos.carrito[indice].cantidad); 
            } else {
                setCantidad(0);
            } 

    }, [datos.carrito, indice]);

    const btnClick = async (e) => {
        const btn = e.currentTarget.id;
        switch(btn){
            case "menos":
                setCantidad((prev)=>(prev> 0 ? prev-=1 : 0));
                break;
            case "mas":
                setCantidad((prev)=>(prev+=1));
                break;
            case "aceptar":
                if( !datos.userAct ) navegate('/login')
                const newCarrito = datos.carrito.slice();
                if (indice===-1){
                    const newObjet = { ...producto, cantidad};
                    newCarrito.push(newObjet);
                } else {
                    newCarrito[indice].cantidad=cantidad;
                }
                const filterCarrito = newCarrito.filter((producto)=>{
                    if(producto.cantidad>0) return producto;
                })
                setDatos((prev)=>({...prev, carrito:filterCarrito}));
                navegate('/menu')
                break;
            case "original" :
                setVista(true);
                break;
            case "volver" :
                setVista(false);
                break;
            case "editar" :
                setDatos((prev)=>({...prev, datoAEditar: producto}));
                navegate('/cargarmenu');
                break;
            case "eliminar" :
                setIsOpen(true);
                setTexto((prev)=>({...prev, proceso:true, texto:`Seguro que desea ${producto.deleted ? 'reactivar': 'eliminar'} el producto`}))
                break
            case "reactivar" :
                setAlerta((prev)=>({...prev,estado:true}));  
                break
            case "cerrar" :
                    navegate('/menu')
                break;
            default:
                console.log("boton todavía no implementado");
                console.log(btn.toString());
                break;
        }
    }

    const onClose = ()=>{
        setIsOpen(false)
    }

    const handleAlertaOpen = (e) =>{
        const btn = e.currentTarget.id;
        if (btn=='editar'){
            console.log(btn);
            setTexto((prev)=>({...prev, proceso:true, texto:`Seguro que desea editar el producto`}))
        } else {
            setTexto((prev)=>({...prev, proceso:true, texto:`Seguro que desea ${producto.deleted ? 'reactivar': 'eliminar'} el producto`}))
            setIsOpen(true)
        }
    } 

    return (         
        <>
            <div className={producto.deleted? 'menuDetalleEliminado':'menuDetalle'}>
                <div className='nuevoDiseno'>
                    <img src={producto.img} alt={producto.titulo.nombre} />
                    <div className='nuevoDiseno-detalles'>
                        <h2> { producto.titulo } </h2>
                        <div className='nuevoDiseno-valoracion-precio'>
                            <p>{`Valoración: ${producto.valoracion}`}</p>
                            <h3> {`$${producto.price}`}</h3>
                        </div>
                        <MenuDetallesBotoneraCliente btnClick={btnClick} cantidad={cantidad} dato={producto} />
                        <p>{`${producto.descripcion}`}</p>
                        <p id='ingredientes'>{`Ingredientes: ${producto.ingredientes}`}</p>
                    </div>
                </div>
                <>
                </>
            </div>
            {/* alerta.estado ? (
                <EliminarAlerta setAlerta={setAlerta} dato={producto} idTexto={idTexto}/>
            ) : (null)*/}
            <AlertaGeneral 
                texto={texto}
                isOpen={isOpen}
                onClose={onClose}
                children={
                    !texto.condicion ? (
                        <>
                    <div>
                        <MenuDetalleInterno producto={producto} />
                    </div>
                    <div className='boton-alerta-pedido'>
                        <Boton btn={{id:texto.idTexto, clase:"alerta", texto: texto.idTexto}} btnClick={btnClick}/>
                        <Boton btn={{id:"cancelar", clase:"alerta", texto: "Cancelar"}} btnClick={onClose}/>
                    </div>
                    </>
                    ):(null)
                }    
            />
        </>   

    );
};

export default MenuDetalles;