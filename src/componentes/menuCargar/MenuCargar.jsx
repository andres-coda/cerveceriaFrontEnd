import { useState } from 'react';
import './MenuCargar.css'
import FormularioInput from '../formularioInput/FormularioInput';
import Boton from '../boton/Boton';
import Subtitulo from '../subtitulo/Subtitulo';
function MenuCargar(){
    const [menu, setMenu] = useState({
        title: "",
        category: "",
        img: "",
        description: "",
        ingredients: "",
        price:"",
        valoration: "",
        tipo: "",
    });
    const btnClick = (e)=>{
        e.preventDefault();
    }
    const onChange = (e) =>{
        setMenu({
            ...menu,
            [e.target.name]: e.target.value
        });
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
            </div>
        </div>
    );
};

export default MenuCargar;