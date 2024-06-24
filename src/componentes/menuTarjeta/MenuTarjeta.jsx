import { useContext, useState } from 'react';
import ModalGeneral from '../modalGeneral/modalGeneral';
import Parrafo from '../parrafo/Parrafo';
import './MenuTarjeta.css'
import MenuDetalles from '../menuDetalles/MenuDetalles';
import { contexto } from '../contexto/contexto';

function MenuTarjeta( { dato } ){
    const [isOpen, setIsOpen] = useState(false);
    const { setDatos} = useContext(contexto);
    const clickTarjeta=()=>{
        setDatos((prev)=>({...prev, productoActual:dato}))
        setIsOpen(true)
    }
    const onClose=()=>{
        setIsOpen(false)
    }
    return (
        <>
        <div className={dato.deleted ? "menuTarjetaEliminado" : "menuTarjeta"} onClick={clickTarjeta} id={dato.idProducto}>
            <img src={dato.img} alt={dato.titulo} />
            <h5>{dato.titulo}</h5>
            <Parrafo texto={`$ ${dato.price}`} clase={dato.deleted ? "menuPrecioEliminado" : "menuPrecio"} />
        </div>
        <ModalGeneral
            isOpen={isOpen}
            onClose={onClose}
            children={
                <MenuDetalles modalClose={onClose}/>
            }
        />
        </>
    );
};
export default MenuTarjeta;