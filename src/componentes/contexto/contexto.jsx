import { createContext, useEffect, useState } from "react";
export const contexto = createContext({});
export const ProvedorContexto = ({children}) => {
    const [ datos, setDatos ] = useState ({data:[], carrito:[], categorias:[], usuario:[], usuarioActivo: {usuario:"perfil"}});
    useEffect(()=>{
        fetch('http://localhost:3000/menu')
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
            arrayCategorias.push("todas");
            setDatos((prev)=>({...prev, data, categorias:arrayCategorias}));
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
