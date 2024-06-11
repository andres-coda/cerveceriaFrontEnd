import React, { useContext, useState } from 'react';
import { FaFacebook, FaWhatsapp, FaInstagram, FaMailBulk, FaEdit, FaTrash, FaUndo } from 'react-icons/fa';
import { CiLocationOn } from 'react-icons/ci';
import { contexto } from '../contexto/contexto';
import './CardsSucursal.css';  // Archivo CSS para los estilos
import AlertSucursal from '../alertSucursal/AlertSucursal';
import { fetchDelete, fetchPatCh } from '../funciones fetch/funciones';
import { URL_SUCURSAL } from '../../endPoints/endPoints';

const CardsSucursal = ({ sucursal, setSucursalPorEditar}) => {
    const { datos } = useContext(contexto);
    const [isEditing, setIsEditing] = useState(false);
    const [alerta, setAlerta] = useState({ estado: false, tipo: '', idTexto: '', mensaje: '' });

  

    const DeleteSucursal = () => {
        setAlerta({ estado: true, tipo: 'eliminar', idTexto: 'eliminar', mensaje: '¿Seguro que quiere eliminar esta sucursal?' });
    };

    const reactivarSucursal = () => {
        setAlerta({ estado: true, tipo: 'reactivar', idTexto: 'reactivar', mensaje: '¿Seguro que quiere restaurar la eliminación de esta sucursal?' });
    };

    const startEditing = () => {
        setSucursalPorEditar({
            imagen: sucursal.imagen,
            nombre: sucursal.nombre,
            direccion: sucursal.direccion,
            telefono: sucursal.telefono,
            email: sucursal.email,
            instagram: sucursal.instagram,
            facebook: sucursal.facebook
        });
        setAlerta({ estado: true, tipo: 'editar', idTexto: 'editar', mensaje: '¿Seguro que quiere editar esta sucursal?' });
    };

    const handleAlertAction = async (action) => {
        switch (action) {
            case 'editar':
                setIsEditing();
                setAlerta({ estado: false, tipo: '', idTexto: '' });
                break;
            case 'eliminar':
                try {
                    const response = await fetchDelete(`${URL_SUCURSAL}/${sucursal.id}`, localStorage.getItem('token'));
                    if (response) {
                        setDatos((prev) => ({ ...prev, refreshSucursal: true }));
                    }
                } catch (error) {
                    console.error('Error al eliminar sucursal:', error);
                }
                setAlerta({ estado: false, tipo: '', idTexto: '' });
                break;
            case 'reactivar':
                try {
                    const response = await fetchPatCh(`${URL_SUCURSAL}/${sucursal.id}`, localStorage.getItem('token'));
                    if (response) {
                        setDatos((prev) => ({ ...prev, refreshSucursal: true }));
                    }
                } catch (error) {
                    alert('Error al restaurar la sucursal:', error);
                }
                setAlerta({ estado: false, tipo: '', idTexto: '' });
                break;
            case 'cancelar':
            default:
                setAlerta({ estado: false, tipo: '', idTexto: '' });
                break;
        }
    };    
    return (
        //cards-sucursal contenedor total
        <div className={`cards-sucursal ${sucursal.deleted ? 'cards-sucursalEliminada' : ''}`}>
                     
                      <div className='card-container'>
                    <div className='card-img-container'>
                        <img className='card-img' src={sucursal.imagen} alt={sucursal.nombre} />
                            {/*card.overlay contenedor cuando hace hover vista usuario y admin*/}
                        <div className='card-overlay'>
                            <h1 className='card-h1'>{sucursal.nombre}</h1>
                            <h3 className='card-h3'><CiLocationOn className='icon' />{sucursal.direccion}</h3>
                            <h3 className='card-h3'><FaWhatsapp className='icon' />{sucursal.telefono}</h3>
                            <h3 className='card-h3'><FaMailBulk className='icon' />{sucursal.email}</h3>
                            <h3 className='card-h3'><FaInstagram className='icon' />{sucursal.instagram}</h3>
                            <h3 className='card-h3'><FaFacebook className='icon' />{sucursal.facebook}</h3>
                        </div>
                    </div>
                </div>
           
            {/*btn-icon contenedor botones iconos administración */}
            <div className='btn-icon'>
                {sucursal && sucursal.deleted ? (
                    <div>
                        <button onClick={reactivarSucursal} title='Reactivar Surcursal Eliminada' className='icon-button'><FaUndo /></button>
                    </div>
                ) : (
                    datos.userAct && datos.userAct.role === "admin" && (
                        <div className='button-icon-container-edit-remove'>
                            <button onClick={startEditing} title='Editar Surcursal' className='icon-button'><FaEdit /></button>
                            <button onClick={DeleteSucursal} title='Eliminar Surcursal' className='icon-button'><FaTrash /></button>
                        </div>
                    )
                )}
            </div>
            {alerta.estado && (
                <AlertSucursal
                    setAlerta={setAlerta}
                    idTexto={alerta.idTexto}
                    handleAlertAction={handleAlertAction}
                    mensaje={alerta.mensaje}
                />
            )}
        </div>
    );
};

export default CardsSucursal;



/* import React, { useContext, useState } from 'react';
import { FaFacebook, FaWhatsapp, FaInstagram, FaMailBulk, FaEdit, FaTrash, FaUndo } from 'react-icons/fa';
import { CiLocationOn } from 'react-icons/ci';
import { contexto } from '../contexto/contexto';
import { fetchDelete, fetchPatCh, fetchPut } from '../funciones fetch/funciones';
import { URL_SUCURSAL } from '../../endPoints/endPoints';
import Boton from '../boton/Boton';
import { Form, useNavigate } from 'react-router-dom';
import FormularioInput from '../formularioInput/FormularioInput';
import Modal from '../modal/modal';
import AlertSucursal from '../alertSucursal/AlertSucursal';
import AnimatedSVG from '../animacion/AnimatedSVG';


const CardsSucursal = ({ sucursal }) => {
    const [alerta, setAlerta] = useState({ estado: false, tipo: '', idTexto: '', mensaje: '' });
    const { setDatos, datos } = useContext(contexto);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
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
            imagen: sucursal.imagen,
            nombre: sucursal.nombre,
            direccion: sucursal.direccion,
            telefono: sucursal.telefono,
            email: sucursal.email,
            instagram: sucursal.instagram,
            facebook: sucursal.facebook
        });
        setAlerta({ estado: true, tipo: 'editar', idTexto: 'editar', mensaje: '¿Seguro que quiere editar esta sucursal?' });
    };

    const handleEditChange = (e) => {
        setEditedSucursal({ ...editedSucursal, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const response = await fetchPut(`${URL_SUCURSAL}/${sucursal.id}`, localStorage.getItem('token'), editedSucursal);
            if (response) {
                setDatos((prev) => ({ ...prev, refresh: true }));
                 setIsEditing(false);
                navigate('/dondeestamos');
            }
        } catch (error) {
            console.error("Error al editar la sucursal:", error);
        } finally {
          setIsSaving(false); // Indica que se ha completado la acción de guardar (ya sea con éxito o con error)
        }
    };

    const DeleteSucursal = () => {
        setAlerta({ estado: true, tipo: 'eliminar', idTexto: 'eliminar', mensaje: '¿Seguro que quiere eliminar esta sucursal?' });
    };

    const reactivarSucursal = () => {
        setAlerta({ estado: true, tipo: 'reactivar', idTexto: 'reactivar', mensaje: '¿Seguro que quiere restaurar la eliminación de esta sucursal?' });
    };

    const handleAlertAction = async (action) => {
        switch (action) {
            case 'editar':
                setIsEditing(true);
                setAlerta({ estado: false, tipo: '', idTexto: '' });
                break;
            case 'eliminar':
                try {
                    const response = await fetchDelete(`${URL_SUCURSAL}/${sucursal.id}`, localStorage.getItem('token'));
                    if (response) {
                        setDatos((prev) => ({ ...prev, refreshSucursal: true }));
                    }
                } catch (error) {
                    console.error('Error al eliminar sucursal:', error);
                }
                setAlerta({ estado: false, tipo: '', idTexto: '' });
                break;
            case 'reactivar':
                try {
                    const response = await fetchPatCh(`${URL_SUCURSAL}/${sucursal.id}`, localStorage.getItem('token'));
                    if (response) {
                        setDatos((prev) => ({ ...prev, refreshSucursal: true }));
                    }
                } catch (error) {
                    alert('Error al restaurar la sucursal:', error);
                }
                setAlerta({ estado: false, tipo: '', idTexto: '' });
                break;
            case 'cancelar':
            default:
                setAlerta({ estado: false, tipo: '', idTexto: '' });
                break;
        }
    };

    return (
        <div className={sucursal.deleted ? 'cards-sucursalEliminada' : 'cards-sucursal'}>
            {isEditing && (
              <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
                { isSaving ? (<AnimatedSVG />  ):(
                    <>
                    <img className='card-img-form' src={sucursal.imagen} alt={sucursal.nombre} />
                    <form onSubmit={handleSave} className='form-modal'>
                        <FormularioInput id={"imagen"}  value={editedSucursal.imagen} tipo={"text"} texto={"Url_Imagen"} onChan={handleEditChange} />
                        <FormularioInput id={"nombre"} value={editedSucursal.nombre} tipo={"text"} texto={"Nombre"} onChan={handleEditChange} />
                        <FormularioInput id={"direccion"}  value={editedSucursal.direccion} tipo={"text"} texto={"Dirección"} onChan={handleEditChange} />
                        <FormularioInput id={"telefono"}  value={editedSucursal.telefono} tipo={"text"} texto={"Teléfono"} onChan={handleEditChange} />
                        <FormularioInput id={"email"}  value={editedSucursal.email} tipo={"text"} texto={"Email"} onChan={handleEditChange} />
                        <FormularioInput id={"instagram"}  value={editedSucursal.instagram} tipo={"text"} texto={"Instagram"} onChan={handleEditChange} />
                        <FormularioInput id={"facebook"} value={editedSucursal.facebook} tipo={"text"} texto={"Facebook"} onChan={handleEditChange} />
                         <div>
                            <Boton btn={{ id: "editar", clase: "comun", texto: "Guardar" }} btnClick={handleSave} />
                        </div>
                    </form>
                    </>
                    )}
                
                </Modal>
            )}
           
            
            {!isEditing && (
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
                {sucursal && sucursal.deleted ? (
                  <div>
                        <button onClick={reactivarSucursal} title='Reactivar Surcursal Eliminada' className='icon-button'><FaUndo /></button>
                    </div>
                ) : (
                  datos.userAct && datos.userAct.role === "admin" && (
                    <div>
                            <button onClick={startEditing} title='Editar Surcursal' className='icon-button'><FaEdit /></button>
                            <button onClick={DeleteSucursal} title='Eliminar Surcursal' className='icon-button'><FaTrash /></button>
                        </div>
                    )
                  )}
            </div>
            
            {alerta.estado && (
              <AlertSucursal
              setAlerta={setAlerta}
              idTexto={alerta.idTexto}
                    handleAlertAction={handleAlertAction}
                    mensaje={alerta.mensaje}
                />
            )}
        </div>
    );
};

export default CardsSucursal;
 */