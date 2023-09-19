import { useState, useContext, useEffect } from "react";
import { contexto } from "../contexto/contexto";
import FormularioInput from '../formularioInput/FormularioInput';
import Boton from "../boton/Boton";
import "./LogReg.css";
import Alerta from "../alerta/alerta";
import Subtitulo from "../subtitulo/Subtitulo";
import { useNavigate } from "react-router-dom";

function Login() {
  const { datos, auth, setAuth } = useContext(contexto);
  const navegate = useNavigate()
  const [login, setLogin] = useState({});
  const [mensaje, setMensaje] = useState({});
  const { email, password } = login;
  const [usuario, setUsuario] = useState([]);

  const { data } = usuario;


  useEffect(() => {
    fetch("http://localhost:3031/users")
      .then(response => response.json())
      .then(data => setUsuario(data))
      .catch(error => console.error("Error:", error));
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, password].includes("")) {
      setMensaje({
        msj: "Los campos deben completarse",
        error: true
      });
      return;
    }

    const validarUsuario = data.some(el => el.email === email && el.password === password  );
    if (!validarUsuario) {
      setMensaje({
        msj: "error al iniciar sesion",
        error: true
      });
      return;
    }

    setAuth (true)
    setMensaje({
      msj: "iniciaste sesion con exito",
      error: false
    });
    
    navegate("../menu");

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
