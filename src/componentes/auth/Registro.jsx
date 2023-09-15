import { useState } from "react";
import "./LogReg.css";
import FormularioInput from "../formularioInput/FormularioInput";
import Boton from "../boton/Boton";
import Alerta from "../alerta/alerta";


function Registro() {

    const [registro, setRegistro] = useState({});
    const [mensaje, setMensaje] = useState({});
    const { name, lastName, email, user, password, repetir, age } = registro;
   
    const onChan = (e) => {
        setRegistro({
            ...registro,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
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
        //Enviar a la base de datos
        try {
            const response = await fetch("http://localhost:3031/users/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    lastName,
                    email,
                    user,
                    password,
                    age,
                }),
            });
        
            if (response.ok) {
                const data = await response.json();
                setMensaje({
                    msj: `Bienvenido ${data.name}`,
                    error: false,
                });
            } else {
                // Manejar el caso de respuesta no exitosa aquí
                console.log("Error en la solicitud HTTP:", response.status, response.statusText);
            }
        } catch (error) {
          setMensaje({
            msj: "Error al Registar el Usuario",
            error: true,
          })
        }

    }

    return (
        <div className="conteinerGeneral login">
            <h2>Registro</h2>
            <hr />
            <form onSubmit={handleSubmit} className="formulario">
                <FormularioInput id={`name`} tipo={`text`} texto={"Nombre"} onChan={onChan} />
                <FormularioInput id={`lastName`} tipo={`text`} texto={"Apellido"} onChan={onChan} />
                <FormularioInput id={`user`} tipo={`text`} texto={"Usuario"} onChan={onChan} />
                <FormularioInput id={`email`} tipo={`email`} texto={"Correo Electrónico "} onChan={onChan} />
                <FormularioInput id={`age`} tipo={`number`} texto={"Edad"} onChan={onChan} />
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