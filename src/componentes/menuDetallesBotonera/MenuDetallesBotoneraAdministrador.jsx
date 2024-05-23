import { useEffect, useState } from 'react';
import Boton from '../boton/Boton';
import './MenuDetallesBotonera.css';
function MenuDetallesBotonera({btnClick, idTexto}){
    return(
        <div className='botoneraAdministrador'>
            <Boton btn={{id:"original", clase:"comun", texto: "Vista del cliente"}} btnClick={btnClick}/>
            <Boton btn={{id:"editar", clase:"comun", texto: "Editar"}} btnClick={btnClick}/>
            <Boton btn={{id:idTexto, clase:"comun", texto: idTexto}} btnClick={btnClick}/>
        </div>
    );
};

export default MenuDetallesBotonera;