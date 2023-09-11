import React from 'react'
import './BurguerButton.css'

function BurguerButton(props) {
  return (
    <div className='burguerButton'>
      <div  onClick={props.handleClick} 
            className={`icon nav-icon-5 ${props.clicked ? 'open' : ''}`}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default BurguerButton

