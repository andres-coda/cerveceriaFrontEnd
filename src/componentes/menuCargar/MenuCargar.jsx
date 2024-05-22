import { useState, useContext, useEffect } from 'react';
import './MenuCargar.css'
import FormularioInput from '../formularioInput/FormularioInput';
import Boton from '../boton/Boton';
import Subtitulo from '../subtitulo/Subtitulo';
import { contexto } from '../contexto/contexto';
import { useNavigate } from 'react-router-dom';
import { fetchPost, fetchPut } from '../funciones fetch/funciones';
import { URL_PRODUCTO } from '../../endPoints/endPoints';
function MenuCargar(){
    const { datos, setDatos } = useContext(contexto);
    const [ editar, setEditar ] = useState(false);
    const navegate = useNavigate();
    const [menu, setMenu] = useState({
        titulo: "",
        categoria:"",
        img: "",
        descripcion: "",
        ingredientes: "",
        price:"",
        valoracion: "",
        tipo: "",
    });
    if (!editar) {
        console.log("entre aqui");
        setMenu(datos.datoAEditar);
        setEditar(true);
    } 
    const btnClick = async (e)=>{
        e.preventDefault();
        setDatos((prev)=>({...prev, refresh : !refresh}))
    
        if (editar === true ){
            const productoEditado = await fetchPut(
                URL_PRODUCTO+'/'+datos.datoAEditar.idProducto,
                localStorage.getItem('token'),
                menu
            )
            if (productoEditado) {
                setDatos((prev)=>({...prev, datoAEditar: undefined}));
                navegate(`/menu/${productoEditado.idProducto}`);
            }
            
        } else {
            const productoNuevo= await fetchPost(
                URL_PRODUCTO,
                localStorage.getItem('token'),
                menu
            )
            if (productoNuevo){
                navegate(`/menu/${productoNuevo.idProducto}`)
            }
            //setNuevoProducto(fetchPost(URL_PRODUCTO, datos.token, menu))
        }
    }


    const onChange = (e) =>{
        setMenu({
            ...menu,
            [e.target.name]: e.target.value
        });
    };

    const onSelectOption = (e, key, data) => {
        const value = e.target.value;
        if (value !== "Nueva") {
            const selectedOption = data.find(option => option.nombre === value);
            setMenu(prevMenu => ({
                ...prevMenu,
                [key]: selectedOption
            }));
        } else {
            console.log(`Nueva ${key}`);
            // Aquí puedes manejar la lógica para una nueva opción
        }
    };
    
    return(
        <>
        { !datos.datoAEditar ? (null) : (
            <div className='conteinerGeneral'>
            <div className='cargarMenu'>
            <Subtitulo clase={"subtitulo"} texto={" Carga de menu "} />
            <form onSubmit={btnClick} className='formulario'>
            <FormularioInput id={"titulo"} tipo={"text"} texto={"Nombre del menu"} onChan={onChange} value={menu.titulo}/>
            <FormularioInput 
                id={"categoria.nombre"} 
                value={menu.categoria.nombre} 
                tipo={"select"} 
                texto={"Categoría del menu"} 
                onChan={(e) => onSelectOption(e, 'categoria', datos.categoria)} 
                opciones={[...datos.categoria.map((categoria) => categoria.nombre), "Nueva categoria"]}
            />
            <FormularioInput id={"img"} value={menu.img} tipo={"text"} texto={"Enlace de la imagen del menu"} onChan={onChange} />
            <FormularioInput id={"descripcion"} value={menu.descripcion} tipo={"text"} texto={"Descripción del menu"} onChan={onChange} />
            <FormularioInput id={"ingredientes"} value={menu.ingredientes} tipo={"text"} texto={"Ingredientes del menu"} onChan={onChange} />
            <FormularioInput id={"price"} value={menu.price} tipo={"int"} texto={"Precio del menu"} onChan={onChange} />
            <FormularioInput id={"valoracion"} value={menu.valoracion} tipo={"int"} texto={"Valoración del menu"} onChan={onChange} />
            <FormularioInput 
                id={"tipo.nombre"} 
                value={menu.tipo.nombre} 
                tipo={"select"} 
                texto={"Tipo del menu"} 
                onChan={(e) => onSelectOption(e, 'tipo', datos.tipo)} 
                opciones={[...datos.tipo.map((tipo) => tipo.nombre), "Nuevo tipo"]} 
            />
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