import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from "../../assets/Logo.png"
import BurguerButton from '../burguerButton/BurguerButton';
import { FaShoppingCart } from 'react-icons/fa';
import NavDropdown from 'react-bootstrap/NavDropdown'


function Header() {
  const [clicked, setClicked] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const handleClick = () => {
    setClicked(!clicked)
  }

  return (
    <div id="header" className="header">
        <div className="logoHeader">
          <img src={logo} alt="logo" />
        </div>
      <nav id="navbar" className={`navbar ${clicked ? 'active' : ''}`}>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/map">Buscar</Link></li>         
          <NavDropdown
            id="nav-dropdown-dark-example"
            title="Nosotros"
            menuVariant="light"
          >
            <div className='back-drop'>
              <NavDropdown.Item className='drop-item' href="/quienessomos">¿Quienes Somos?</NavDropdown.Item>
              <NavDropdown.Item className='drop-item' href="/dondeestamos">¿Donde Estamos?</NavDropdown.Item>
              <NavDropdown.Item className='drop-item' href="/contacto">Contacto</NavDropdown.Item>
            </div>
          </NavDropdown>
          <NavDropdown
            id="nav-dropdown-dark-example"
            title="Carta"
            menuVariant="light"
            // className={`dropdown ${isDropdownActive ? 'active' : ''}`}
          >
            <div className='back-drop'>
              <NavDropdown.Item className='drop-item' href="/menu">Bebidas</NavDropdown.Item>
              <NavDropdown.Item className='drop-item' href="/menu">Comida Clásica</NavDropdown.Item>
              <NavDropdown.Item className='drop-item' href="/menu">Sandwiches</NavDropdown.Item>
              <NavDropdown.Item className='drop-item' href="/menu">Comida Vegetariana</NavDropdown.Item>
              <NavDropdown.Item className='drop-item' href="/menu">Comida Sin TACC</NavDropdown.Item>
            </div>
          </NavDropdown>
          <li><Link to="/registro">Login</Link></li>
        </ul>
      </nav>
      <div className="cart-icon">         
        <Link to="/carrito" className='cart'><FaShoppingCart/></Link>       
        <span className="cart-item-count">3</span> 
      </div>

      <Link to="/reservas" className="btn-book-a-table">Reservas</Link>
      <div className="burguer">
        <BurguerButton clicked={clicked} handleClick={handleClick} onClick={() => setIsDropdownActive(false)} />
      </div>
    </div>
  )
}
export default Header;
