import './MenuDetalles.css'
import { useContext, useState, useEffect } from "react";
import { contexto } from '../contexto/contexto';
import Parrafo from '../parrafo/Parrafo';
import Boton from '../boton/Boton';
function MenuDetalles( {dato} ) {
    const { datos, setDatos } = useContext(contexto);
    
    return (
        <div className="transparente">
            
        </div>
    );
};

export default MenuDetalles;