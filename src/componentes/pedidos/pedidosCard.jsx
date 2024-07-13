import { useContext, useEffect, useState } from "react";
import { fetchDelete, fetchPatCh, fetchPut } from "../funciones fetch/funciones";
import AlertaGeneral from "../eliminarAlerta/AlertaGeneral";
import PedidoInternoCard from "./pedidoInternoCard";
import Boton from "../boton/Boton";
import { FaEdit, FaTrash, FaUndo } from 'react-icons/fa';
import { URL_PEDIDO } from "../../endPoints/endPoints";
import FormularioInput from "../formularioInput/FormularioInput";
import ModalGeneral from "../modalGeneral/modalGeneral";
import MenuDetalles from "../menuDetalles/MenuDetalles";
import { contexto } from "../contexto/contexto";
import { Alert } from "react-bootstrap";

function PedidosCard({children, pedido, reload, textoAlerta}) {
    const { setDatos } = useContext(contexto)
    const [isEdit, setIsEdit] = useState(false);
    const [isOpen, setIsOpen ] = useState(false);
    const [ productoOpen, setProductoOpen] = useState(false)
    const [texto, setTexto ] = useState({proceso:false, texto:"procesando...", idTexto: pedido.deleted?"reactivar":"eliminar", condicion:false});
    const [detalle, setDetalle] = useState({detalle: pedido ? pedido.detalle : ''});
    const [isAlerta, setIsAlerta] = useState(false);
    let importe = null;
    if (!importe) {
        importe=0;
        pedido.pedidosProducto.map((producto)=>{
            importe=importe+producto.cantidad*producto.producto.price;
    })}
    const onEdit = ()=>{
        setTexto((prev)=>({
            ...prev, 
            proceso:true, 
            texto: `Desea editar ${textoAlerta}`,
            idTexto: `editar`
        }))
        setIsEdit(true);
    }

    const onDeleted = () => {
        setTexto((prev)=>({
            ...prev, 
            proceso:true, 
            texto: `Desea ${!pedido.deleted ? 'eliminar':'reactivar'} ${textoAlerta}`,
            idTexto: !pedido.deleted ? 'eliminar':'reactivar'
        }))
        setIsOpen(true)
    }

    const onChange = (e)=>{
        setDetalle({
            ...detalle,
            [e.target.name]: e.target.value
        });
    };

    const btnClick = async (e) => {
        const btn = e.target.id;
        setTexto((prev)=>({...prev, proceso: false, texto:"procesando..."}))
        switch (btn) {
            case 'eliminar' :
                try {
                    const response = await fetchDelete(URL_PEDIDO+'/'+pedido.id,localStorage.getItem('token'))
                    if (response==true) {
                        const reloadLocal = await reload();
                        if (reloadLocal) {
                            setTexto((prev)=>({...prev, texto: "El pedido fue eliminado con exito", proceso :true, condicion:true}));
                        }
                    }
                } catch (error) {
                    setTexto((prev)=>({...prev, texto: `El pedido no pudo ser borrado: ${error.message}`, proceso :true, condicion:true}));
                }
            break;
            case 'reactivar' :
                try {
                    const response = await fetchPatCh(URL_PEDIDO+'/'+pedido.id,localStorage.getItem('token'))
                    if (response==true) {
                        const reloadLocal = await reload();
                        if (reloadLocal) setTexto((prev)=>({...prev, texto: "El pedido fue reactivado con exito", proceso :true, condicion:true}));
                    }
                } catch (error) {
                    setTexto((prev)=>({...prev, texto: `El pedido no pudo ser reactivado: ${error.message}`, proceso :true, condicion:true}));
                }
            break;
            case 'editar' :
                try {
                    const pedidoActualizado = {...pedido, detalle:detalle.detalle}
                    const response = await fetchPut(URL_PEDIDO+'/'+pedido.id,localStorage.getItem('token'),pedidoActualizado);
                    if (response) {
                        const reloadLocal = await reload();
                        if (reloadLocal) {
                            setTexto((prev)=>({...prev, texto: "El pedido fue editado con exito", proceso :true, condicion:true}));
                        }
                    }

                } catch (error) {
                    setTexto((prev)=>({...prev, texto: `El pedido no pudo ser editado: ${error.message}`, proceso :true, condicion:true}));
                }

        }
    }

    const handleProductoOpen= (producto) =>{
        if (!producto.deleted) {
            setDatos((prev)=>({...prev, productoActual:producto}));
            setProductoOpen(true);
        } else {
            setTexto((prev)=>({...prev, texto: `El producto ya no se encuentra disponible`, proceso :true, condicion:true}))
            setIsAlerta(true)
        }
    }

    const onClose = () =>{
        setTexto((prev)=>({...prev,proceso:false, texto:"procesando...", idTexto: pedido.deleted?"reactivar":"eliminar", condicion:false}));
        setIsOpen(false);
        setIsEdit(false);
        setIsAlerta(false)
    }

    const productoClose= () =>{
        setDatos((prev)=>({...prev, productoActual:null}));
        setProductoOpen(false);
    }

    return (
        <>
		<div className={!pedido.deleted ? "pedido-card" : "pedido-card-eliminado"} id={pedido.id}>
            <div className='pedido-encabezado'>
                {children}
            </div>
            <div className='pedido-cuerpo'>
                <div className='pedido-productos-content' >
                    {pedido.pedidosProducto.map((producto)=>(
                        <div className='pedido-producto' key={`${pedido.id}-producto-${producto.producto.idProducto}`} onClick={()=>handleProductoOpen(producto.producto)}>
                            <p><b>{producto.cantidad} </b></p>
                            <img src={producto.producto.img} alt={producto.producto.titulo} />
                            <p> {producto.producto.titulo} </p>
                        </div>
                    ))}
                </div>
                <p className='pedido-detalle'>Detalles del pedido: {pedido.detalle}</p>
            <div className='botonera-admin'>
                    <button id='pedido-edit' className='comun' onClick={(e)=> {e.stopPropagation(); onEdit(pedido)}}><FaEdit /></button>
                    <button id='pedido-deleted' className='comun' onClick={(e)=> {e.stopPropagation(); onDeleted(pedido)}}>{ !pedido.deleted ? <FaTrash/> : <FaUndo/> }</button>
            </div>
            </div>
            <p className='pedido-importe'><b>Importe: </b> ${importe} </p>
		</div>
            <ModalGeneral
                isOpen={productoOpen}
                onClose={productoClose}
                children={
                    <MenuDetalles modalClose={productoClose}/>
                }
            />
            <AlertaGeneral
                texto={texto}
                btnClick={btnClick}
                children={
                    !texto.condicion ? (
                        <>
                    <div>
                        <PedidoInternoCard productos={pedido.pedidosProducto} />
                    </div>
                    <div className='boton-alerta-pedido'>
                        <Boton btn={{id:"cancelar", clase:"alerta", texto: "Cancelar"}} btnClick={onClose}/>
                        <Boton btn={{id:texto.idTexto, clase:"alerta", texto: texto.idTexto}} btnClick={btnClick}/>
                    </div>
                    </>
                    ):(null)
                }
                isOpen={isOpen}
                onClose={onClose}
            />
            <AlertaGeneral
                texto={texto}
                btnClick={btnClick}
                children={
                    !texto.condicion ? (
                        <>
                    <div className="pedido-alerta-input">
                        <FormularioInput 
                            id={'detalle'}
                            value={detalle.detalle}
                            tipo={'text'}
                            texto={'Editar el detalle del pedido'}
                            onChan={onChange}
                        />
                    </div>
                    <div className='boton-alerta-pedido'>
                        <Boton btn={{id:"cancelar", clase:"alerta", texto: "Cancelar"}} btnClick={onClose}/>
                        <Boton btn={{id:texto.idTexto, clase:"alerta", texto: texto.idTexto}} btnClick={btnClick}/>
                    </div>
                    </>
                    ):(null)
                }
                isOpen={isEdit}
                onClose={onClose}
            />
            <AlertaGeneral 
                texto={texto}
                onClose={onClose}
                children={null}
                isOpen={isAlerta}
            />
        </>
    )
}

export default PedidosCard;
