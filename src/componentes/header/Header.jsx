import { useContext, useState } from 'react';
import { contexto } from '../contexto/contexto';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';
import logo from "../../assets/Logo.png"
import BurguerButton from '../burguerButton/BurguerButton';
import { FaShoppingCart } from 'react-icons/fa';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
  const { datos } = useContext(contexto);
  const [clicked, setClicked] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false); 
  const [nosotrosDropdownOpen, setNosotrosDropdownOpen] = useState(false); 
  const location = useLocation();

  const handleClick = () => {
    setClicked(!clicked);
    setMenuDropdownOpen(false); 
    setNosotrosDropdownOpen(false); 
  }

  const isCartaSectionActive = location.pathname.startsWith('/menu');
  const isCarritoSectionActive = location.pathname === '/carrito'; 
  const isReservasSectionActive = location.pathname === '/reservas'; 
  const closeMenuDropdown = () => {
    setMenuDropdownOpen(false); 
  };

  const closeNosotrosDropdown = () => {
    setNosotrosDropdownOpen(false); 
  };

  return (
    <div id="header" className="header">
      <div className="logoHeader">
        <NavLink to="/"><img src={logo} alt="logo" /></NavLink>
      </div>
      <nav id="navbar" className={`navbar ${clicked ? 'active' : ''}`}>
        <ul>
          <li><NavLink to="/" activeClassName="active-link">Inicio</NavLink></li>
          <li><NavLink to="/map" activeClassName="active-link">Buscar</NavLink></li>
          <NavDropdown
            id="nav-dropdown-dark-example"
            title="Nosotros"
            menuVariant="light"
            onToggle={() => setNosotrosDropdownOpen(!nosotrosDropdownOpen)}
            show={nosotrosDropdownOpen}
          >
            <div className='back-drop'>
              <NavLink className='drop-item' to="/quienessomos" activeClassName="active-link" onClick={closeNosotrosDropdown}>¿Quienes Somos?</NavLink>
              <NavLink className='drop-item' to="/dondeestamos" activeClassName="active-link" onClick={closeNosotrosDropdown}>¿Donde Estamos?</NavLink>
              <NavLink className='drop-item' to="/contacto" activeClassName="active-link" onClick={closeNosotrosDropdown}>Contacto</NavLink>
            </div>
          </NavDropdown>
          <NavDropdown
            id="nav-dropdown-dark-example"
            title="Carta"
            menuVariant="light"
            onToggle={() => setMenuDropdownOpen(!menuDropdownOpen)}
            show={menuDropdownOpen}
          >
            <div className='back-drop'>
              <NavLink className='drop-item' to="/menu" activeClassName="active-link" onClick={closeMenuDropdown}>Carta Completa</NavLink>
              <NavLink className='drop-item' to="/menu/bebida" activeClassName="active-link" onClick={closeMenuDropdown}>Bebidas</NavLink>
              <NavLink className='drop-item' to="/menu" activeClassName="active-link" onClick={closeMenuDropdown}>Comida Clásica</NavLink>
              <NavLink className='drop-item' to="/menu" activeClassName="active-link" onClick={closeMenuDropdown}>Sandwiches</NavLink>
              <NavLink className='drop-item' to="/menu" activeClassName="active-link" onClick={closeMenuDropdown}>Comida Vegetariana</NavLink>
              <NavLink className='drop-item' to="/menu" activeClassName="active-link" onClick={closeMenuDropdown}>Comida Sin TACC</NavLink>
            </div>
          </NavDropdown>
          <li><NavLink to="/registro" activeClassName="active-link">Login</NavLink></li>
          <li><NavLink to="/reservas" activeClassName="active-link">Reservas</NavLink></li>
        </ul>
      </nav>
      <div className={`cart-icon ${isCartaSectionActive || isCarritoSectionActive || isReservasSectionActive ? 'active' : ''}`}>
        <NavLink to="/carrito" className='cart'><FaShoppingCart /></NavLink>
        <span className="cart-item-count">{datos.carrito.length}</span>
      </div>
      <div className="burguer">
        <BurguerButton clicked={clicked} handleClick={handleClick} onClick={() => setIsDropdownActive(false)} />
      </div>
    </div>
  )
}

export default Header;
