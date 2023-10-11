import { createContext, useEffect, useState } from "react";
export const contexto = createContext({});
const URL_MENU = 'http://localhost:3000/menu';
const URL_USER = 'http://localhost:3000/users';
export const ProveedorContexto = ({children}) => {
    const [ datos, setDatos ] = useState ({data:[], carrito:[], categorias:[], tipo:[], usuario:[], usuarioActivo: {usuario:{user: "login"}, administrador: false}, datoAEditar: undefined});
    const [ auth, setAuth ] = useState ({});
    
    

    useEffect(()=>{
        fetch(URL_USER)
        .catch(error =>{
            console.error(`Error en el fetch: `, error);
            throw error;
        })
        .then(res=> res.json())
        .then(users =>{
            let usuarioActivo = { usuario: users[0],  administrador: false  }
            setDatos((prev)=>({...prev, usuario: users, usuarioActivo: usuarioActivo}));
        })
        .catch(error => {
            console.error(`Error al obtener los datos: `, error);
        });
    },[]);
    useEffect(()=>{
        fetch(URL_MENU)
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
        <contexto.Provider value={{datos, setDatos, auth, setAuth } } >
            { children }
        </contexto.Provider>
    )
}
