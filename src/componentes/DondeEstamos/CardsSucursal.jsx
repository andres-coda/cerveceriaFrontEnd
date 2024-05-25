import React, { useContext, useState, useEffect } from 'react';
import { FaFacebook, FaWhatsapp, FaInstagram, FaMailBulk, FaEdit, FaTrash } from 'react-icons/fa';
import { CiLocationOn } from 'react-icons/ci';
import { contexto } from '../contexto/contexto';
import { fetchDelete, fetchPut } from '../funciones fetch/funciones';
import { URL_SUCURSAL } from '../../endPoints/endPoints';
import { VscLayersActive } from "react-icons/vsc";
import Boton from '../boton/Boton';
import { useNavigate } from 'react-router-dom';

const CardsSucursal = ({ sucursal }) => {
    const { setDatos, datos } = useContext(contexto);
    const [isEditing, setIsEditing] = useState(false);
    const navegate = useNavigate();

    const [editedSucursal, setEditedSucursal] = useState({
        nombre: sucursal.nombre || '',
        direccion: sucursal.direccion || '',
        telefono: sucursal.telefono || '',
        email: sucursal.email || '',
        instagram: sucursal.instagram || '',
        facebook: sucursal.facebook || ''
      });
   

      useEffect(() => {
        // Llamada a la API para obtener los datos de la sucursal
        // Luego, establece el estado con los valores obtenidos
        setEditedSucursal({
          nombre: sucursal.nombre || '',
          direccion: sucursal.direccion || '',
          telefono: sucursal.telefono || '',
          email: sucursal.email || '',
          instagram: sucursal.instagram || '',
          facebook: sucursal.facebook || ''
        });
      }, [sucursal]);
      


    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedSucursal({ ...editedSucursal, [name]: value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await fetchPut(`${URL_SUCURSAL}/${editedSucursal.id}`, localStorage.getItem('token'), editedSucursal);
            console.log(editedSucursal ,'put entrada');

            if (response) {
                setDatos((prev) => ({ ...prev, refresh: true }));
                setIsEditing(false); // Finalizar el modo de edición
                          }
          

        } catch (error) {
            console.error("Error al editar la sucursal:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetchDelete(`${URL_SUCURSAL}/${sucursal.id}`, localStorage.getItem('token'));
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setDatos((prev) => ({ ...prev, refreshSucursal: true }));
        } catch (error) {
            console.error('Error al eliminar sucursal:', error);
        }
    };

    return (
        <div className={sucursal.deleted ? 'cards-sucursalEliminada' : 'cards-sucursal'}>
            {isEditing ? (
                <div>
                    <input name="nombre" value={editedSucursal.nombre} onChange={handleEditChange} />
                    <input name="direccion" value={editedSucursal.direccion} onChange={handleEditChange} />
                    <input name="telefono" value={editedSucursal.telefono} onChange={handleEditChange} />
                    <input name="email" value={editedSucursal.email} onChange={handleEditChange} />
                    <input name="instagram" value={editedSucursal.instagram} onChange={handleEditChange} />
                    <input name="facebook" value={editedSucursal.facebook} onChange={handleEditChange} />
                    <Boton btn={{ id: "editSucursal", clase: "comun", texto: "Guardar" }} btnClick={handleSave} />
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
            <div className='btn-icon'>
                {datos.userAct && datos.userAct.role === "admin" ? (
                    <div>
                        <button onClick={() => setIsEditing(true)} title='Editar Surcursal'><FaEdit /></button>
                        <button onClick={handleDelete} title='Eliminar Surcursal'><FaTrash /></button>
                    </div>
                ) : (null)}
                {sucursal && sucursal.deleted ? (
                    <div>
                        <button onClick={() => setIsEditing(true)} title='Restaurar Surcursal Eliminada'><VscLayersActive /></button>
                    </div>
                ) : (null)}
            </div>
        </div>
    );
};

export default CardsSucursal;
