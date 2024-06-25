import { useContext, useEffect, useState } from 'react'
import './MenuDetalles.css'
import Boton from '../boton/Boton';
import MenuDetallesBotoneraCliente from '../menuDetallesBotonera/MenuDetallesBotoneraCliente';
import {  useNavigate } from 'react-router-dom';
import { contexto } from '../contexto/contexto';
import { fetchDelete, fetchGet, fetchPatCh, fetchPut } from '../funciones fetch/funciones';
import { URL_PRODUCTO } from '../../endPoints/endPoints';
import {  FaEdit, FaTrash, FaUndo } from 'react-icons/fa';
import AnimatedSVG from '../animacion/AnimatedSVG';
import AlertaGeneral from '../eliminarAlerta/AlertaGeneral';
import MenuDetalleInterno from './menuDetalleInterno';
import MenuFormulario from './menuFormulario';
import ModalGeneral from '../modalGeneral/modalGeneral';
import ValoracionComponent from '../animacion/valoracionComponente';

function MenuDetalles({ modalClose}) {
    const { datos, setDatos } = useContext(contexto);
    const [ cantidad, setCantidad ] = useState(0);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isEdit, setIsEdit ] = useState(false);
    const [ isEditAlerta, setIsEditAlerta ] = useState(false)
    const [texto, setTexto ] = useState({proceso:false, texto:"procesando...", idTexto: datos.productoActual.deleted?"reactivar":"eliminar", condicion:false});
    const navegate = useNavigate();
    let indice = datos.carrito?.findIndex((carrito)=>(carrito.producto.idProducto===datos.productoActual.idProducto));
    const [menu, setMenu] = useState({
        titulo: "" || datos.productoActual.titulo,
        categoria:"" || datos.productoActual.categoria,
        img: "" || datos.productoActual.img,
        descripcion: "" || datos.productoActual.descripcion,
        ingredientes: "" || datos.productoActual.ingredientes,
        price:"" || datos.productoActual.price,
        valoracion: "" || datos.productoActual.valoracion,
        tipo: "" || datos.productoActual.tipo,
    });
    useEffect(()=>{
            if (indice!=-1) {
                setCantidad(datos.carrito[indice].cantidad); 
            } else {
                setCantidad(0);
            } 
    }, [datos.carrito, indice]);

    const reloadProducto= async(id) =>{
        const respuestaGeneral = await fetchGet(URL_PRODUCTO, localStorage.getItem('token'));
        if (respuestaGeneral) {
            const res = await fetchGet(URL_PRODUCTO+'/'+id, localStorage.getItem('token'));
            if (res) {
                setDatos((prev)=>({...prev,productos:respuestaGeneral, productoActual:res}))
            }
            return res;
        }
    }

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
                const newCarrito = datos.carrito.slice();
                if (indice===-1){
                    const newObjet = { producto:{...datos.productoActual}, cantidad};
                    newCarrito.push(newObjet);
                } else {
                    newCarrito[indice].cantidad=cantidad;
                }
                const filterCarrito = newCarrito.filter((producto)=>{
                    if(producto.cantidad>0) return producto;
                })
                setDatos((prev)=>({...prev, carrito:filterCarrito}));
                modalClose()
                break;
            case "cerrar" :
                    navegate('/menu')
                break;
            default:
                console.log("boton todavía no implementado");
                console.log(btn.toString());
                break;
        }
    }

    const eliminarProducto = async (idProducto) => {
        try {
            const res = await fetchDelete(URL_PRODUCTO+'/'+idProducto, localStorage.getItem('token'));
            if (res==true) {
                const reloadLocal= await reloadProducto(idProducto);
                if (reloadLocal) {
                    setTexto((prev)=>({...prev, idTexto:'reactivar', texto: "El producto fue eliminado con exito", proceso :true, condicion:true}));
                }
            }

        } catch (error) {
            setTexto((prev)=>({...prev, texto: `El producto no pudo ser borrado: ${error.message}`, proceso :true, condicion:true}));
        }
    }

    const reactivarProducto = async (idProducto) =>{
        try {
            const res = await fetchPatCh(URL_PRODUCTO+'/'+idProducto, localStorage.getItem('token'));
            if (res==true) {
                const reloadLocal = await reloadProducto(idProducto);
                if (reloadLocal) setTexto((prev)=>({...prev, idTexto:'eliminar', texto: "El producto fue reactivado con exito", proceso :true, condicion:true}));
            }
        } catch (error) {
            setTexto((prev)=>({...prev, texto: `El producto no pudo ser reactivado: ${error.message}`, proceso :true, condicion:true}));
        }
    }

    const handleEliminarReactivar = (e) => {
        const btn=e.target.id;
        setTexto((prev)=>({...prev, proceso: false, texto:"procesando..."}))
        if (btn =='eliminar') {
            eliminarProducto(datos.productoActual.idProducto)
        } else {
            reactivarProducto(datos.productoActual.idProducto)
        }
    }

    const handleEditar = async (e) => {
        e.preventDefault();
        setTexto((prev)=>({...prev, proceso: false, texto:"procesando...", condicion:true}));
        setIsEditAlerta(true)
        try {
            const res = await fetchPut(URL_PRODUCTO+'/'+datos.productoActual.idProducto, localStorage.getItem('token'), menu);
            if (res) {
                const reloadLocal = await reloadProducto(datos.productoActual.idProducto);
                if (reloadLocal) setTexto((prev)=>({...prev, texto: "El producto fue editado con exito", proceso :true, condicion:false}));
            }
        }catch(error){
            setTexto((prev)=>({...prev, texto: `El producto no pudo ser editado: ${error.message}`, proceso :true, condicion:false}));
        }

    }
    const onClose = ()=>{
        setTexto((prev)=>({...prev, proceso :false, condicion:false}));
        setIsOpen(false)
    }

    const onCloseEdit = ()=>{
        setTexto((prev)=>({...prev, proceso :false, condicion:false}));
        setIsEdit(false);
        setIsEditAlerta(false);
    }

    const handleAlertaOpen = (e) =>{
        const btn = e.currentTarget.id;
        if (btn=='editar'){
            setIsEdit(true)
            setTexto((prev)=>({...prev, proceso:true, texto:`Seguro que desea editar el producto`}))
        } else {
            setTexto((prev)=>({...prev, proceso:true, texto:`Seguro que desea ${datos.productoActual.deleted ? 'reactivar': 'eliminar'} el producto`}))
            setIsOpen(true)
        }
    } 

    return (         
        <>
            <div className={datos.productoActual.deleted? 'menuDetalleEliminado':'menuDetalle'}>
                {datos.userAct && datos.userAct.role ==="admin"?(
                    <div className='botoneraAdministrador'>
                        <button id='editar' className='icono' onClick={handleAlertaOpen} title='editar'><FaEdit/></button>
                        <button id={texto.idTexto} className='icono' onClick={handleAlertaOpen} title='eliminar'>{
                            texto.idTexto== 'eliminar' ? <FaTrash/> : <FaUndo/> }
                        </button>
                    </div>
                ):(
                    null
                )}
                <div className='nuevoDiseno'>
                    <img src={datos.productoActual.img} alt={datos.productoActual.titulo} />
                    <div className='nuevoDiseno-detalles'>
                        <h2> { datos.productoActual.titulo } </h2>
                        <div className='nuevoDiseno-valoracion-precio'>
                            <p>{`Valoración:`}</p>
                            <ValoracionComponent valoracion={datos.productoActual.valoracion}/>
                            <h3> {`$${datos.productoActual.price}`}</h3>
                        </div>
                        <MenuDetallesBotoneraCliente btnClick={btnClick} cantidad={cantidad} />
                        <p>{`${datos.productoActual.descripcion}`}</p>
                        <p id='ingredientes'>{`Ingredientes: ${datos.productoActual.ingredientes}`}</p>
                    </div>
                </div>
                <>
                </>
            </div>
            <AlertaGeneral 
                texto={texto}
                isOpen={isOpen}
                onClose={onClose}
                children={
                    !texto.condicion ? (
                        <>
                    <div>
                        <MenuDetalleInterno />
                    </div>
                    <div className='boton-alerta-pedido'>
                        <Boton btn={{id:texto.idTexto, clase:"alerta", texto: texto.idTexto}} btnClick={handleEliminarReactivar}/>
                        <Boton btn={{id:"cancelar", clase:"alerta", texto: "Cancelar"}} btnClick={onClose}/>
                    </div>
                    </>
                    ):(null)
                }    
            />
            {<AlertaGeneral 
                texto={texto}
                isOpen={isEditAlerta}
                onClose={onCloseEdit}
                children={
                    null
                }
            />}
            <ModalGeneral 
               isOpen={isEdit}
               onClose={onCloseEdit}
               children={
                <>
                   <p className='alertaParrafo'> {`Editar ${datos.productoActual.titulo}`} </p>
                 
                       <MenuFormulario menu={menu} setMenu={setMenu} btnClick={handleEditar} />
                   
                </>
               }
            />
        </>   

    );
};

export default MenuDetalles;