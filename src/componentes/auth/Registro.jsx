import { useState } from "react";
import "./LogReg.css";
import FormularioInput from "../formularioInput/FormularioInput";
import Boton from "../boton/Boton";

function Registro(){

    const [login, setLogin] = useState({})


    const onChan = (e) => {
      setLogin({
        ...login,
        [e.target.name]: e.target.value
      })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Te Registraste con exito");
    }


    return (
        <div className="conteinerGeneral login">
                    <h2>Registro</h2>
                    <hr />
                    <form onSubmit={handleSubmit} className="formulario">
                    <FormularioInput id={`email`} tipo={`email`} texto={"Correo Electrónico "} onChan={onChan} />
                    <FormularioInput id={`password`} tipo={`password`} texto={"Contraseña "} onChan={onChan} />
                    <FormularioInput id={`repetir`} tipo={`password`} texto={"Repetir Contraseña "} onChan={onChan} />
                    <a href="/login">
                        <p>Iniciar Sesion</p>
                    </a>
                    <Boton btn={{ id: "enviar", clase: "comun", texto: "Registrase" }} btnClick={handleSubmit} />
                    </form>
                </div>
    )
}

export default Registro;
