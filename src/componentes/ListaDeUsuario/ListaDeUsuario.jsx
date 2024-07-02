import React, { useContext, useEffect, useState } from 'react'
import Subtitulo from '../subtitulo/Subtitulo'
import { URL_USUARIO } from '../../endPoints/endPoints'
import './ListaDeUsuario.css'
import { IoPersonCircleOutline } from 'react-icons/io5';
import { CiLocationOn } from 'react-icons/ci';
import { RiUserSettingsLine } from "react-icons/ri";
import { FaRegAddressCard,FaUserPlus } from 'react-icons/fa';
import { contexto } from '../contexto/contexto';
import { useNavigate } from 'react-router-dom';
import { MdTableBar,MdFastfood } from "react-icons/md";

function ListaDeUsuario() {
    const [usuarios, setUsuarios] = useState(null);
    const navegate = useNavigate();
    const { setDatos } = useContext(contexto);
    const arreglo = ['https://i.pinimg.com/736x/63/4e/bf/634ebf954f6eaac31977ffaf2cea8cd7.jpg',
        'https://i.pinimg.com/236x/09/4c/a6/094ca6e512e1305df5acbff3d8447079.jpg',
        'https://i.pinimg.com/236x/60/cf/60/60cf6095630a2af374e19364e6878838.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDFj3iHqrzzgzQ5eeKqaC5vQqCGswZWdtGTwehirhme6Tf8ZZYOgR7SoRbZyKGiVUDT_w&usqp=CAU',
        'https://i.pinimg.com/236x/5e/1e/b8/5e1eb8c109741e5559814f940428bcb8.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNwLbCvO9eyfl5I8e61cnHxu2uZzPx8q8d0w&s',
        'https://misimagenesde.com/wp-content/uploads/2017/05/animales-chistosos-4.jpg',
        'https://i.pinimg.com/originals/1d/84/36/1d8436ad0603bea560b177712df7acea.jpg',
        'https://www.cnet.com/a/img/resize/b854d3939da1a906bb6e6ce88c8ce7f626494ba9/hub/2020/09/10/4c9c4120-da32-4478-95ad-f9feb7d7e20c/cwawei-ping-peng-so-hot-00006854.jpg?auto=webp&fit=crop&height=675&width=1200',
        'https://i.pinimg.com/originals/b9/de/fa/b9defa15dbd7a8fea981fe770fcf6d6d.jpg',
        'https://4.bp.blogspot.com/-mihiO6cDELM/UXrkKbUeWlI/AAAAAAAA3AE/5xTrW2H0td8/s1600/Fotos+Divertidas+de+Animales+13.jpg',
        'https://i.pinimg.com/236x/00/52/a5/0052a5c5339836152507077f88fa37e8.jpg',
        'https://www.nationalgeographic.com.es/medio/2022/10/22/ha-sido-un-largo-camino-pero-aqui-estoy_1d86682d_1200x1200.jpg']
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    'Content-Type': 'application/json',
                };
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }

                const resp = await fetch(URL_USUARIO, {
                    method: 'GET',
                    headers: headers,
                });

                if (!resp.ok) {
                    throw new Error(`HTTP error! Status: ${resp.status}`);
                }

                const data = await resp.json();
                setUsuarios(data);
            } catch (error) {
                console.error('Error fetching usuarios:', error);
            }
        };

        fetchUsuarios();

    }, []); // Ejecutar una sola vez al montar el componente

    const handlePedidos = (usuario) => {
        setDatos((prev) => ({ ...prev, pedidosUsuarioActual: usuario }))
        console.log(usuario);
        navegate('/pedidosusuarios')

    }

    const handleReservas = (usuario)=>{
        setDatos((prev) => ({ ...prev, pedidosUsuarioActual: usuario }))
        console.log(usuario);
        navegate('/reservasusuarios')
    }
    return (
        <div className='conteinerGeneral'>
            <Subtitulo texto={'Lista de usuarios'} />
            <div className='containerTarjetasUsuarios'>
                
                {usuarios ? usuarios.map((user, index) => (
                    <>
                        <div className='contenedor-all-usuarios'>
                            <div className='tarjeta-usuario'>
                                <img src={arreglo[index % arreglo.length]} alt={user.username} />
                                <div className='usuario-detalle'>
                                    <p> <IoPersonCircleOutline />  {user.username} </p>
                                    <p> <FaRegAddressCard />  {user.name}, {user.lastname} </p>
                                    <p> <CiLocationOn />  {user.direccion}</p>
                                    <p> <RiUserSettingsLine />  {user.role}</p>
                                    <p><FaUserPlus />  Ver más</p>
                                </div>

                            </div>
                            <div className='botonera-usuario'>
                                <button className='comun'> {`Pedidos: ${user.pedidos.length}`}</button>
                                <button className='comun'> {`Reservas: ${user.reservas.length}`}</button>
                            </div>
                       </div>
                    </>
                )) : null}
            </div>
        </div>
    )
}

export default ListaDeUsuario;
