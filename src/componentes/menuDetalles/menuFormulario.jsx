import { useContext } from "react";
import { contexto } from "../contexto/contexto";
import FormularioInput from "../formularioInput/FormularioInput";
import Boton from "../boton/Boton";
import './menuFormulario.css'

function MenuFormulario({ setMenu, menu, btnClick}){
    const {datos}  = useContext(contexto);

    const onChange = (e) =>{
        setMenu({
            ...menu,
            [e.target.name]: e.target.value
        });
    };

    const onSelectOption = (e, key, data) => {
        const value = e.target.value;
        if (value !== "Nueva categoria" && value !== "Nuevo tipo") {
            const selectedOption = data.find(option => option.nombre === value);
            setMenu(prevMenu => ({
                ...prevMenu,
                [key]: selectedOption
            }));
        } else {
            setIdText((prev)=>({...prev, id:key, texto:value}));
            setAlerta((prev)=>({...prev, estado: true}))
        }
    };

    return(
        <form onSubmit={btnClick} className='formulario-menu'>
            {menu.img != "" ? (
                <>
                <img src={datos.productoActual.img} alt={datos.productoActual.titulo}/>
                <FormularioInput id={"img"} value={menu.img} tipo={"text"} texto={"Enlace de la imagen del menu"} onChan={onChange} />
                </>
            ):(
                <FormularioInput id={"img"} value={menu.img} tipo={"text"} texto={"Enlace de la imagen del menu"} onChan={onChange} />
            )}
            <FormularioInput id={"titulo"} tipo={"text"} texto={"Nombre del menu"} onChan={onChange} value={menu.titulo}/>
            <FormularioInput 
                id={"categoria.nombre"} 
                value={menu.categoria.nombre} 
                tipo={"select"} 
                texto={"Categoría del menu"} 
                onChan={(e) => onSelectOption(e, 'categoria', datos.categoria)} 
                opciones={[...datos.categoria.map((categoria) => categoria.nombre), "Nueva categoria"]}
            />
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
    )
}
export default MenuFormulario;