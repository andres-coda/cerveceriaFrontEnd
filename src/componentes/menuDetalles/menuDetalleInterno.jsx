import './menuDetalleInterno.css'
function MenuDetalleInterno({producto}){
    return(
        <div className="detalle-interno">
            <img src={producto.img} alt={producto.titulo}/>
            <div className="detalle-interno-contenido">
                <h4>{producto.titulo}</h4>
                <p>categoría: {producto.categoria.nombre}</p>
                <p>${producto.price}</p>
            </div>
        </div>
    )
}

export default MenuDetalleInterno;