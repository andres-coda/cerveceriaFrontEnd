//tarjetas sucursales
import React from 'react';
import './DondeEstamos.css';
import {FaFacebook} from 'react-icons/fa'
import {FaWhatsapp} from 'react-icons/fa'
import {FaInstagram} from 'react-icons/fa'
import {FaMailBulk} from 'react-icons/fa'
import {CiLocationOn} from 'react-icons/ci'

function CardsSucursal({ sucursal }) {
  {console.log(`sucursal front ${sucursal}`)}
  return (
    <div className='cards-sucursal' key={sucursal.id}>
      <img className='card-img' src={sucursal.img} alt={sucursal.nombre} />
      <h1 className='card-h1'>{sucursal.nombre}</h1>
      <h3 className='card-h3'><CiLocationOn className='icon'/>{sucursal.direccion}</h3>
      <h3 className='card-h3'><FaWhatsapp className='icon'/>{sucursal.telefono}</h3>
    </div>
  );
}

export default CardsSucursal;

/*

      <h3 className='card-h3'><FaMailBulk className='icon'/>{sucursal.email}</h3>
      <h3 className='card-h3'><FaInstagram className='icon'/>{sucursal.instagram}</h3>
      <h3 className='card-h3'><FaFacebook className='icon'/>{sucursal.facebook}</h3>
      */

