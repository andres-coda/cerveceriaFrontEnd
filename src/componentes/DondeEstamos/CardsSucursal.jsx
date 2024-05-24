import React, { useContext, useState } from 'react';
import { FaFacebook, FaWhatsapp, FaInstagram, FaMailBulk, FaEdit, FaTrash } from 'react-icons/fa';
import { CiLocationOn } from 'react-icons/ci';
import { contexto } from '../contexto/contexto';
import { fetchDelete } from '../funciones fetch/funciones';
import { URL_SUCURSAL } from '../../endPoints/endPoints';

const CardsSucursal = ({ sucursal }) => {
    const { sucursales, setSucursales, datos } = useContext(contexto);
    const [isEditing, setIsEditing] = useState(false);
    const [editedSucursal, setEditedSucursal] = useState(sucursal);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedSucursal({ ...editedSucursal, [name]: value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`${URL_SUCURSAL}/${sucursal.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedSucursal),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const updatedSucursal = await response.json();
            const nuevasSucursales = sucursales.map(s => s.id === updatedSucursal.id ? updatedSucursal : s);
            setSucursales(nuevasSucursales);
            setIsEditing(false);
        } catch (error) {
            console.error('Error al editar sucursal:', error);
        }
    };

    const handleDelete = async () => {
        try {
            console.log(sucursal.id);
            const response = await fetchDelete(URL_SUCURSAL+'/'+sucursal.id, localStorage.getItem('token'))
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setDatos((prev)=>({...prev, refreshSucursal:true}))
        } catch (error) {
            console.error('Error al eliminar sucursal:', error);
        }
    };

    return (
        <div className={sucursal.deleted? 'cards-sucursalEliminada' : 'cards-sucursal'}>
            {isEditing ? (
                <div>
                    <input name="nombre" value={editedSucursal.nombre} onChange={handleEditChange} />
                    <input name="direccion" value={editedSucursal.direccion} onChange={handleEditChange} />
                    <input name="telefono" value={editedSucursal.telefono} onChange={handleEditChange} />
                    <input name="email" value={editedSucursal.email} onChange={handleEditChange} />
                    <input name="instagram" value={editedSucursal.instagram} onChange={handleEditChange} />
                    <input name="facebook" value={editedSucursal.facebook} onChange={handleEditChange} />
                    <button onClick={handleSave}>Guardar</button>
                </div>
            ) : (
                <div>
                    <div className='card-img-container'>
                        <img className='card-img' src={sucursal.imagen} alt={sucursal.nombre} />
                    </div>
                    <h1 className='card-h1'>{sucursal.nombre}</h1>
                    <h3 className='card-h3'><CiLocationOn className='icon' />{sucursal.direccion}</h3>
                    <h3 className='card-h3'><FaWhatsapp className='icon' />{sucursal.telefono}</h3>
                    <h3 className='card-h3'><FaMailBulk className='icon' />{sucursal.email}</h3>
                    <h3 className='card-h3'><FaInstagram className='icon' />{sucursal.instagram}</h3>
                    <h3 className='card-h3'><FaFacebook className='icon' />{sucursal.facebook}</h3>
                </div>
            )}
            {datos.userAct && datos.userAct.role === "admin" ? (
                <div>
                    <button onClick={() => setIsEditing(true)}><FaEdit /></button>
                    <button onClick={handleDelete}><FaTrash /></button>
                </div>
            ) : (null)}
        </div>
    );
};

export default CardsSucursal;
