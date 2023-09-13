import { useState } from "react";
import FormularioInput from '../formularioInput/FormularioInput';
import Boton from "../boton/Boton";
import "./LogReg.css";

function Login() {
  const [login, setLogin] = useState({})


  const onChan = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Te Logueaste con exito");
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
    </div >
  );
}

export default Login;

