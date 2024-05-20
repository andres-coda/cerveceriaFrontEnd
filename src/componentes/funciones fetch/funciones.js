import { useContext, useEffect } from "react";
import { contexto } from "../contexto/contexto";

const URL_PRODUCTO = 'http://localhost:3000/producto'
const URL_CATEGORIAS = 'http://localhost:3000/categoria'
const URL_TIPOS = 'http://localhost:3000/tipo'


const usefetchProductos = () => {
    const { setDatos } = useContext(contexto)
    useEffect(()=>{
        fetch(URL_PRODUCTO)
        .then(res=> res.json())
        .then(productos =>{
            setDatos((prev)=>({...prev, productos}))
        })
        .catch(error =>{
            console.error(`Error en el fetch al obtener los productos`, error);
            throw error;
        })
    },[])
}

const fetchGet = async (url, token, userAct) =>{
    if (userAct) {
     try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`, // Usualmente el token se envía en el header Authorization
                    "Content-Type": "application/json",
                }
            });
            return await res.json();
        } catch (error) {
            console.error(`Error en el fetch al obtener los productos`, error);
            throw error;
        }
  } else {
      try {
            const res_1 = await fetch(url);
            return await res_1.json();
        } catch (error_1) {
            console.error(`Error en el fetch al obtener los productos`, error_1);
            throw error_1;
        }
  }
  }

  const fetchPost = async (url, token, bodi) =>{
     try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`, // Usualmente el token se envía en el header Authorization
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodi),
            });
            if (res.ok) {
                const data = await response.json();
            } else {
                // Manejar el caso de respuesta no exitosa aquí
                console.log("Error en la solicitud HTTP:", response.status, response.statusText);
            }
        } catch (error) {
          setMensaje({
            msj: "No se pudo cargar el menu",
            error: true,
          })
          console.log(error);
        }
    }

const usefetchCategorias = () => {
    const { setDatos } = useContext(contexto)
    useEffect(()=>{
        fetch(URL_CATEGORIAS)
        .then(res=> res.json())
        .then(categoria =>{
            setDatos((prev)=>({...prev, categoria}))
        })
        .catch(error =>{
            console.error(`Error en el fetch al obtener los categorias`, error);
            throw error;
        })
    },[])
}

const usefetchTipos = () => {
    const { setDatos } = useContext(contexto)
    useEffect(()=>{
        fetch(URL_TIPOS)
        .then(res=> res.json())
        .then(tipo =>{
            setDatos((prev)=>({...prev, tipo}))
        })
        .catch(error =>{
            console.error(`Error en el fetch al obtener los tipos`, error);
            throw error;
        })
    },[])
}

// Componentes que usan los custom hooks
const fetchProducto = () => {
    usefetchProductos();
    return null; // O renderiza algo si es necesario
};

const fetchCategorias = () => {
    usefetchCategorias();
    return null; // O renderiza algo si es necesario
};

const fetchTipos = () => {
    usefetchTipos();
    return null; // O renderiza algo si es necesario
};

export  {usefetchProductos, usefetchCategorias, usefetchTipos, fetchCategorias, fetchProducto, fetchTipos, fetchGet, fetchPost};