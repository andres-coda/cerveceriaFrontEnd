import './Carrito.css';
import Subtitulo from '../subtitulo/Subtitulo';
import MenuDetalles from '../menuDetalles/MenuDetalles';
import { useContext, useEffect, useState } from 'react';
import { contexto } from '../contexto/contexto';
import MenuCarrito from '../menuCarrito/MenuCarrito';
import Parrafo from '../parrafo/Parrafo';
import Boton from '../boton/Boton';
import ModalReservas from '../reservas/ModalReservas';
import MenuDetallesAux from '../menuDetalles/MenuDetallesAux';
import { useNavigate } from 'react-router-dom';
import { fetchPost } from '../funciones fetch/funciones';
import { URL_PEDIDO } from '../../endPoints/endPoints';

function Carrito(){
    const {datos, setDatos} = useContext(contexto);
    const navegate = useNavigate();
    const [total, setTotal] = useState(0);
    const claveReserva = Math.floor(Math.random() * 900000) + 100000;
    const fecha = new Date();
    const hoy = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}`;
    const hora = `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
    const [ menuDetalle, setMenuDetalle ] = useState(undefined);
    const [modalVisible, setModalVisible] = useState(false);
    const [ formulario, setFormulario ] = useState({
        fecha: '',
        hora: '',
        personas: '',
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
      });

    let subTotal = 0;
    
    const comprar = async ()=>{
        const fecha = new Date();
        const bodiPedido = { 
            fecha: fecha,
            detalle: "",
            usuario: datos.userAct.sub,
            metodoPago: 1
        }
        try {
            const cargarPedido = await fetchPost(
                URL_PEDIDO, 
                localStorage.getItem('token'),
                bodiPedido
                );
        } catch(error) {
            console.log(error);
        }
        
    }
    const btnClick = (e) => {
        const btn = e.currentTarget.id;
        switch (btn) {
            case "comprar" :
                setModalVisible(true);
                setFormulario({
                    fecha: hoy,
                    hora: hora,
                    personas: `$${total}`,
                    nombre: datos.usuarioActivo.usuario.name,
                    apellido: datos.usuarioActivo.usuario.lastName,
                    telefono: datos.usuarioActivo.usuario.telefono,
                    email: datos.usuarioActivo.usuario.email,
                })
                console.log("aqui va el tiquet de compra");
                console.log(subTotal);
                console.log(datos.carrito);
                setDatos((prev)=>({...prev, carrito:[]}));
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
    const closeModal = () => {
        setModalVisible(false);
      };
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
                            subTotal= subTotal + dato.price * dato.cantidad;
                            return <MenuCarrito key={dato.idProducto} menu={dato} click={btnClick}/> 
                        })}
                        <Parrafo clase={"totalCarrito"} texto={`Total: $${total}`} />
                        { datos.userAct ? (
                        <Boton btn={{id:"comprar", clase: "comun", texto:"comprar"}} btnClick={btnClick} />) : (
                            <Boton btn={{id:"login", clase: "comun", texto:"Login"}} btnClick={btnClick} />
                        )}
                    </div>
                </>
            ) : ( 
            <div className='carrito'>
                <Subtitulo clase={"subtitulo"} texto={"CARRITO"} />
                <Parrafo clase={"menuParrafo"} texto={`No hay productos agregados al carrito`} />
            </div>)}
            <ModalReservas
                isVisible={modalVisible}
                onClose={closeModal}
                reserva={formulario}
                claveReserva= {claveReserva}
                estado={"Total de la compra: "}
                titulo={"Compra Exitosa"}
                condicion={"Compra"}
                nombreClave={"Clave de Compra"}
            />
        </div>
    );
};

export default Carrito;