import React, { useEffect, useState } from 'react'
import Subtitulo from '../subtitulo/Subtitulo'
import { URL_USUARIO } from '../../endPoints/endPoints'
import './ListaDeUsuario.css'

function ListaDeUsuario() {
    const [usuarios, setUsuarios] = useState(null);
const arreglo = ['https://i.pinimg.com/736x/63/4e/bf/634ebf954f6eaac31977ffaf2cea8cd7.jpg', 
'https://i.pinimg.com/236x/09/4c/a6/094ca6e512e1305df5acbff3d8447079.jpg', 
'https://i.pinimg.com/236x/60/cf/60/60cf6095630a2af374e19364e6878838.jpg',  
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDFj3iHqrzzgzQ5eeKqaC5vQqCGswZWdtGTwehirhme6Tf8ZZYOgR7SoRbZyKGiVUDT_w&usqp=CAU', 
'https://i.pinimg.com/236x/5e/1e/b8/5e1eb8c109741e5559814f940428bcb8.jpg', 
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNwLbCvO9eyfl5I8e61cnHxu2uZzPx8q8d0w&s']
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

    return (
        <div className='conteinerGeneral'>
            <Subtitulo texto={'Lista de usuarios'} />
            <div className='containerTarjetasUsuarios'>
                {usuarios ? usuarios.map((user, index) => (
                    <>
                    <div className='tarjeta-usuario'>
                    <img src={arreglo[index % arreglo.length]} alt={user.username} />
                    <div className='usuario-detalle'>
                        <p> {`Usuario: ${user.username}`} </p>
                        <p> {`Nombre: ${user.name}`}</p>
                        <p> {`Apellido: ${user.lastname}`}</p>
                        <p> {`Email: ${user.direccion}`}</p>
                        <p> {`Rol: ${user.role}`}</p>
                        <div className='botonera-usuario'>
                        <button className='comun'> {`Pedidos: ${user.pedidos.length}`}</button>
                        <button className='comun'> {`Reservas: ${user.reservas.length}`}</button>
                    </div>

                        </div>
                    </div>
                    </>
                )) : null}
            </div>
        </div>
    )
}

export default ListaDeUsuario;
