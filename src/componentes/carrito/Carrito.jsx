import './Carrito.css';
import { useContext, useState } from 'react';
import { contexto } from '../contexto/contexto';
import MenuCarrito from '../menuCarrito/MenuCarrito';
import Parrafo from '../parrafo/Parrafo';
import Boton from '../boton/Boton';

function Carrito(){
    const {datos} = useContext(contexto);
    const [total, setTotal] = useState(0);
    const btnClick = (e) => {
        console.log(e.target.id);
    }
    
    return (
        <div className='carrito'>
            {console.log(`carrito: ${datos.carrito}`)}
            {datos.carrito.map((dato)=>{
                setTotal(total + dato.price * dato.cantidad);
                return <MenuCarrito key={dato.id} dato={dato} click={btnClick}/> 
            })}
            <Parrafo clase={"menuParrafo"} texto={`Total: $${total}`} />
            <Boton btn={{id:"comprar", clase: "comun", texto:"comprar"}} btnClick={btnClick} />
        </div>
    );
};

export default Carrito;