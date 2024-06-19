import { useState, useContext, useEffect } from 'react';
import './MenuCargar.css'
import FormularioInput from '../formularioInput/FormularioInput';
import Boton from '../boton/Boton';
import Subtitulo from '../subtitulo/Subtitulo';
import { contexto } from '../contexto/contexto';
import { useNavigate } from 'react-router-dom';
import { fetchGet, fetchPost, fetchPut } from '../funciones fetch/funciones';
import { URL_PRODUCTO } from '../../endPoints/endPoints';
import CargarAlerta from '../eliminarAlerta/CargarAlerta';
import MenuFormulario from '../menuDetalles/menuFormulario';
import AlertaGeneral from '../eliminarAlerta/AlertaGeneral';
import MenuDetalleInterno from '../menuDetalles/menuDetalleInterno';
function MenuCargar(){
    const { datos, setDatos } = useContext(contexto);
    const [ isOpen, setIsOpen ] = useState(false);
    const [texto, setTexto ] = useState({proceso:false, texto:"procesando...", idTexto: 'cargar', condicion:false});
    const navegate = useNavigate()
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

    const reloadProducto= async(id) =>{
        const respuestaGeneral = await fetchGet(URL_PRODUCTO, localStorage.getItem('token'));
        if (respuestaGeneral) {
            const res = await fetchGet(URL_PRODUCTO+'/'+id, localStorage.getItem('token'));
            if (res) {
                setDatos((prev)=>({...prev,productos:respuestaGeneral, productoActual:res}))
            }
            return res;
        }
    }
    
    const handleCargarProducto = async (e) => {
        e.preventDefault();
        setTexto((prev)=>({...prev, proceso: false, texto:"procesando...", condicion:true}));
        setIsOpen(true)
        try {
            const productoNuevo= await fetchPost(
                URL_PRODUCTO,
                localStorage.getItem('token'),
                menu
            )
            if (productoNuevo){
                const reloadLocal = await reloadProducto(productoNuevo.idProducto);
                if (reloadLocal) {
                    setDatos((prev)=>({...prev, productoActual:productoNuevo}))
                    setTexto((prev)=>({...prev, texto: "El producto fue creado con exito", proceso :true, condicion:true}));
                }
            
            }
        }catch (error) {
            setTexto((prev)=>({...prev, texto: `El producto no pudo ser creado: ${error.message}`, proceso :true, condicion:true}));
        }
    }

    const onClose = ()=>{
        setTexto((prev)=>({...prev, proceso :false, condicion:false}));
        navegate('/menu');
        setIsOpen(false)
    }
    
    return(
        <>
        <div className='conteinerGeneral'>
            <div className='cargarMenu'>
                <Subtitulo clase={"subtitulo"} texto={" Carga nuevo producto "} />
                <MenuFormulario menu={menu} setMenu={setMenu} btnClick={handleCargarProducto} />
            </div>
            <AlertaGeneral
                texto={texto}
                isOpen={isOpen}
                onClose={onClose}
                children={
                    !texto.condicion ? (
                        <>
                        {console.log(datos.productoActual)}
                        <MenuDetalleInterno />
                        </>
                    ):(null)
                }    
            />
        </div>
        </>
    );
}

export default MenuCargar;