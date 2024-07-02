import { createContext, useEffect, useState } from "react";
//import { useAuth } from "../auth/AuthContext";
import { fetchGet } from "../funciones fetch/funciones";
import { URL_CATEGORIA, URL_METODOPAGO, URL_PRODUCTO, URL_SUCURSAL, URL_TIPO } from "../../endPoints/endPoints";


export const contexto = createContext({});
export const ProveedorContexto = ({children}) => {
    const arregloImg = ['https://i.pinimg.com/736x/63/4e/bf/634ebf954f6eaac31977ffaf2cea8cd7.jpg',
        'https://i.pinimg.com/236x/09/4c/a6/094ca6e512e1305df5acbff3d8447079.jpg',
        'https://i.pinimg.com/236x/60/cf/60/60cf6095630a2af374e19364e6878838.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDFj3iHqrzzgzQ5eeKqaC5vQqCGswZWdtGTwehirhme6Tf8ZZYOgR7SoRbZyKGiVUDT_w&usqp=CAU',
        'https://i.pinimg.com/236x/5e/1e/b8/5e1eb8c109741e5559814f940428bcb8.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNwLbCvO9eyfl5I8e61cnHxu2uZzPx8q8d0w&s',
        'https://misimagenesde.com/wp-content/uploads/2017/05/animales-chistosos-4.jpg',
        'https://i.pinimg.com/originals/1d/84/36/1d8436ad0603bea560b177712df7acea.jpg',
        'https://www.cnet.com/a/img/resize/b854d3939da1a906bb6e6ce88c8ce7f626494ba9/hub/2020/09/10/4c9c4120-da32-4478-95ad-f9feb7d7e20c/cwawei-ping-peng-so-hot-00006854.jpg?auto=webp&fit=crop&height=675&width=1200',
        'https://i.pinimg.com/originals/b9/de/fa/b9defa15dbd7a8fea981fe770fcf6d6d.jpg',
        'https://4.bp.blogspot.com/-mihiO6cDELM/UXrkKbUeWlI/AAAAAAAA3AE/5xTrW2H0td8/s1600/Fotos+Divertidas+de+Animales+13.jpg',
        'https://i.pinimg.com/236x/00/52/a5/0052a5c5339836152507077f88fa37e8.jpg',
        'https://www.nationalgeographic.com.es/medio/2022/10/22/ha-sido-un-largo-camino-pero-aqui-estoy_1d86682d_1200x1200.jpg']
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
        productoActual:null,
        sucursales: [],
        categoria: [], 
        refresh : true, 
        refreshSucursal: true,
        userAct: null,
        metodoPago:null,
        pedidosUsuarioActual:null,
        imgPerfil:[]
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
                    arregloImg.sort(() => Math.random() - 0.5);
                    setDatos(prev => ({
                        ...prev,
                        productos,
                        categoria,
                        tipo,
                        refresh: false, 
                        imgPerfil:arregloImg
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

    useEffect(() => {
        const fetchMetodosPago = async () =>{
            try {
                console.log("Fetching metodos de pago...");
                const res = await fetchGet(URL_METODOPAGO, localStorage.getItem('token'));
                if (res) {
                    setDatos((prev) => ({
                        ...prev,
                        metodoPago:res
                    }));
                }
            } catch (error) {
                console.error("Error fetching sucursales", error);
            }
        }
        fetchMetodosPago();
    }, []);


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