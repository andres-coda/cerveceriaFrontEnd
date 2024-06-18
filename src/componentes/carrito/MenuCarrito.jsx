import './MenuCarrito.css';

function MenuCarrito({ menu, click}){
    return(
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
    );
};

export default MenuCarrito;