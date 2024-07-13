import './modalGeneral.css'
import { FaTimes } from "react-icons/fa";
import Boton from "../boton/Boton";
import { useEffect } from 'react';

function ModalGeneral({children, onClose, isOpen}){
    useEffect(() => {
        if (isOpen) {
          // Evitar el desplazamiento en el fondo cuando el modal está abierto
          document.body.style.overflow = 'hidden';
        } else {
          // Restaurar el desplazamiento en el fondo cuando el modal está cerrado
          document.body.style.overflow = 'auto';
        }
    
        // Restaurar el desplazamiento al desmontar el componente
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, [isOpen]);
      
    if (!isOpen) return null
    return (
        <div className='modalFondoTransparente'>
            <div className="modalFondo">
                <Boton btn={{id:"cerrar", clase: "cerrar", texto:<FaTimes />}} btnClick={onClose} />
                {children}
            </div>
        </div>
    )
}

export default ModalGeneral;