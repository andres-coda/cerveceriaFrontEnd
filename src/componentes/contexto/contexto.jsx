import { createContext, useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";


export const contexto = createContext({});
const URL_PRODUCTO = 'http://localhost:3000/producto'
const URL_CATEGORIAS = 'http://localhost:3000/categoria'
const URL_LOGIN = 'http://localhost:3000/auth/login'
const URL_PERFIL = 'http://localhost:3000/auth/profile'
const URL_TIPOS = 'http://localhost:3000/tipo'
/* const URL_MENU = 'http://localhost:3000/producto';
const URL_USER = 'http://localhost:3001/users';
const URL_MENU = 'http://localhost:3001/menu';
const URL_USER = 'http://localhost:3001/users'; */
const URL_SUCURSALES = 'http://localhost:3000/sucursal'
export const ProveedorContexto = ({children}) => {
    const [ datos, setDatos ] = useState ({data:[], carrito:[], categorias:[], tipo:[], usuario:[], usuarioActivo: {usuario:{user: "login"}, administrador: true}, datoAEditar: undefined, productos:[], categoria: []});
    const [ auth, setAuth ] = useState ({});
    const [sucursales, setSucursales] = useState([]);

    useEffect(() => {
        fetch(URL_SUCURSALES)
            .then(res => res.json())
            .then(sucursales => {
                if (Array.isArray(sucursales)) {
                    setSucursales(sucursales);
                } else {
                    console.error("La respuesta de sucursales no es un array:", sucursales);
                }
            })
            .catch(error => {
                console.error(`Error al obtener los datos de sucursales: `, error);
            });
    }, []);


    const [ datos, setDatos ] = useState ({
        data:[], 
        carrito:[], 
        categorias:[], 
        tipo:[], 
        usuario:[], 
        usuarioActivo: {
            usuario:{user: "login"}, 
            administrador: false
        }, 
        datoAEditar: null, 
        productos:[], 
        categoria: [], 
        token : null, 
        userAct: null
    });
    
    useEffect(()=>{
        if (datos.userAct) {
            fetch(URL_CATEGORIAS, {
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${datos.token}`, // Usualmente el token se envía en el header Authorization
                  "Content-Type": "application/json",
                }
            })
            .then(res=> res.json())
            .then(categoria =>{
                setDatos((prev)=>({...prev, categoria}))
            })
            .catch(error =>{
                console.error(`Error en el fetch al obtener los categorias`, error);
                throw error;
            })
        } else {
            fetch(URL_CATEGORIAS)
            .then(res=> res.json())
            .then(categoria =>{
                setDatos((prev)=>({...prev, categoria}))
            })
            .catch(error =>{
                console.error(`Error en el fetch al obtener los categorias`, error);
                throw error;
            }) 
        }
    },[])


    useEffect(()=>{
        if (datos.userAct) {
        fetch(URL_TIPOS, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${datos.token}`, // Usualmente el token se envía en el header Authorization
              "Content-Type": "application/json",
            }
        })
        .then(res=> res.json())
        .then(tipo =>{
            setDatos((prev)=>({...prev, tipo}))
        })
        .catch(error =>{
            console.error(`Error en el fetch al obtener los tipos`, error);
            throw error;
        })
    } else {
        fetch(URL_TIPOS)
        .then(res=> res.json())
        .then(tipo =>{
            setDatos((prev)=>({...prev, tipo}))
        })
        .catch(error =>{
            console.error(`Error en el fetch al obtener los tipos`, error);
            throw error;
        })
    }
    },[])

    useEffect(()=>{
        if (datos.userAct) {
        fetch(URL_PRODUCTO, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${datos.token}`, // Usualmente el token se envía en el header Authorization
              "Content-Type": "application/json",
            }
        })
        .then(res=> res.json())
        .then(productos =>{
            setDatos((prev)=>({...prev, productos}))
        })
        .catch(error =>{
            console.error(`Error en el fetch al obtener los productos`, error);
            throw error;
        })
    } else {
        fetch(URL_PRODUCTO)
        .then(res=> res.json())
        .then(productos =>{
            setDatos((prev)=>({...prev, productos}))
        })
        .catch(error =>{
            console.error(`Error en el fetch al obtener los productos`, error);
            throw error;
        })
    }
    },[])

   

   

/*
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
    */

    return (
        <contexto.Provider value={{datos, setDatos, sucursales } } >
            { children }
        </contexto.Provider>
    )
}
