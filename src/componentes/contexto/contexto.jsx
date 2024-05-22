import { createContext, useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { fetchGet } from "../funciones fetch/funciones";
import { URL_CATEGORIA, URL_TIPO } from "../../endPoints/endPoints";


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
    const [ auth, setAuth ] = useState ({});
    const [sucursales, setSucursales] = useState([]);

 


    const [ datos, setDatos ] = useState ({
        carrito:[], 
        tipo:[], 
        usuario:[], 
        usuarioActivo: {
            usuario:{user: "login"}, 
            administrador: false
        }, 
        datoAEditar: null, 
        productos:[], 
        categoria: [], 
        refresh : true, 
        userAct: null
    });
    
    if (datos.refresh) {
        const fetchData = async () => {
            try {
              const token = localStorage.getItem('token');
              const [productos, categoria, tipo] = await Promise.all([
                fetchGet(URL_PRODUCTO, token),
                fetchGet(URL_CATEGORIA, token),
                fetchGet(URL_TIPO, token)
              ]);
              setDatos(prev => ({
                ...prev,
                productos,
                categoria,
                tipo
              }));
            } catch (error) {
              console.error("Error fetching data", error);
            }
          };
        
          fetchData();
          setDatos((prev)=>({...prev,refresh:false}));
    }

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

    return (
        <contexto.Provider value={{datos, setDatos, sucursales } } >
            { children }
        </contexto.Provider>
    )
}
