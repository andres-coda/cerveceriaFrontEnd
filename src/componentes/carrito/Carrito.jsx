import './Carrito.css';
import Subtitulo from '../subtitulo/Subtitulo';
import { useContext, useEffect, useState } from 'react';
import { contexto } from '../contexto/contexto';
import MenuCarrito from './MenuCarrito';
import Parrafo from '../parrafo/Parrafo';
import Boton from '../boton/Boton';
import { useNavigate } from 'react-router-dom';
import ModalCarrito from './ModalCarrito';

function Carrito(){
    const {datos} = useContext(contexto);
    const navegate = useNavigate();
    const [total, setTotal] = useState(0);
    const [ menuDetalle, setMenuDetalle ] = useState(undefined);
    const [modal, setModal ] = useState({
        modalVisible: false,
        metodoPago: false
    })

    let subTotal = 0;
    
    const btnClick = (e) => {
        const btn = e.currentTarget.id;
        switch (btn) {
            case "comprar" :
                setModal((prev)=>({...prev, metodoPago:true}));
            break;
            case "login" :
                navegate('/login');
            break;
            default:
                console.log(btn);
                console.log(datos.productos);
                const producto = datos.productos.find((dato)=> Number(dato.idProducto)===Number(btn));
                setMenuDetalle(producto);
            break;

        }
    }

    useEffect(()=>{
        setTotal(subTotal); 
    },[subTotal, datos.carrito]);

    useEffect(()=>{
        if (menuDetalle != undefined ){
            navegate(`/menu/${menuDetalle.idProducto}`)
        }
    },[menuDetalle])
    
    return (
        <div className='conteinerGeneral'>
            {datos.carrito.length>0 ? (
                <>
                    <div className='carrito'>
                        <Subtitulo clase={"subtitulo"} texto={"CARRITO"} />
                        {datos.carrito.map((dato)=>{
                            subTotal= subTotal + dato.producto.price * dato.cantidad;
                            return <MenuCarrito key={dato.producto.idProducto} menu={dato} click={btnClick}/> 
                        })}
                        <div className='pie-carrito'>
                            {/*<Parrafo clase={"totalCarrito"} texto={`Total: $${total}`} />*/}
                            { datos.userAct ? (
                                <Boton btn={{id:"comprar", clase: "comun", texto:`Realizar comprar por un total de: $${total}`}} btnClick={btnClick} />
                            ) : (
                                <Boton btn={{id:"login", clase: "comun", texto:"Login"}} btnClick={btnClick} />
                            )}
                        </div>
                    </div>
                </>
            ) : ( 
            <div className='carrito'>
                <Subtitulo clase={"subtitulo"} texto={"CARRITO"} />
                <Parrafo clase={"menuParrafo"} texto={`No hay productos agregados al carrito`} />
            </div>)}
            {modal.metodoPago ? (
                <ModalCarrito 
                    setModal={setModal} 
                    modal={modal}
                />):(null)}
        </div>
    );
};

export default Carrito;