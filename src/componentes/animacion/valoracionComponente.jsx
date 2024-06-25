import React from 'react';
import './valoracion.css';
import { RiBeerFill } from "react-icons/ri";
import { RiBeerLine } from "react-icons/ri";

function ValoracionComponent({ valoracion }) {
  return (
    <div className='producto-valoracion' >
      {[...Array(5)].map((_, index) => (
        <React.Fragment key={index}>
        {index+1<=valoracion ? (
            <RiBeerFill/>
        ) : (
            <RiBeerLine/> 
        )}
        </React.Fragment>
      ))}   
    </div>
  );
};

export default ValoracionComponent;