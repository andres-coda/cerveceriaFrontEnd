import './FormularioInput.css'
import React from 'react'

function FormularioRadio({tipo, nombre ,valor, onChan, texto}) {
  return (
    <div className='renglon'>
        <input id={nombre} type={tipo} name={nombre} value={valor} onChange={onChan} />
        <label htmlFor={nombre}>{texto}</label>      
    </div>
  )
}

export default FormularioRadio
