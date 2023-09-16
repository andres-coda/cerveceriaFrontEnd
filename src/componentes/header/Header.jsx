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
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown
              id="nav-dropdown-dark-example"
              title="Dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>



            <nav id="navbar" className={`navbar ${clicked ? 'active' : ''}`}>
                <div className="logoHeader">
                    <img src={logo} alt="logo" />
                </div>
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/map">Buscar</Link></li>
                    <li><Link to="/quienessomos">Nosotros</Link></li>
                    <li className={`dropdown ${isDropdownActive ? 'active' : ''}`}>
                        <span><Link to="#">Carta</Link></span>
                        <ul className={isDropdownActive ? 'active' : ''}>
                            <li><Link to="/menu">Bebidas</Link></li>
                            <li><Link to="/menu">Comida Clasica</Link></li>
                            <li><Link to="/menu">Sandwiches</Link></li>
                            <li><Link to="/menu">Comida Vegetariana</Link></li>
                            <li><Link to="/menu">Comida Sin TACC</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/registro">Registro</Link></li>
                </ul>
            </nav>
            <div className="cart-icon">
                <FaShoppingCart size={32} color='white'/> {/* Cambia el tamaño del icono según tus preferencias */}
                <span className="cart-item-count">3</span> {/* Aquí puedes mostrar la cantidad de elementos en el carrito */}
            </div>

            <Link to="/reservas" className="btn-book-a-table">Reservas</Link>
            <div className="burguer">
                <BurguerButton clicked={clicked} handleClick={handleClick} onClick={() => setIsDropdownActive(false)} />
            </div>
        </div>
    )
}
export default Header;
