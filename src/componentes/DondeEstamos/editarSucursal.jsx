import { useEffect, useState } from "react";
import { fetchPut } from "../funciones fetch/funciones";
import { useNavigate } from "react-router-dom";
import FormularioInput from "../formularioInput/FormularioInput";
import Boton from "../boton/Boton";
import Modal from "../modal/modal";
import AlertSucursal from "../alertSucursal/AlertSucursal";
import { URL_SUCURSAL } from "../../endPoints/endPoints";


function EditarSucursal ({sucursalPorEditar, setSucursalPorEditar}) {
    const [alerta, setAlerta] = useState({ estado: false, tipo: '', idTexto: '', mensaje: '' });
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();
    const [editedSucursal, setEditedSucursal] = useState(sucursalPorEditar != null ? {sucursalPorEditar} : {
        imagen: "",
        nombre: "",
        direccion: "",
        telefono: "",
        email: "",
        instagram: "",
        facebook: ""
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (sucursalPorEditar != null) {
setIsEditing(true)
        }

    },[])
    

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
                setSucursalPorEditar(null)
            }
        } catch (error) {
            console.error("Error al editar la sucursal:", error);
        } finally {
            setIsSaving(false);
        }
    };

   

    
    return(
        <>
       
            
                <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
                 
                        <>
                        
                            <img className='card-img-form' src={editedSucursal.imagen} alt={sucursalPorEditar.nombre} />
                            <form onSubmit={handleSave} className='form-modal'>
                                <FormularioInput className={'imagen'} id={"imagen"} value={editedSucursal.imagen} tipo={"text"} texto={"Url_Imagen"} onChan={handleEditChange} />
                                <FormularioInput id={"nombre"} value={editedSucursal.nombre} tipo={"text"} texto={"Nombre"} onChan={handleEditChange} />
                                <FormularioInput id={"direccion"} value={editedSucursal.direccion} tipo={"text"} texto={"Dirección"} onChan={handleEditChange} />
                                <FormularioInput id={"telefono"} value={editedSucursal.telefono} tipo={"text"} texto={"Teléfono"} onChan={handleEditChange} />
                                <FormularioInput id={"email"} value={editedSucursal.email} tipo={"text"} texto={"Email"} onChan={handleEditChange} />
                                <FormularioInput id={"instagram"} value={editedSucursal.instagram} tipo={"text"} texto={"Instagram"} onChan={handleEditChange} />
                                <FormularioInput id={"facebook"} value={editedSucursal.facebook} tipo={"text"} texto={"Facebook"} onChan={handleEditChange} />
                                <div>
                                    <Boton btn={{ id: "editar", clase: "comun", texto: "Guardar" }} btnClick={handleSave} />
                                </div>
                            </form>
                        </>
                    
                </Modal>
           
          {alerta.estado && (
                <AlertSucursal
                    setAlerta={setAlerta}
                    idTexto={alerta.idTexto}
                    handleAlertAction={handleAlertAction}
                    mensaje={alerta.mensaje}
                />
            )}
        </>
    )
}
export default EditarSucursal;