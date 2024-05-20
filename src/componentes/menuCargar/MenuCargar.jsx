import { useState, useContext, useEffect } from 'react';
import './MenuCargar.css'
import FormularioInput from '../formularioInput/FormularioInput';
import Boton from '../boton/Boton';
import Subtitulo from '../subtitulo/Subtitulo';
import { contexto } from '../contexto/contexto';
import { useNavigate } from 'react-router-dom';
import { fetchPost } from '../funciones fetch/funciones';
import { URL_PRODUCTO } from '../../endPoints/endPoints';
function MenuCargar(){
    const { datos, setDatos } = useContext(contexto);
    const URL = `http://localhost:3000/menu/`
    const [ editar, setEditar ] = useState(false);
    const [ nuevoProducto, setNuevoProducto ] = useState(null);
    const navegate = useNavigate();
    const [menu, setMenu] = useState({
        titulo: "",
        categoria:{ nombre:""},
        img: "",
        descripcion: "",
        ingredientes: "",
        price:"",
        valoracion: "",
        tipo: { nombre:""},
    });
    if (!editar) {
        console.log("entre aqui");
        setMenu(datos.datoAEditar);
        setEditar(true);
    } 
    const btnClick = async (e)=>{
        e.preventDefault();
    
        if (editar === true ){
            try {
                const response = await fetch(`${URL}${datos.datoAEditar.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(menu),
                });
            
                if (response.ok) {
                    const data = await response.json();
                    //setDatos((prev)=>({...prev, datoAEditar: undefined}));
                    navegate('/menu')
                    navegate(`/menu/${datos.datoAEditar.id}`);
                } else {
                    // Manejar el caso de respuesta no exitosa aquí
                    console.log("Error en la solicitud HTTP:", response.status, response.statusText);
                }
            } catch (error) {
              setMensaje({
                msj: "No se pudo cargar el menu",
                error: true,
              })
              console.log(error);
            }
        } else {
            console.log("desactivado por ahora");
            //setNuevoProducto(fetchPost(URL_PRODUCTO, datos.token, menu))
        }
    }

    if ( nuevoProducto) navegate("/menu"+nuevoProducto.idProducto);

    const onChange = (e) =>{
        setMenu({
            ...menu,
            [e.target.name]: e.target.value
        });
    };
    return(
        <>
        { !datos.datoAEditar ? (null) : (
            <div className='conteinerGeneral'>
            <div className='cargarMenu'>
            <Subtitulo clase={"subtitulo"} texto={" Carga de menu "} />
            <form onSubmit={btnClick} className='formulario'>
            <FormularioInput id={"titulo"} tipo={"text"} texto={"Nombre del menu"} onChan={onChange} value={menu.titulo}/>
            <FormularioInput id={"categoria.nombre"} value={menu.categoria.nombre} tipo={"text"} texto={"Categoría del menu"} onChan={onChange} />
            <FormularioInput id={"img"} value={menu.img} tipo={"text"} texto={"Enlace de la imagen del menu"} onChan={onChange} />
            <FormularioInput id={"descripcion"} value={menu.descripcion} tipo={"text"} texto={"Descripción del menu"} onChan={onChange} />
            <FormularioInput id={"ingredientes"} value={menu.ingredientes} tipo={"text"} texto={"Ingredientes del menu"} onChan={onChange} />
            <FormularioInput id={"price"} value={menu.price} tipo={"int"} texto={"Precio del menu"} onChan={onChange} />
            <FormularioInput id={"valoracion"} value={menu.valoracion} tipo={"int"} texto={"Valoración del menu"} onChan={onChange} />
            <FormularioInput id={"tipo.nombre"} value={menu.tipo.nombre} tipo={"text"} texto={"Tipo del menu"} onChan={onChange} />
            <Boton btn={{ id: "enviar", clase: "comun", texto: "Cargar menu" }} btnClick={btnClick} />
            </form>
            </div>
            </div>
            )
        }
        </>
    );
};

export default MenuCargar;