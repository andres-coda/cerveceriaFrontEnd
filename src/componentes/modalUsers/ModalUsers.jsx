import { useContext, useState } from "react";

import Subtitulo from "../subtitulo/Subtitulo";
import Boton from "../boton/Boton";
import './ModalUsers.css'
import { contexto } from "../contexto/contexto";
import { useNavigate } from "react-router-dom";
function ModalUsers (){
    const navegate = useNavigate();
    const {datos, setDatos } = useContext(contexto);
    const onClose = (e) =>{
        setDatos((prev)=>({...prev,usuarioActivo: {usuario: {user: "login"}, administrador: false}}));
        navegate('/login');
    }
    return (
        <>
        <div className="conteinerGeneral">
            <Subtitulo clase={"subtitulo"} texto={"Perfil"}/>
            <div className="cardUser">
                <img src="src/assets/Logo.png" alt="Logo del Restaurante" />   
                <span className='line-modal'></span>
                <h3>¡¡{datos.usuarioActivo.usuario.user}!!</h3>
                <p>Nombre y Apellido: <strong> {datos.usuarioActivo.usuario.name} {datos.usuarioActivo.usuario.lastName} </strong> </p>
                <p>Email: <strong> {datos.usuarioActivo.usuario.email} </strong> </p>
                <p>Edad: <strong> {datos.usuarioActivo.usuario.age} </strong> </p>
                <span className='line-modal'></span>
                <Boton  btn={{ id: 'cerrarSesion', clase: 'comun', texto: 'Cerrar Sesión' }} btnClick={onClose} />
            </div>
        </div>
        </>
    );
};

export default ModalUsers;
