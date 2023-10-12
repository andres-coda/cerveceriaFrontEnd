import './Carrito.css';
import Subtitulo from '../subtitulo/Subtitulo';
import MenuDetalles from '../menuDetalles/MenuDetalles';
import { useContext, useEffect, useState } from 'react';
import { contexto } from '../contexto/contexto';
import MenuCarrito from '../menuCarrito/MenuCarrito';
import Parrafo from '../parrafo/Parrafo';
import Boton from '../boton/Boton';
import ModalReservas from '../reservas/ModalReservas';

function Carrito(){
    const {datos, setDatos} = useContext(contexto);
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
    const btnClick = (e) => {
        const btn = e.currentTarget.id;
        if (btn==="comprar") {
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
        } else {
            setMenuDetalle(datos.data.find((dato)=> Number(dato.id)===Number(btn)));
        }
    }
    const closeModal = () => {
        setModalVisible(false);
      };
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