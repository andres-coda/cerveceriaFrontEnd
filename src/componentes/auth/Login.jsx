import { useState, useContext } from "react";
import { contexto } from "../contexto/contexto";
import FormularioInput from '../formularioInput/FormularioInput';
import Boton from "../boton/Boton";
import "./LogReg.css";
import Alerta from "../alerta/alerta";
import Subtitulo from "../subtitulo/Subtitulo";
import { useNavigate } from "react-router-dom";

function Login() {
  const { datos } = useContext(contexto);
  const navegate = useNavigate()
  const [login, setLogin] = useState({});
  const [mensaje, setMensaje] = useState({});
  const { email, password } = login;

  const onChan = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  };

  const registro = (e) => {
    e.preventDefault();
    navegate("/registro");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([email, password].includes("")) {
      setMensaje({
        msj: "Los campos deben completarse",
        error: true
      });
      return;
    }

    // Aca puede ir validacion si existe el usuario?
    if (datos.usuario.some((user)=>(user.email===email && user.password===password))) {
      setMensaje({
        msj: "Inicio de sesión exitoso",
        error: false
      });
    } else {
      setMensaje({
        msj: "El usuario o la contraseña son incorrectas",
        error: true
      });
    }

  };

  return (
    <div className="conteinerGeneral login">
      <Subtitulo clase={"subtitulo"} texto={"Iniciar Sesión"} />
      <hr />
      <form onSubmit={handleSubmit} className="formulario">
        <FormularioInput id={`email`} tipo={`email`} texto={"Correo Electrónico "} onChan={onChan} />
        <FormularioInput id={`password`} tipo={`password`} texto={"Contraseña "} onChan={onChan} />
      
        <div className="botonera" >
          <Boton btn={{ id: "enviar", clase: "comun", texto: "Iniciar Sesión" }} btnClick={handleSubmit} />
          <Boton btn={{ id: "enviar", clase: "comun", texto: "Registro" }} btnClick={registro} />
        </div>
          
      </form >
      {
        mensaje.msj && <Alerta mensaje={mensaje} />
      }
    </div >
  );
}

export default Login;
