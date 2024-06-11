// Modal.js
import React from 'react';
import './modal.css';
import { FaWindowClose } from "react-icons/fa";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className='contenedor-sucursal-modal-edit'>
    <div className="modal-overlay-sucursal">
      <div className="modal-content-sucursal">
        <button className="modal-close-sucursal" onClick={onClose}><FaWindowClose className='icon-close'/></button>
        {children}
      </div>
    </div>
    </div>
  );
};

export default Modal;
