import React, { useContext, useState, useEffect } from 'react';
import { contexto } from '../contexto/contexto';
import Boton from '../boton/Boton';
import { fetchPut, fetchGet } from '../funciones fetch/funciones';
import { URL_SUCURSAL } from '../../endPoints/endPoints';
import FormularioInput from '../formularioInput/FormularioInput';
import Subtitulo from '../subtitulo/Subtitulo';
import { useNavigate, useLocation } from 'react-router-dom';

const EditSucursal = () => {
    const { setDatos } = useContext(contexto);
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.pathname.split('/').slice(-1)[0];
    const [sucursal, setSucursal] = useState({
        nombre: '',
        direccion: '',
        telefono: '',
        email: '',
        instagram: '',
        facebook: '',
        imagen: ''
    });

    useEffect(() => {
        const fetchSucursal = async () => {
            try {
                const data = await fetchGet(`${URL_SUCURSAL}/${id}`, localStorage.getItem('token'));
                setSucursal(data);
            } catch (error) {
                console.error("Error fetching sucursal data: ", error);
            }
        };

        fetchSucursal();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSucursal({ ...sucursal, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetchPut(`${URL_SUCURSAL}/${id}`, localStorage.getItem('token'), sucursal);
            if (res) {
                setDatos((prev) => ({ ...prev, refresh: true }));
                navigate('/dondeestamos'); // Redirige a la lista de sucursales después de la edición
            }
        } catch (error) {
            console.error("La sucursal no se pudo editar: " + error);
        }
    };

    return (
        <>
            <div className='conteinerGeneral'>
                <div className='cargarMenu'>
                    <Subtitulo clase={"subtitulo"} texto={"Editar sucursal"} />
                    <form onSubmit={handleSubmit} className='formulario'>
                        <FormularioInput id={"nombre"} value={sucursal.nombre} tipo={"text"} texto={"Nombre"} onChan={handleChange} />
                        <FormularioInput id={"direccion"} value={sucursal.direccion} tipo={"text"} texto={"Dirección"} onChan={handleChange} />
                        <FormularioInput id={"telefono"} value={sucursal.telefono} tipo={"text"} texto={"Teléfono"} onChan={handleChange} />
                        <FormularioInput id={"email"} value={sucursal.email} tipo={"text"} texto={"Email"} onChan={handleChange} />
                        <FormularioInput id={"instagram"} value={sucursal.instagram} tipo={"text"} texto={"Instagram"} onChan={handleChange} />
                        <FormularioInput id={"facebook"} value={sucursal.facebook} tipo={"text"} texto={"Facebook"} onChan={handleChange} />
                        <FormularioInput id={"imagen"} value={sucursal.imagen} tipo={"text"} texto={"Url imagen"} onChan={handleChange} />
                        <Boton btn={{ id: "editSucursal", clase: "comun", texto: "Guardar cambios" }} btnClick={handleSubmit} />
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditSucursal;
