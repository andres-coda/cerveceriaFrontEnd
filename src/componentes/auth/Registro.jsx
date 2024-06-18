import { useContext, useState } from "react";
import "./LogReg.css";
import FormularioInput from "../formularioInput/FormularioInput";
import Boton from "../boton/Boton";
import Alerta from "../alerta/alerta";
import Subtitulo from "../subtitulo/Subtitulo";
import { useNavigate } from "react-router-dom";
import { contexto } from "../contexto/contexto";
import { BASE_URL } from "../../endPoints/endPoints";

function Registro() {
    const {datos, setDatos} = useContext(contexto);
    const [registro, setRegistro] = useState({});
    const [mensaje, setMensaje] = useState({});
    const { name, lastname, email, username, direccion, password, repetir, age } = registro;
    const navegate = useNavigate();
    
    const onChan = (e) => {
        setRegistro({
            ...registro,
            [e.target.name]: e.target.value
        })
    }

    const btnLogin = (e) => {
        e.preventDefault();
        navegate("/login");
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
            const response = await fetch(`${BASE_URL}/usuario`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,    
                    lastname,  
                    username, 
                    age:Number(age),    
                    direccion,  
                    email,   
                    password,
                    role: "user"    
                }),
            });
        
            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData);
                setMensaje({
                    msj: `Error: ${errorData.message}`,
                    error: true,
                });
                return;
            }
        
            const data = await response.json();
            setDatos((prev)=>({...prev, usuarioActivo:{usuario : data, administrador: false}}));
            navegate('/');
            setMensaje({
                msj: `Bienvenido ${data.name}`,
                error: false,
            });
        } catch (error) {
          console.error(error);
          setMensaje({
            msj: `Error al registrar el usuario: ${error.message}`,
            error: true,
          });
        }
    }

    return (
        <div className="conteinerGeneral">
        <div className="login">
            <Subtitulo clase={"subtitulo"} texto={"Registro"} />
            <form onSubmit={handleSubmit} className="formulario">
                <FormularioInput id={`name`} tipo={`text`} texto={"Nombre"} onChan={onChan} />
                <FormularioInput id={`lastname`} tipo={`text`} texto={"Apellido"} onChan={onChan} />
                <FormularioInput id={`username`} tipo={`text`} texto={"Usuario"} onChan={onChan} />
                <FormularioInput id={`age`} tipo={`number`} texto={"Edad"} onChan={onChan} />
                <FormularioInput id={`direccion`} tipo={`text`} texto={"Direccion"} onChan={onChan} />
                <FormularioInput id={`email`} tipo={`email`} texto={"Correo Electrónico "} onChan={onChan} />
                <FormularioInput id={`password`} tipo={`password`} texto={"Contraseña "} onChan={onChan} />
                <FormularioInput id={`repetir`} tipo={`password`} texto={"Repetir Contraseña "} onChan={onChan} />
                
                <div className="botonera" >
                    <Boton btn={{ id: "enviar", clase: "comun", texto: "Registrase" }} btnClick={handleSubmit} />
                    <Boton btn={{ id: "enviar", clase: "comun", texto: "Iniciar sesión" }} btnClick={btnLogin} />
                </div>
            </form>
            {
                mensaje.msj && <Alerta mensaje={mensaje} />
            }

        </div>
        </div>
    )
}

export default Registro;
