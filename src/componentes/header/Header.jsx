import { useContext, useState, useEffect } from 'react';
import { contexto } from '../contexto/contexto';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';
import logo from "../../assets/Logo.png";
import BurguerButton from '../burguerButton/BurguerButton';
import { FaShoppingCart, FaEdit, FaPlusCircle } from 'react-icons/fa';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from '../auth/AuthContext';

function Header() {
  const { datos } = useContext(contexto);
  const [clicked, setClicked] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [nosotrosDropdownOpen, setNosotrosDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const { auth, logout } = useAuth();
  const { user } = auth;

  useEffect(() => {
    if (!clicked) {
      setMenuDropdownOpen(false);
      setNosotrosDropdownOpen(false);
      setAdminDropdownOpen(false);
      setUserDropdownOpen(false);
    }
  }, [clicked]);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const isCartaSectionActive = location.pathname.startsWith('/menu');
  const isCarritoSectionActive = location.pathname === '/carrito';
  const isReservasSectionActive = location.pathname === '/reservas';

  const closeMenuDropdown = () => setMenuDropdownOpen(false);
  const closeNosotrosDropdown = () => setNosotrosDropdownOpen(false);
  const closeAdminDropdown = () => setAdminDropdownOpen(false);
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
          {user && user.role === "admin" ? (
            <NavDropdown
              id="nav-dropdown-admin"
              title="Administrar"
              menuVariant="light"
              onToggle={() => setAdminDropdownOpen(!adminDropdownOpen)}
              show={adminDropdownOpen}
            >
              <div className='back-drop'>
                <li>
                  <NavLink to={`/cargarsucursales`} onClick={closeAdminDropdown}><FaPlusCircle className="icon " />Agregar Sucursales</NavLink>
                </li>
                <li>
                  <NavLink to={`/cargarmenu`} onClick={closeAdminDropdown}><FaPlusCircle className="icon" />Agregar producto</NavLink>
                </li>
              </div>
            </NavDropdown>
          ) : null}
        </ul>
      </nav>
      <div className={`cart-icon ${isCartaSectionActive || isCarritoSectionActive || isReservasSectionActive ? 'active' : ''}`}>
        <NavLink to="/carrito" className='cart'><FaShoppingCart  /></NavLink>
        <span className="cart-item-count">{datos?.carrito?.length || 0}</span>
      </div>
      <div className="burguer">
        <BurguerButton clicked={clicked} handleClick={handleClick} />
      </div>
    </div>
  );
}

export default Header;
