import { useContext } from 'react';
import './menuDetalleInterno.css'
import { contexto } from '../contexto/contexto';
function MenuDetalleInterno(){
    const {datos} = useContext(contexto)
    return(
        <div className="detalle-interno">
            <img src={datos.productoActual.img} alt={datos.productoActual.titulo}/>
            <div className="detalle-interno-contenido">
                <h4 className='detalle-interno-h4'>{datos.productoActual.titulo}</h4>
                <p>categoría: {datos.productoActual.categoria.nombre}</p>
                <p>${datos.productoActual.price}</p>
            </div>
        </div>
    )
}

export default MenuDetalleInterno;