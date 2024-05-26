import React, { useContext, useState } from 'react';
import { contexto } from '../contexto/contexto';
import Boton from '../boton/Boton';
import { fetchPost } from '../funciones fetch/funciones';
import { URL_SUCURSAL } from '../../endPoints/endPoints';
import FormularioInput from '../formularioInput/FormularioInput';
import Subtitulo from '../subtitulo/Subtitulo';

const AddSucursal = () => {
    const { setDatos } = useContext(contexto);
    const [nuevaSucursal, setNuevaSucursal] = useState({
        nombre: '',
        direccion: '',
        telefono: '',
        email: '',
        instagram: '',
        facebook: '',
        imagen: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevaSucursal({ ...nuevaSucursal, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetchPost(URL_SUCURSAL,localStorage.getItem('token'), nuevaSucursal);
            if ( res ) {
                setDatos((prev)=>({...prev, refresh: true}));
                setNuevaSucursal({
                    nombre: '',
                    direccion: '',
                    telefono: '',
                    email: '',
                    instagram: '',
                    facebook: '',
                    imagen: ''
                });
            }
        } catch (error) {
            console.log("la sucursal no se pudo crear "+error);
        }
    }

    return (
        <>
        <div className='conteinerGeneral'>
            <div className='cargarMenu'>
         <Subtitulo clase={"subtitulo"} texto={" Carga de sucursales "} />
            <form onSubmit={handleSubmit} className='formulario'>
                <FormularioInput id={"nombre"} value={nuevaSucursal.nombre} tipo={"text"} texto={"Nombre"} onChan={handleChange} />
                <FormularioInput id={"direccion"} value={nuevaSucursal.direccion} tipo={"text"} texto={"Dirección"} onChan={handleChange} />
                <FormularioInput id={"telefono"} value={nuevaSucursal.telefono} tipo={"text"} texto={"Teléfono"} onChan={handleChange} />
                <FormularioInput id={"email"} value={nuevaSucursal.email} tipo={"text"} texto={"Email"} onChan={handleChange} />
                <FormularioInput id={"instagram"} value={nuevaSucursal.instagram} tipo={"text"} texto={"Instagram"} onChan={handleChange} />
                <FormularioInput id={"facebook"} value={nuevaSucursal.facebook} tipo={"text"} texto={"Facebook"} onChan={handleChange} />
                <FormularioInput id={"imagen"} value={nuevaSucursal.imagen} tipo={"text"} texto={"Url imágen"} onChan={handleChange} />
                <Boton btn={{id:"addSucursal", clase:"comun", texto: "Agregar"}} btnClick={handleSubmit}/>
                        </form>
            </div>
            </div>
        </>
    );
};

export default AddSucursal;

/*  <button type="submit">Agregar Sucursal</button> */