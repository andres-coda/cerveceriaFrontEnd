import { createContext, useEffect, useState } from "react";
export const contexto = createContext({});
const URL = 'http://localhost:3000/menu';
export const ProveedorContexto = ({children}) => {
    const [ datos, setDatos ] = useState ({data:[], carrito:[], categorias:[], tipo:[], usuario:[], usuarioActivo: {usuario:"perfil"}});
    useEffect(()=>{
        fetch(URL)
        .catch(error =>{
            console.error(`Error en el fetch: `, error);
            throw error;
        })
        .then(res=> res.json())
        .then(data =>{
            let arrayCategorias = data.reduce((unicaCategoria, item)=>{
                if (!unicaCategoria.includes(item.category)) {
                    unicaCategoria.push(item.category);
                }
                return unicaCategoria;
            },[]);
            let arrayTipo = data.reduce((unicoTipo, item)=>{
                if (!unicoTipo.includes(item.tipo)) {
                    unicoTipo.push(item.tipo);
                }
                return unicoTipo;
            },[]);
            setDatos((prev)=>({...prev, data, categorias:arrayCategorias, tipo:arrayTipo}));
        })
        .catch(error => {
            console.error(`Error al obtener los datos: `, error);
        });
    },[]);

    return (
        <contexto.Provider value={{datos, setDatos } } >
            { children }
        </contexto.Provider>
    )
}
