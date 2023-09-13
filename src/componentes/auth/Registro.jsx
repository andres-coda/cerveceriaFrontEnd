import { useState } from "react";
import "./LogReg.css";
import FormularioInput from "../formularioInput/FormularioInput";
import Boton from "../boton/Boton";
import Alerta from "../alerta/alerta";

function Registro() {

    const [login, setLogin] = useState({});
    const [mensaje, setMensaje] = useState({});
    const { email, password, repetir } = login;


    const onChan = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if ([email, password, repetir].includes("")) {
            setMensaje({
                msj: "Los campos deben Completarse",
                error: true
            })
            return;
        }
        if (password !== repetir) {
            setMensaje({
                msj: "Las Contraseñas deben ser iguales",
                error: true
            })
            return;
        }
        setMensaje({
            msj: "Rgistrado con exito",
            error: false
        })
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
            {
                mensaje.msj && <Alerta mensaje={mensaje} />
            }

        </div>
    )
}

export default Registro;
