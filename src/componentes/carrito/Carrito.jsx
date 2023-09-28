import './Carrito.css';
import Subtitulo from '../subtitulo/Subtitulo';
import MenuDetalles from '../menuDetalles/MenuDetalles';
import { useContext, useEffect, useState } from 'react';
import { contexto } from '../contexto/contexto';
import MenuCarrito from '../menuCarrito/MenuCarrito';
import Parrafo from '../parrafo/Parrafo';
import Boton from '../boton/Boton';

function Carrito(){
    const {datos, setDatos} = useContext(contexto);
    const [total, setTotal] = useState(0);
    const [ menuDetalle, setMenuDetalle ] = useState(undefined);
    let subTotal = 0;
    const btnClick = (e) => {
        const btn = e.currentTarget.id;
        if (btn==="comprar") {
            console.log("aqui va el tiquet de compra");
            console.log(subTotal);
            console.log(datos.carrito);
            setDatos((prev)=>({...prev, carrito:[]}));
        } else {
            setMenuDetalle(datos.data.find((dato)=> Number(dato.id)===Number(btn)));
        }
    }
    useEffect(()=>{
        setTotal(subTotal); 
    },[subTotal, datos.carrito]);
    
    return (
        <div className='conteinerGeneral'>
            {datos.carrito.length>0 ? (
                <>
                    <div className='carrito'>
                        <Subtitulo clase={"subtitulo"} texto={"CARRITO"} />
                        {datos.carrito.map((dato)=>{
                            subTotal= subTotal + dato.price * dato.cantidad;
                            console.log(`${dato.id}, ${dato.title}, ${dato.cantidad}, ${dato.price}`);
                            return <MenuCarrito key={dato.id} menu={dato} click={btnClick}/> 
                        })}
                        <Parrafo clase={"totalCarrito"} texto={`Total: $${total}`} />
                        <Boton btn={{id:"comprar", clase: "comun", texto:"comprar"}} btnClick={btnClick} />
                    </div>
                    {menuDetalle != undefined ? (<MenuDetalles dato={menuDetalle} setMenuDetalles={setMenuDetalle}/>) : (null)} 
                </>
            ) : ( 
            <div className='carrito'>
                <Subtitulo clase={"subtitulo"} texto={"CARRITO"} />
                <Parrafo clase={"menuParrafo"} texto={`No hay productos agregados al carrito`} />
            </div>)}
        </div>
    );
};

export default Carrito;