import { useContext, useState } from 'react';
import { contexto } from '../contexto/contexto';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';
import logo from "../../assets/Logo.png";
import BurguerButton from '../burguerButton/BurguerButton';
import { FaShoppingCart } from 'react-icons/fa';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from '../auth/AuthContext';

function Header() {
  const { datos } = useContext(contexto);
  const [clicked, setClicked] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false); 
  const [nosotrosDropdownOpen, setNosotrosDropdownOpen] = useState(false); 
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const { auth, logout } = useAuth();
  const { user } = auth;

  const handleClick = () => {
    setClicked(!clicked);
    setMenuDropdownOpen(false); 
    setNosotrosDropdownOpen(false); 
    setUserDropdownOpen(false); 
  };

  const isCartaSectionActive = location.pathname.startsWith('/menu');
  const isCarritoSectionActive = location.pathname === '/carrito'; 
  const isReservasSectionActive = location.pathname === '/reservas'; 

  const closeMenuDropdown = () => setMenuDropdownOpen(false);
  const closeNosotrosDropdown = () => setNosotrosDropdownOpen(false);
  const closeUserDropdown = () => setUserDropdownOpen(false);

  return (
    <div id="header" className="header">
      <div className="logoHeader">
        <NavLink to="/"><img src={logo} alt="logo" /></NavLink>
      </div>
      <nav id="navbar" className={`navbar ${clicked ? 'active' : ''}`}>
        <ul>
          <NavDropdown
            id="nav-dropdown-dark-example"
            title="Nosotros"
            menuVariant="light"
            onToggle={() => setNosotrosDropdownOpen(!nosotrosDropdownOpen)}
            show={nosotrosDropdownOpen}
          >
            <div className='back-drop'>
              <NavLink className='drop-item' to="/quienessomos" onClick={closeNosotrosDropdown}>¿Quienes Somos?</NavLink>
              <NavLink className='drop-item' to="/dondeestamos" onClick={closeNosotrosDropdown}>¿Donde Estamos?</NavLink>
              <NavLink className='drop-item' to="/contacto" onClick={closeNosotrosDropdown}>Contacto</NavLink>
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
              <NavLink className='drop-item' to="/menu" onClick={closeMenuDropdown}>Carta Completa</NavLink>
              {Array.isArray(datos.categoria) && datos.categoria.map((categoria) => (
                categoria.productos.length > 0 && (
                  <NavLink 
                    className='drop-item' 
                    to={`/menu/${categoria.nombre}`} 
                    onClick={closeMenuDropdown} 
                    key={categoria.idCategoria}
                  >
                    {categoria.nombre.charAt(0).toUpperCase() + categoria.nombre.slice(1).toLowerCase()}
                  </NavLink>
                )
              ))}
            </div>
          </NavDropdown>
          {user ? (
            <div className="user-menu">
              <NavDropdown
                id="nav-dropdown-user"
                title={user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase()}
                menuVariant="light"
                onToggle={() => setUserDropdownOpen(!userDropdownOpen)}
                show={userDropdownOpen}
              >
                <div className='back-drop'>
                  <NavLink className='drop-item' onClick={() => { closeUserDropdown(); logout(); }}>Logout</NavLink>
                </div>
              </NavDropdown>
            </div>
          ) : (
            <li><NavLink to="/login">Login</NavLink></li>
          )}
          <li><NavLink to="/reservas">Reservas</NavLink></li>
        </ul>
      </nav>
      <div className={`cart-icon ${isCartaSectionActive || isCarritoSectionActive || isReservasSectionActive ? 'active' : ''}`}>
        <NavLink to="/carrito" className='cart'><FaShoppingCart /></NavLink>
        <span className="cart-item-count">{datos?.carrito?.length || 0}</span>
      </div>
      <div className="burguer">
        <BurguerButton clicked={clicked} handleClick={handleClick} />
      </div>
    </div>
  );
}

export default Header;




/*import { useContext, useState } from 'react';
import { contexto } from '../contexto/contexto';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';
import logo from "../../assets/Logo.png"
import BurguerButton from '../burguerButton/BurguerButton';
import { FaShoppingCart } from 'react-icons/fa';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from '../auth/AuthContext';

function Header() {
  const { datos } = useContext(contexto);
  const [clicked, setClicked] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false); 
  const [nosotrosDropdownOpen, setNosotrosDropdownOpen] = useState(false); 
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const { auth, logout } = useAuth();
  const { user } = auth;

  const handleClick = () => {
    setClicked(!clicked);
    setMenuDropdownOpen(false); 
    setNosotrosDropdownOpen(false); 
    setUserDropdownOpen(false); 
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

  const closeUserDropdown = () => {
    setUserDropdownOpen(false); 
  };

  return (
    <div id="header" className="header">
      <div className="logoHeader">
        <NavLink to="/"><img src={logo} alt="logo" /></NavLink>
      </div>
      <nav id="navbar" className={`navbar ${clicked ? 'active' : ''}`}>
        <ul>
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
              {datos.categoria.length > 0 ? ( datos.categoria.map((categoria)=>(
                <>
                  {categoria.productos.length>0 ? (
                    <NavLink className='drop-item' to={`/menu/${categoria.nombre}`} activeClassName="active-link" onClick={closeMenuDropdown} key={categoria.idCategoria}>{categoria.nombre.charAt(0).toUpperCase() + categoria.nombre.slice(1).toLowerCase()}</NavLink>
                  ) : (null)
                  }
                </>
              ))) : (null)}
            </div>
          </NavDropdown>
          {user ? (
        <div className="user-menu">
          <NavDropdown
            id="nav-dropdown-user"
            title={user.username}
            menuVariant="light"
            onToggle={() => setUserDropdownOpen(!userDropdownOpen)}
            show={userDropdownOpen}
          >
            <div className='back-drop'>
              <NavLink className='drop-item'  activeClassName="active-link" onClick={() =>
                 { closeUserDropdown(); logout(); }}>Logout
              </NavLink>              
            </div>
          </NavDropdown>
        </div>
      ) : (
        <li><NavLink to="/login" activeClassName="active-link">Login</NavLink></li>
      )}          
          <li><NavLink to="/reservas" activeClassName="active-link">Reservas</NavLink></li>
        </ul>
      </nav>
      <div className={`cart-icon ${isCartaSectionActive || isCarritoSectionActive || isReservasSectionActive ? 'active' : ''}`}>
        <NavLink to="/carrito" className='cart'><FaShoppingCart /></NavLink>
        <span className="cart-item-count">{datos && datos.carrito && datos.carrito.length}</span>
      </div>
     
      <div className="burguer">
        <BurguerButton clicked={clicked} handleClick={handleClick} onClick={() => setIsDropdownActive(false)} />
      </div>
    </div>
  )
}

export default Header;
*/

/*
<NavLink className='drop-item' to="/menu/clasica" activeClassName="active-link" onClick={closeMenuDropdown}>Comida Clásica</NavLink>
              <NavLink className='drop-item' to="/menu/sandwich" activeClassName="active-link" onClick={closeMenuDropdown}>Sandwiches</NavLink>
              <NavLink className='drop-item' to="/menu/vegetariana" activeClassName="active-link" onClick={closeMenuDropdown}>Comida Vegetariana</NavLink>
              <NavLink className='drop-item' to="/menu/sintacc" activeClassName="active-link" onClick={closeMenuDropdown}>Comida Sin TACC</NavLink>
              */