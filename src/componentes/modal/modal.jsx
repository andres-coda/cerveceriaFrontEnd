// Modal.js
import React, { useEffect } from 'react';
import './modal.css';
import { FaWindowClose } from "react-icons/fa";

const Modal = ({ isOpen, onClose, children }) => {
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

  if (!isOpen) return null;

  return (
    
      <div className="modal-overlay-sucursal">
        <div className="modal-content-sucursal">
          <button className="modal-close-sucursal" onClick={onClose}>
            <FaWindowClose className='icon-close'/>
          </button>
          {children}
        </div>
      </div>
  
  );
};

export default Modal;
