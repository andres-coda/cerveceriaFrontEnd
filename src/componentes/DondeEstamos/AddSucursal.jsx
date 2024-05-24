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
                <input name="nombre" value={nuevaSucursal.nombre} onChange={handleChange} placeholder="Nombre" />
                <input name="direccion" value={nuevaSucursal.direccion} onChange={handleChange} placeholder="Dirección" />
                <input name="telefono" value={nuevaSucursal.telefono} onChange={handleChange} placeholder="Teléfono" />
                <input name="email" value={nuevaSucursal.email} onChange={handleChange} placeholder="Email" />
                <input name="instagram" value={nuevaSucursal.instagram} onChange={handleChange} placeholder="Instagram" />
                <input name="facebook" value={nuevaSucursal.facebook} onChange={handleChange} placeholder="Facebook" />
                <input name="imagen" value={nuevaSucursal.imagen} onChange={handleChange} placeholder="URL de la Imagen" />
                <Boton btn={{id:"addSucursal", clase:"comun", texto: "Agregar sucursal"}} btnClick={handleSubmit}/>
            
            </form>
            </div>
            </div>
        </>
    );
};

export default AddSucursal;

/*  <button type="submit">Agregar Sucursal</button> */