import { useContext, useEffect } from "react";
import { contexto } from "../contexto/contexto";

const URL_PRODUCTO = 'http://localhost:3000/producto'
const URL_CATEGORIAS = 'http://localhost:3000/categoria'
const URL_TIPOS = 'http://localhost:3000/tipo'

const fetchGet = async (url, token) =>{
    //if (userAct) {
     try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    //"Authorization": `Bearer ${token}`, 
                    "Content-Type": "application/json",
                    ...(token && { "Authorization": `Bearer ${token}` }) // Usualmente el token se envía en el header Authorization
                }
            })
            return await res.json();
        } catch (error) {
            console.error(`Error en el fetch al obtener los productos`, error);
            throw error;
  
  }
  }

  const fetchPost = async (url, token, bodi) =>{
     try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { "Authorization": `Bearer ${token}` })
                },
                body: JSON.stringify(bodi),
            });
            if (res.ok) {
                return await response.json();
            } else {
                // Manejar el caso de respuesta no exitosa aquí
                console.log("Error en la solicitud HTTP:", response.status, response.statusText);
            }
        } catch (error) {
          setMensaje({
            msj: "No se pudo cargar el producto",
            error: true,
          })
          console.log(error);
        }
    }

    const fetchPut = async (url, token, bodi) =>{
        try {
               const res = await fetch(url, {
                   method: "PUT",
                   headers: {
                       "Content-Type": "application/json",
                       ...(token && { "Authorization": `Bearer ${token}` })
                   },
                   body: JSON.stringify(bodi),
               });
               if (res.ok) {
                   return await res.json();
               } else {
                   // Manejar el caso de respuesta no exitosa aquí
                   console.log("Error en la solicitud HTTP:", res.status, res.statusText);
               }
           } catch (error) {
             setMensaje({
               msj: "No se pudo cargar el producto",
               error: true,
             })
             console.log(error);
           }
       }

       const fetchPatCh = async (url, token) =>{
        try {
               const res = await fetch(url, {
                   method: "PATCH",
                   headers: {
                       "Content-Type": "application/json",
                       ...(token && { "Authorization": `Bearer ${token}` })
                   }
               });
               if (res.ok) {
                   return await response.json();
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

       const fetchDelete = async (url, token) =>{
        try {
               const res = await fetch(url, {
                   method: "DELETE",
                   headers: {
                       "Content-Type": "application/json",
                       ...(token && { "Authorization": `Bearer ${token}` })
                   }
               });
               if (res.ok) {
                   return await response.json();
               } else {
                   // Manejar el caso de respuesta no exitosa aquí
                   console.log("Error en la solicitud HTTP:", response.status, response.statusText);
               }
           } catch (error) {
             setMensaje({
               msj: "El elemento no pudo ser borrado",
               error: true,
             })
             console.log(error);
           }
       }



export  { fetchGet, fetchPost, fetchPut, fetchPatCh, fetchDelete};