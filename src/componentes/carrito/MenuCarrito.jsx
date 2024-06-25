import { useState, useContext } from 'react';
import './MenuCarrito.css';
import { contexto } from '../contexto/contexto';
import ModalGeneral from '../modalGeneral/modalGeneral';
import MenuDetalles from '../menuDetalles/MenuDetalles';

function MenuCarrito({ menu }){
    const {setDatos} = useContext(contexto)
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => {
        setIsOpen(false);
        setDatos((prev)=>({...prev, productoActual:null}))
    }

    const click = () => {
        setDatos((prev)=>({...prev, productoActual:menu.producto}))
        setIsOpen(true);
    }
    return(
        <>
        <div className='menuCarritoTarjeta' onClick={click} id={menu.producto.idProducto}>
            <img src={menu.producto.img} alt={menu.producto.titulo} /> 
            <div className='carrito-card-uno'>
                <div className='carrito-card-dos'>
                    <p>{menu.cantidad} </p>
                    <h5>{menu.producto.titulo}</h5>
                </div>
                <p>{`$${menu.producto.price*menu.cantidad}`}</p>
            </div> 
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

export default MenuCarrito;