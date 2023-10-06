import { useState, useContext } from "react";
import { contexto } from "../contexto/contexto";
import FormularioInput from '../formularioInput/FormularioInput';
import Boton from "../boton/Boton";
import "./LogReg.css";
import Alerta from "../alerta/alerta";
import Subtitulo from "../subtitulo/Subtitulo";
import { useNavigate } from "react-router-dom";

function Login() {
  const { datos, setAuth, setDatos} = useContext(contexto);
  const { usuario} = datos
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
    console.log(datos.usuarioActivo);
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

    const validarUsuario = usuario.some(el => el.email === email && el.password === password  );
    if (!validarUsuario) {
      setMensaje({
        msj: "error al iniciar sesion",
        error: true
      });
      return;
    }

    const usuarioActivo = usuario.filter (user => user.email == email && user.password== password)
    setAuth (usuarioActivo [0])
    // setDatos((prev)=>({...prev, auth: false }))
    setDatos((prev)=>({...prev, usuarioActivo:{ usuario: usuarioActivo, administrador:false }}));
    setMensaje({
      msj: "iniciaste sesion con exito",
      error: false
    });
    
    navegate("../menu");

};


return (
  <div className="conteinerGeneral">
  <div className="login">
    <Subtitulo clase={"subtitulo"} texto={"Iniciar Sesión"} />
    <form onSubmit={handleSubmit} className="formulario">
      <FormularioInput id={`email`} tipo={`email`} texto={"Correo Electrónico "} onChan={onChan} />
      <FormularioInput id={`password`} tipo={`password`} texto={"Contraseña "} onChan={onChan}  />
      <div className="botonera" >
        <Boton btn={{ id: "enviar", clase: "comun", texto: "Iniciar Sesión" }} btnClick={handleSubmit} />
        <Boton btn={{ id: "enviar", clase: "comun", texto: "Registro" }} btnClick={registro} />
      </div>

    </form >
    {
      mensaje.msj && <Alerta mensaje={mensaje} />
    }
  </div >
  </div>
);

}
export default Login;
