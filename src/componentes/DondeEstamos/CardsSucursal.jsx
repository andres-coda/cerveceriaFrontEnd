import React, { useContext, useState } from 'react';
import { FaFacebook, FaWhatsapp, FaInstagram, FaMailBulk, FaEdit, FaTrash, FaUndo } from 'react-icons/fa';
import { CiLocationOn } from 'react-icons/ci';
import { contexto } from '../contexto/contexto';
import { fetchDelete, fetchPatCh, fetchPut } from '../funciones fetch/funciones';
import { URL_SUCURSAL } from '../../endPoints/endPoints';
import { VscLayersActive } from "react-icons/vsc";
import Boton from '../boton/Boton';
import { useNavigate } from 'react-router-dom';
import FormularioInput from '../formularioInput/FormularioInput';

const CardsSucursal = ({ sucursal }) => {
    const { setDatos, datos } = useContext(contexto);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const [editedSucursal, setEditedSucursal] = useState({
        imagen: "",
        nombre: "",
        direccion: "",
        telefono: "",
        email: "",
        instagram: "",
        facebook: ""
    });

    const startEditing = () => {
        setEditedSucursal({
            imagen:sucursal.imagen,
            nombre: sucursal.nombre,
            direccion: sucursal.direccion,
            telefono: sucursal.telefono,
            email: sucursal.email,
            instagram: sucursal.instagram,
            facebook: sucursal.facebook
        });
        setIsEditing(true);
    };

    const handleEditChange = (e) => {
        setEditedSucursal({ ...editedSucursal, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await fetchPut(`${URL_SUCURSAL}/${sucursal.id}`, localStorage.getItem('token'), editedSucursal);
            if (response) {
                setDatos((prev) => ({ ...prev, refresh: true }));
                setIsEditing(false);
                navigate('/dondeestamos')
            }
        } catch (error) {
            console.error("Error al editar la sucursal:", error);
        }
    };

    const DeleteSucursal = async () => {
        // Mostrar el diálogo de confirmación antes de eliminar
        const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar esta sucursal?");
        
        // Si el usuario confirma, proceder con la eliminación
        if (isConfirmed) {
            try {
                const response = await fetchDelete(`${URL_SUCURSAL}/${sucursal.id}`, localStorage.getItem('token'));
                
                if (response.ok) {
                    // Mostrar mensaje de eliminación exitosa
                    alert(`Sucursal ${sucursal.nombre} eliminada correctamente`);
                } else {
                    // Manejar la respuesta cuando no se elimina correctamente
                    setDatos((prev) => ({ ...prev, refreshSucursal: true }));
                }
            } catch (error) {
                console.error('Error al eliminar sucursal:', error);
            }
        } else {
            // Si el usuario cancela, no se hace nada
            console.log("Eliminación cancelada por el usuario");
        }
    };

    const reactivarSucursal = async () => {
        // Mostrar el diálogo de confirmación antes de eliminar
        const isConfirmed = window.confirm("¿Estás seguro de que deseas restaurar la eliminación de esta sucursal?");
        
        // Si el usuario confirma, proceder con la eliminación
        if (isConfirmed) {
            try {
                const response = await fetchPatCh(`${URL_SUCURSAL}/${sucursal.id}`, localStorage.getItem('token'));
                
                if (response.ok) {
                    alert(`Sucursal ${sucursal.nombre} restaurada correctamente`);
                } else {
                    setDatos((prev) => ({ ...prev, refreshSucursal: true }));
                }
            } catch (error) {
                alert('Error al restaurar la sucursal:', error);
            }
        } else {
            alert("Restauración cancelada por el usuario");
        }
    };
    

    return (
        <div className={sucursal.deleted ? 'cards-sucursalEliminada' : 'cards-sucursal'}>
            {isEditing ? (
                <div>
                    <div className='card-img-container'>
                    <input name="imagen"  value={editedSucursal.imagen} onChange={handleEditChange} />
                    </div>
                    <FormularioInput id={"nombre"} value={sucursal.nombre} tipo={"text"} texto={"Nombre"} onChan={handleEditChange} />
                    <FormularioInput id={"direccion"} value={sucursal.direccion} tipo={"text"} texto={"Dirección"} onChan={handleEditChange} />
                    <FormularioInput id={"telefono"} value={sucursal.telefono} tipo={"text"} texto={"Teléfono"} onChan={handleEditChange} />
                    <FormularioInput id={"email"} value={sucursal.email} tipo={"text"} texto={"Email"} onChan={handleEditChange} />
                    <FormularioInput id={"instagram"} value={sucursal.instagram} tipo={"text"} texto={"Instagram"} onChan={handleEditChange} />
                    <FormularioInput id={"facebook"} value={sucursal.facebook} tipo={"text"} texto={"Facebook"} onChan={handleEditChange} />
                    <FormularioInput id={"imagen"} value={sucursal.imagen} tipo={"text"} texto={"Url imagen"} onChan={handleEditChange} />
            
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
                        <button onClick={startEditing} title='Editar Surcursal'><FaEdit /></button>
                        <button onClick={DeleteSucursal} title='Eliminar Surcursal'><FaTrash /></button>
                        <button onClick={DeleteSucursal} title='Eliminar Surcursal'><FaUndo /></button>
               
                    </div>
                ) : (null)}
                {sucursal && sucursal.deleted ? (
                    <div>
                        <button onClick={reactivarSucursal} title='Reactivar Surcursal Eliminada'><VscLayersActive /></button>
                    </div>
                ) : (null)}
            </div>
        </div>
    );
};

export default CardsSucursal;
