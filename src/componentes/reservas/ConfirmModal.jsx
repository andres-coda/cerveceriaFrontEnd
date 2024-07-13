import React from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="confirm-modal">      
        <p>{message}</p>
        <div className="modal-actions">
          <button className="comun" onClick={onCancel}>Cancelar</button>
          <button className="comun" onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
