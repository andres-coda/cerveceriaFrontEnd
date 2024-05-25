import { createContext, useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { fetchGet } from "../funciones fetch/funciones";
import { URL_CATEGORIA, URL_PRODUCTO, URL_SUCURSAL, URL_TIPO } from "../../endPoints/endPoints";


export const contexto = createContext({});
export const ProveedorContexto = ({children}) => {
    const [ auth, setAuth ] = useState ({});
    const [sucursales, setSucursales] = useState([]);

 


    const [ datos, setDatos ] = useState ({
        carrito:[], 
        tipo:[], 
        usuario:[], 
        usuarioActivo: {
            usuario:{user: "login"}, 
            administrador: fal
        }, 
        datoAEditar: null, 
        productos:[], 
        sucursales: [],
        categoria: [], 
        refresh : true, 
        refreshSucursal: true,
        userAct: null
    });
    
    useEffect(() => {
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
                        tipo,
                        refresh: false
                    }));
                } catch (error) {
                    console.error("Error fetching data", error);
                }
            };
            fetchData();
        }
    }, [datos.refresh]);
    useEffect(() => {
        if (datos.refreshSucursal) { 
            const fetchSucursales = async () =>{
                try {
                    console.log("Fetching sucursales...");
                    const res = await fetchGet(URL_SUCURSAL, localStorage.getItem('token'));
                    if (res) {
                        setSucursales(res);
                        setDatos(prev => ({
                            ...prev,
                            sucursales: res,
                            refreshSucursal: false
                        }));
                    }
                } catch (error) {
                    console.error("Error fetching sucursales", error);
                }
            };
            fetchSucursales();
        }
    }, [datos.refreshSucursal]);


    return (
        <contexto.Provider value={{datos, setDatos, sucursales } } >
            { children }
        </contexto.Provider>
    )
}

/*
fetch(URL_SUCURSALES)
            .then(res => res.json())
            .then(sucursales => {
                if (Array.isArray(sucursales)) {
                    setSucursales(sucursales);
                    setDatos((prev)=>({...prev, sucursales, refreshSucursal:false}));
                } else {
                    console.error("La respuesta de sucursales no es un array:", sucursales);
                }
            })
            .catch(error => {
                console.error(`Error al obtener los datos de sucursales: `, error);
            });
        setDatos((prev)({...prev, refreshSucursal:false}));*/