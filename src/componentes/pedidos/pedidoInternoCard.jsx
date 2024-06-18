import './pedidosCard.css'
function PedidoInternoCard({productos}){
    let importe = null;
    if (!importe) {
        importe=0;
        productos.map((producto)=>{
            importe=importe+producto.cantidad*producto.producto.price;
    })}
    return(
        <>
            {productos.map((producto)=>(
                <div className='pedido-producto-alerta' key={producto.producto.idProducto}>
                    <p><b>{producto.cantidad} </b></p>
                    <img src={producto.producto.img} alt={producto.producto.titulo} />
                    <p> {producto.producto.titulo} </p>
                </div>
            ))}
            <p className='pedido-importe-alerta'><b>Importe: </b> ${importe} </p>
        </>
    )
}
export default PedidoInternoCard;