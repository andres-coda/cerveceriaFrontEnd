import React from 'react';
import './Modal.css';
import QRCode from 'qrcode.react';

function Modal({ isVisible, onClose, data, qrDataTemplate, contentStructure }) {
  if (!isVisible) return null;

  const qrData = qrDataTemplate(data);

  return (
    <div className="modal">
      <span className="close" onClick={onClose}>&times;</span>
      <img src="src/assets/Logo.png" alt="Logo del Restaurante" />
      <span className='line-modal'></span>
      <h3>¡¡{data.titulo}!!</h3>
      {contentStructure.map((content, index) => {
        if (content.type === 'paragraph') {
          return <p key={index}>{content.label} <strong>{data[content.field]}</strong></p>;
        }
        return null;
      })}
      <div className="qr-code">
        <QRCode value={qrData} />
      </div>
      <span className='line-modal'></span>
      <p>El Ticket se ha enviado al email: <strong>{data.email}</strong></p>
    </div>
  );
}

export default Modal;
