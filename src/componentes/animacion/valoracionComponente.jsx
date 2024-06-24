import React from 'react';
import './valoracion.css'
import { CiBeerMugFull } from "react-icons/ci";
import { RiBeerFill } from "react-icons/ri";
import { RiBeerLine } from "react-icons/ri";

function ValoracionComponent({ valoracion }) {
  return (
    <div className='producto-valoracion' >
      {[...Array(10)].map((_, index) => (
        <>
        {index+1<=valoracion ? (
            <RiBeerFill key={index}/>
        ) : (
            <RiBeerLine key={index}/> 
        )}
        </>
      ))}   
    </div>
  );
};

export default ValoracionComponent;