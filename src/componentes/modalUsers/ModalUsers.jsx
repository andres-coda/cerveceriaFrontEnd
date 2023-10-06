import { useState } from "react";

import Subtitulo from "../subtitulo/Subtitulo";
import Boton from "../boton/Boton";
import './ModalUsers.css'
function ModalUsers ({datos, setDatos}){
   const [usuario, setUsuario ] = useState(datos.usuarioActivo);
    console.log(datos.usuarioActivo);
    const onClose = (e) =>{
        setDatos((prev)=>({...prev,usuarioActivo: {usuario: "perfil", administrador: false}}));
        setUsuario({usuario: "perfil", administrador: false})
    }
    return (
        <>
            <Subtitulo clase={"subtitulo"} texto={"Perfil"}/>
            <div className="cardUser">
                <img src="src/assets/Logo.png" alt="Logo del Restaurante" />   
                <span className='line-modal'></span>
                <h3>¡¡{usuario.usuario.user}!!</h3>
                <p>Nombre y Apellido: <strong> {usuario.usuario.name} {usuario.usuario.lastName} </strong> </p>
                <p>Email: <strong> {usuario.usuario.email} </strong> </p>
                <p>Edad: <strong> {usuario.usuario.age} </strong> </p>
                <span className='line-modal'></span>
                <Boton  btn={{ id: 'cerrarSesion', clase: 'comun', texto: 'Cerrar Sesión' }} btnClick={onClose} />
            </div>
        </>
    );
};

export default ModalUsers;
