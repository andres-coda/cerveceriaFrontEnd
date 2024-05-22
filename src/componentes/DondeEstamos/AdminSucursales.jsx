import React, { useContext, useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { contexto } from '../contexto/contexto';

const AdminSucursales = () => {
    const { sucursales, setSucursales, datos, URL_SUCURSALES, userAct } = useContext(contexto);
    const { usuarioActivo } = datos;

    const [newSucursal, setNewSucursal] = useState({
        nombre: '',
        direccion: '',
        telefono: '',
        email: '',
        instagram: '',
        facebook: '',
        imagen: ''
    });
    const [editedSucursal, setEditedSucursal] = useState(null);

    if (!usuarioActivo?.administrador) {
        return <div>No tienes permiso para ver esta sección.</div>;
    }

    const handleInputChange = (e, setSucursal) => {
        const { name, value } = e.target;
        setSucursal(prev => ({ ...prev, [name]: value }));
    };

    const handleAddSucursal = async () => {
        if(userAct){

            try {
                const response = await fetch(URL_SUCURSALES, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${datos.token}`
                    },
                    body: JSON.stringify(newSucursal)
                });
                if (!response.ok) throw new Error('Error al agregar sucursal');
                const addedSucursal = await response.json();
                setSucursales([...sucursales, addedSucursal]);
                setNewSucursal({
                    nombre: '',
                    direccion: '',
                    telefono: '',
                    email: '',
                    instagram: '',
                    facebook: '',
                    imagen: ''
                });
            } catch (error) {
                console.error(error);
            }
        } else{null}
    };

    const handleEditSucursal = async (id) => {
        try {
            const response = await fetch(`${URL_SUCURSALES}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${datos.token}`
                },
                body: JSON.stringify(editedSucursal)
            });
            if (!response.ok) throw new Error('Error al editar sucursal');
            const updatedSucursal = await response.json();
            setSucursales(sucursales.map(s => s.id === id ? updatedSucursal : s));
            setEditedSucursal(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteSucursal = async (id) => {
        try {
            const response = await fetch(`${URL_SUCURSALES}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${datos.token}`
                }
            });
            if (!response.ok) throw new Error('Error al eliminar sucursal');
            setSucursales(sucursales.filter(s => s.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='admin-sucursales'>
            <h2>Administrar Sucursales</h2>
            <div className='add-sucursal'>
                <h3>Agregar Nueva Sucursal</h3>
                <input name='nombre' value={newSucursal.nombre} onChange={(e) => handleInputChange(e, setNewSucursal)} placeholder='Nombre' />
                <input name='direccion' value={newSucursal.direccion} onChange={(e) => handleInputChange(e, setNewSucursal)} placeholder='Dirección' />
                <input name='telefono' value={newSucursal.telefono} onChange={(e) => handleInputChange(e, setNewSucursal)} placeholder='Teléfono' />
                <input name='email' value={newSucursal.email} onChange={(e) => handleInputChange(e, setNewSucursal)} placeholder='Email' />
                <input name='instagram' value={newSucursal.instagram} onChange={(e) => handleInputChange(e, setNewSucursal)} placeholder='Instagram' />
                <input name='facebook' value={newSucursal.facebook} onChange={(e) => handleInputChange(e, setNewSucursal)} placeholder='Facebook' />
                <input name='imagen' value={newSucursal.imagen} onChange={(e) => handleInputChange(e, setNewSucursal)} placeholder='URL de la Imagen' />
                <button onClick={handleAddSucursal}><FaPlus /> Agregar</button>
            </div>
            <div className='edit-sucursales'>
                <h3>Editar / Eliminar Sucursales</h3>
                {sucursales.map(sucursal => (
                    <div key={sucursal.id} className='sucursal'>
                        {editedSucursal && editedSucursal.id === sucursal.id ? (
                            <div>
                                <input name='nombre' value={editedSucursal.nombre} onChange={(e) => handleInputChange(e, setEditedSucursal)} placeholder='Nombre' />
                                <input name='direccion' value={editedSucursal.direccion} onChange={(e) => handleInputChange(e, setEditedSucursal)} placeholder='Dirección' />
                                <input name='telefono' value={editedSucursal.telefono} onChange={(e) => handleInputChange(e, setEditedSucursal)} placeholder='Teléfono' />
                                <input name='email' value={editedSucursal.email} onChange={(e) => handleInputChange(e, setEditedSucursal)} placeholder='Email' />
                                <input name='instagram' value={editedSucursal.instagram} onChange={(e) => handleInputChange(e, setEditedSucursal)} placeholder='Instagram' />
                                <input name='facebook' value={editedSucursal.facebook} onChange={(e) => handleInputChange(e, setEditedSucursal)} placeholder='Facebook' />
                                <input name='imagen' value={editedSucursal.imagen} onChange={(e) => handleInputChange(e, setEditedSucursal)} placeholder='URL de la Imagen' />
                                <button onClick={() => handleEditSucursal(sucursal.id)}>Guardar</button>
                                <button onClick={() => setEditedSucursal(null)}>Cancelar</button>
                            </div>
                        ) : (
                            <div>
                                <h4>{sucursal.nombre}</h4>
                                <p>Dirección: {sucursal.direccion}</p>
                                <p>Teléfono: {sucursal.telefono}</p>
                                <p>Email: {sucursal.email}</p>
                                <p>Instagram: {sucursal.instagram}</p>
                                <p>Facebook: {sucursal.facebook}</p>
                                <button onClick={() => setEditedSucursal(sucursal)}><FaEdit /> Editar</button>
                                <button onClick={() => handleDeleteSucursal(sucursal.id)}><FaTrash /> Eliminar</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminSucursales;
