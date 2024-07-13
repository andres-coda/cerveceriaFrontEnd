import React from 'react'
import './BurguerButton.css'

function BurguerButton(props) {

  const handleClick = () => {
    if (props.clicked) {
        props.handleClick(false); 
    } else {
        props.handleClick(true); 
    }
};
  return (
    <div className='burguerButton'>
      <div  onClick={handleClick}  
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

