import './Carrito.css';
import { useContext, useState } from 'react';
import { contexto } from '../contexto/contexto';
import MenuCarrito from '../menuCarrito/MenuCarrito';
import Parrafo from '../parrafo/Parrafo';
import Boton from '../boton/Boton';

function Carrito(){
    const {datos, setDatos} = useContext(contexto);
    const [cantidad, setCantidad] = useState(0);
    const btnClick = (e) => {
        console.log(e.target.id);
    }
    console.log(`carrito: ${datos.carrito}`);
    return (
        <div className='carrito'>
            {datos.carrito.map((dato)=>{
                setCantidad((prev)=>{prev+dato.price*dato.cantidad});
                return <MenuCarrito key={dato.id} dato={dato} click={btnClick}/> 
            })}
            <Parrafo clase={"menuParrafo"} texto={`Total: $${cantidad}`} />
            <Boton btn={{id:"comprar", clase: "comun", texto:"comprar"}} btnClick={btnClick} />
        </div>
    );
};

export default Carrito;