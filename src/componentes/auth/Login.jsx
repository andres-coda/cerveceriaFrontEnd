import { useState } from "react";
import FormularioInput from '../formularioInput/FormularioInput';
import Boton from "../boton/Boton";
import "./LogReg.css";
import Alerta from "../alerta/alerta";

function Login() {
  const [login, setLogin] = useState({});
  const [mensaje, setMensaje] = useState({});
  const { email, password } = login;

  const onChan = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  };

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

    setMensaje({
      msj: "Inicio de sesión exitoso",
      error: false
    });
  };

  return (
    <div className="conteinerGeneral login">
      <h2>Iniciar Sesión</h2>
      <hr />
      <form onSubmit={handleSubmit} className="formulario">
        <FormularioInput id={`email`} tipo={`email`} texto={"Correo Electrónico "} onChan={onChan} />
        <FormularioInput id={`password`} tipo={`password`} texto={"Contraseña "} onChan={onChan} />
        <a href="/registro">
          <p>Registro</p>
        </a>
        <Boton btn={{ id: "enviar", clase: "comun", texto: "Iniciar Sesión" }} btnClick={handleSubmit} />
      </form >
      {
        mensaje.msj && <Alerta mensaje={mensaje} />
      }
    </div >
  );
}

export default Login;
