import React, { useContext, useState } from 'react';
import { contexto } from '../contexto/contexto';

const AddSucursal = () => {
    const { sucursales, setSucursales, datos } = useContext(contexto);
    const { usuarioActivo } = datos;
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

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(URL_SUCURSALES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevaSucursal),
        })
        .then(res => res.json())
        .then(sucursal => setSucursales([...sucursales, sucursal]))
        .catch(error => console.error('Error al agregar sucursal:', error));
        setNuevaSucursal({
            nombre: '',
            direccion: '',
            telefono: '',
            email: '',
            instagram: '',
            facebook: '',
            imagen: ''
        });
    };

    if (!usuarioActivo.administrador) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="nombre" value={nuevaSucursal.nombre} onChange={handleChange} placeholder="Nombre" />
            <input name="direccion" value={nuevaSucursal.direccion} onChange={handleChange} placeholder="Dirección" />
            <input name="telefono" value={nuevaSucursal.telefono} onChange={handleChange} placeholder="Teléfono" />
            <input name="email" value={nuevaSucursal.email} onChange={handleChange} placeholder="Email" />
            <input name="instagram" value={nuevaSucursal.instagram} onChange={handleChange} placeholder="Instagram" />
            <input name="facebook" value={nuevaSucursal.facebook} onChange={handleChange} placeholder="Facebook" />
            <input name="imagen" value={nuevaSucursal.imagen} onChange={handleChange} placeholder="URL de la Imagen" />
            <button type="submit">Agregar Sucursal</button>
        </form>
    );
};

export default AddSucursal;
