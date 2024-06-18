import { useContext, useState } from "react";
import Parrafo from "../parrafo/Parrafo";
import Boton from "../boton/Boton";
import FormularioInput from "../formularioInput/FormularioInput";
import { fetchPost } from "../funciones fetch/funciones";
import { URL_CATEGORIA, URL_TIPO } from "../../endPoints/endPoints";
import { contexto } from "../contexto/contexto";

function CargarAlerta({setAlerta, idTexto}) {
    const { setDatos } = useContext(contexto)
    const [ texto, setTexto ] = useState({
        texto: `Agregar ${idTexto.texto}`,
        condicion: true
    });
    const [dato, setDato ] = useState({
        nombre:""
    });
    const onChange = (e) => {
        setDato({
            ...dato,
            [e.target.name] : e.target.value
        });
    };
    const btnClick = async (e) => {
        e.preventDefault();
        const btn = e.target.id;
        switch (btn) {
            case "tipo" :
                try {
                    const nuevoTipo = await fetchPost(
                        URL_TIPO,
                        localStorage.getItem('token'),
                        dato
                    );
                    if (nuevoTipo) {
                        setTexto({ texto: "El nuevo tipo fue agregado con exito", condicion :false});
                        setDatos((prev)=>({...prev,refresh:true})); 
                    }
                } catch (error) {
                    setTexto({ texto: `El nuevo tipo no pudo ser agregado: ${error.message}`, condicion :false});
                }
            break;
            case "categoria" :
                try {
                    const nuevoTipo = await fetchPost(
                        URL_CATEGORIA,
                        localStorage.getItem('token'),
                        dato
                    );
                    if (nuevoTipo==true) {
                        setTexto({ texto: "La nueva categoría fue agregado con exito", condicion :false});
                        setDatos((prev)=>({...prev,refresh:true})); 
                    }
                } catch (error) {
                    setTexto({ texto: `La nueva categoría no pudo ser agregado: ${error.message}`, condicion :false});
                }
            break
            case "cancelar" :
                setAlerta((prev)=>({...prev, estado:false}));
            break
            default:
                setAlerta((prev)=>({...prev, estado:false, refresh:true}));
            break;
        }
    }


    return (
        <div className='transparenteAlerta'>
            <div className='alertaEliminar'>
                <Parrafo clase={"alertaParrafo"} texto={texto.texto} />
                {texto.condicion ? (
                    <>
                        <FormularioInput id={"nombre"} tipo={"text"} texto={`Nombre de ${idTexto.id}`} value={dato.nombre} onChan={onChange}/>
                        <div className='botonSiNo'>
                            <Boton btn={{id:idTexto.id, clase:"alerta", texto: idTexto.texto}} btnClick={btnClick}/>
                            <Boton btn={{id:"cancelar", clase:"alerta", texto: "Cancelar"}} btnClick={btnClick}/>
                        </div>
                    </>
                ): (null)}
                <Boton btn={{id:"cerrar", clase:"cerrar", texto: "X"}} btnClick={btnClick}/>
            </div>
        </div>
    )
}

export default CargarAlerta;