import { useState } from 'react';
import './MenuCargar.css'
import FormularioInput from '../formularioInput/FormularioInput';
import Boton from '../boton/Boton';
import Subtitulo from '../subtitulo/Subtitulo';
import Alerta from '../alerta/alerta';

function MenuCargar(){
    const [menu, setMenu] = useState({});
    const [mensaje, setMensaje] = useState({});
    const { title, category, img, description, ingredients, price, valoration, tipo} = menu; 
  
    const onChange = (e) =>{
        setMenu({
            ...menu,
            [e.target.name]: e.target.value
        });
    };

    const btnClick = async (e) => {
        e.preventDefault();
        if ([title, category, img, description, ingredients, price, valoration, tipo].includes("")) {
            setMensaje({
                msj: "Los campos deben Completarse",
                error: true
            })
            return;
        }

        // Enviar a la base de datos
        try {
            const response = await fetch("http://localhost:3031/menu/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    category,
                    img,
                    description,
                    ingredients,
                    price,
                    valoration,
                    tipo,
                }),
            });
            
            if (response.ok) {
                const data = await response.json();
                setMensaje({
                    msj: `${data.title} Cargada correctamente`,
                    error: false,
                });
            } else {
                // Maneja el caso de respuesta no exitosa aquí.
                console.log("Error en la solicitud HTTP:", response.status, response.statusText);
            }
        } catch (error) {
            setMensaje({
                msj: "Error al Registar el Menu",
                error: true,
              })
        }
    };



    return(
        <div className='conteinerGeneral'>
            <div className='cargarMenu'>
                <Subtitulo clase={"subtitulo"} texto={" Carga de menu "} />
                <form onSubmit={btnClick} className='formulario'>
                    <FormularioInput id={"title"} tipo={"text"} texto={"Nombre del menu"} onChan={onChange} />
                    <FormularioInput id={"category"} tipo={"text"} texto={"Categoría del menu"} onChan={onChange} />
                    <FormularioInput id={"img"} tipo={"text"} texto={"Enlace de la imagen del menu"} onChan={onChange} />
                    <FormularioInput id={"description"} tipo={"text"} texto={"Descripción del menu"} onChan={onChange} />
                    <FormularioInput id={"ingredients"} tipo={"text"} texto={"Ingredientes del menu"} onChan={onChange} />
                    <FormularioInput id={"price"} tipo={"int"} texto={"Precio del menu"} onChan={onChange} />
                    <FormularioInput id={"valoration"} tipo={"int"} texto={"Valoración del menu"} onChan={onChange} />
                    <FormularioInput id={"tipo"} tipo={"text"} texto={"Tipo del menu"} onChan={onChange} />
                    <Boton btn={{ id: "enviar", clase: "comun", texto: "Cargar menu" }} btnClick={btnClick} />
                </form>
                {
                mensaje.msj && <Alerta mensaje={mensaje} />
            }
            </div>
        </div>
    );
}

export default MenuCargar;