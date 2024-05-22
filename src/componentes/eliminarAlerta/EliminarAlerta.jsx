import { useContext, useState } from 'react';
import Boton from '../boton/Boton';
import Parrafo from '../parrafo/Parrafo';
import './EliminarAlerta.css';
import { contexto } from '../contexto/contexto';
import { fetchDelete } from '../funciones fetch/funciones';
import { URL_PRODUCTO } from '../../endPoints/endPoints';
function EliminarAlerta({dato, setAlerta}){
    const { setDatos } = useContext(contexto)
    const [ texto, setTexto ] = useState({
        texto: "¿Seguro que quiere elimainar el menu de la lista?",
        condicion : true,
    });
    const btnClick = async (e) => {
        const btn = e.target.id;
       
            if (btn === "si") {
                try {
                    const response = await fetchDelete(URL_PRODUCTO+'/'+dato.idProducto,localStorage.getItem('token'))
                    if (response.ok) {
                        setTexto({ texto: "El menú fue eliminado con exito", condicion :false});
                        setDatos((prev)=>({...prev,refresh:true})); 
                    }
                } catch (error) {
                    setTexto({ texto: "El menú no pudo ser borrado", condicion :false});
                }
            } else {
                setAlerta(false);
            }          
    }
    return (
        <div className='transparenteAlerta'>
            <div className='alertaEliminar'>
                <Parrafo clase={"alertaParrafo"} texto={texto.texto} />
                {texto.condicion ? (
                    <div className='botonSiNo'>
                        <Boton btn={{id:"si", clase:"comun", texto: "Eliminar"}} btnClick={btnClick}/>
                        <Boton btn={{id:"no", clase:"comun", texto: "No eliminar"}} btnClick={btnClick}/>
                    </div>
                ): (null)}
                <Boton btn={{id:"cerrar", clase:"cerrar", texto: "X"}} btnClick={btnClick}/>
            </div>
        </div>
    );
};

export default EliminarAlerta;