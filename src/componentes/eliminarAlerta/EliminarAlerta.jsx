import { useContext, useState } from 'react';
import Boton from '../boton/Boton';
import Parrafo from '../parrafo/Parrafo';
import './EliminarAlerta.css';
import { contexto } from '../contexto/contexto';
import { fetchDelete, fetchPatCh } from '../funciones fetch/funciones';
import { URL_PRODUCTO } from '../../endPoints/endPoints';
function EliminarAlerta({dato, setAlerta, idTexto}){
    const { setDatos } = useContext(contexto)
    const [ texto, setTexto ] = useState({
        texto: "¿Seguro que quiere elimainar el menu de la lista?",
        condicion : true,
    });
    const btnClick = async (e) => {
        const btn = e.target.id;
        switch (btn) {
            case "eliminar" : 
                try {
                    const response = await fetchDelete(URL_PRODUCTO+'/'+dato.idProducto,localStorage.getItem('token'))
                    if (response==true) {
                        setTexto({ texto: "El menú fue eliminado con exito", condicion :false});
                        setDatos((prev)=>({...prev,refresh:true})); 
                    }
                } catch (error) {
                    setTexto({ texto: `El menú no pudo ser borrado: ${error.message}`, condicion :false});
                }
            break;
            case "reactivar" :
                try {
                    const response = await fetchPatCh(URL_PRODUCTO+'/'+dato.idProducto, localStorage.getItem('token'));
                    if (response==true) {
                        setTexto({ texto: "El menú fue reactivado con exito", condicion :false});
                        setDatos((prev)=>({...prev,refresh:true})); 
                    }
                } catch (error) {
                    setTexto({ texto: `El menú no pudo ser reactivado: ${error.message}`, condicion :false});
                }
            break;
            case "cancelar" :
                setAlerta((prev)=>({...prev, estado:false}));
            break;
            default :
                setAlerta((prev)=>({...prev, estado:false, refresh:true}));
            break;
        }        
    }
    return (
        <div className='transparenteAlerta'>
            <div className='alertaEliminar'>
                <Parrafo clase={"alertaParrafo"} texto={texto.texto} />
                {texto.condicion ? (
                    <div className='botonSiNo'>
                        <Boton btn={{id:idTexto, clase:"alerta", texto: idTexto}} btnClick={btnClick}/>
                        <Boton btn={{id:"cancelar", clase:"alerta", texto: "Cancelar"}} btnClick={btnClick}/>
                    </div>
                ): (null)}
                <Boton btn={{id:"cerrar", clase:"cerrar", texto: "X"}} btnClick={btnClick}/>
            </div>
        </div>
    );
};

export default EliminarAlerta;