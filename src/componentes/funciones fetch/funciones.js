import { useContext, useEffect } from "react";
import { contexto } from "../contexto/contexto";

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
            console.error(`Error en el fetch al obtener los elementos`, error);
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
                return await res.json();
            } else {
                // Manejar el caso de respuesta no exitosa aquí
                console.log("Error en la solicitud HTTP:", res.status, res.statusText);
            }
        } catch (error) {
            console.error(`Error en el fetch intentar agregar el elemento `, error);
            throw error;
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
            console.error(`Error en el fetch al intentar editar el elemento `, error);
            throw error;
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
                   return await res.json();
               } else {
                   // Manejar el caso de respuesta no exitosa aquí
                   console.log("Error en la solicitud HTTP:", res.status, res.statusText);
               }
           } catch (error) {
            console.error(`Error en el fetch al intentar reactivar el elemento `, error);
            throw error;
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
                   return await res.json();
               } else {
                   // Manejar el caso de respuesta no exitosa aquí
                   console.log("Error en la solicitud HTTP:", res.status, res.statusText);
                const errorData = await res.json();
                throw new Error(errorData.message || 'Error al eliminar el producto');            
               }
           } catch (error) {
            console.error(`Error en el fetch al intentar borrar el elemento `, error);
            throw error;
           }
       }



export  { fetchGet, fetchPost, fetchPut, fetchPatCh, fetchDelete};