import { useState, useContext } from "react";
import { contexto } from "../contexto/contexto";
import FormularioInput from '../formularioInput/FormularioInput';
import Boton from "../boton/Boton";
import "./LogReg.css";
import Alerta from "../alerta/alerta";
import Subtitulo from "../subtitulo/Subtitulo";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Login() {
  const { datos} = useContext(contexto);  
  const navigate = useNavigate()
  const { login, fetchProfile} = useAuth();
  const [loginData, setLoginData] = useState({email: '', password: '', role: 'user'});
  const [mensaje, setMensaje] = useState({});
  const { email, password, role } = loginData;

  const onChan = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  };

  const registro = (e) => {
    e.preventDefault();
    navigate("/registro");
    console.log(datos.usuarioActivo);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, password, role].includes("")) {
      setMensaje({
        msj: "Los campos deben completarse",
        error: true
      });
      return;
    }

    try {
      const token = await login(email, password, role);
      await fetchProfile(token);
      setMensaje({
        msj: "Iniciaste sesión con éxito",
        error: false
      });
      navigate('/');
    } catch (error) {
      setMensaje({
        msj: error.message,
        error: true
      });
    }
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
};

export default Login;
