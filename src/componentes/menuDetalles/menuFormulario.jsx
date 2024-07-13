import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { contexto } from "../contexto/contexto";
import FormularioInput from "../formularioInput/FormularioInput";
import Boton from "../boton/Boton";
import './menuFormulario.css'
import AlertaGeneral from "../eliminarAlerta/AlertaGeneral";

function MenuFormulario({ setMenu, menu, btnClick}){
    const {datos}  = useContext(contexto);
    const [ isOpen, setIsOpen ] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [ nuevoDato, setNuevoDato ] = useState()
    const [texto, setTexto ] = useState({proceso:false, texto:"procesando...", idTexto: 'cargar', condicion:false});

    const onChange = (e) =>{
        setMenu({
            ...menu,
            [e.target.name]: e.target.value
        });
    };

    useEffect(()=>{
        const cargarImagen = async () => {
            const formData = new FormData();
            formData.append('image', imageFile);
            const res = await axios.post('https://api.imgbb.com/1/upload?key=4930413001740a11a5fce33bec7f52f9', formData);
            const imageUrl= res.data.data.url;
            setMenu((prev)=>({...prev, img:imageUrl}));
            contador=contador++;
            console.log(contador);

        }
        if (imageFile) cargarImagen();
    },[imageFile])

    const onSelectOption = (e, key, data) => {
        const value = e.target.value;
        if (value !== "Nueva categoria" && value !== "Nuevo tipo") {
            const selectedOption = data.find(option => option.nombre === value);
            setMenu(prevMenu => ({
                ...prevMenu,
                [key]: selectedOption
            }));
        } else {
            setNuevoDato(key)
            setTexto((prev)=>({...prev, proceso:true, texto: `Agregar ${key=='tipo'? 'nuevo tipo' : 'nueva categoria'}`, idTexto:key, condicion:true}))
            setIsOpen(true);
        }
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const onClose =(e) =>{
        setIsOpen(false)
    }

    return(
        <>
        <form onSubmit={btnClick} className='formulario-menu'>
            {menu.img != "" ? (
                <>
                <img src={menu.img} alt={menu.titulo}/>
                <div className="carga-imagen">
                    <label htmlFor="imagen" className="carga-imagen-label">Seleccionar nueva imágen</label>
                    <input id="imagen" type="file" onChange={handleFileChange}/>
                </div>
                </>
            ):(
                <>
                <div className="carga-imagen">
                    <label htmlFor="imagen" className="carga-imagen-label">Seleccionar una imágen</label>
                    <input id="imagen" type="file" onChange={handleFileChange}/>
                </div>
                </>
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
        <AlertaGeneral 
            texto={texto}
            isOpen={isOpen}
            onClose={onClose}
            children={
                !texto.condicion ? (
                    <>
                    <div className="pedido-alerta-input">
                        <FormularioInput 
                            id={'nuevoDato'}
                            value={nuevoDato}
                            tipo={'text'}
                            texto={``}
                            onChan={onChange}
                        />
                    </div>
                    <div className='boton-alerta-pedido'>
                        <Boton btn={{id:"cancelar", clase:"alerta", texto: "Cancelar"}} btnClick={onClose}/>
                        <Boton btn={{id:texto.idTexto, clase:"alerta", texto: texto.idTexto}} btnClick={btnClick}/>
                    </div>
                    </>
                ):(null)
            }    
        
        />
        </>
    )
}
export default MenuFormulario;