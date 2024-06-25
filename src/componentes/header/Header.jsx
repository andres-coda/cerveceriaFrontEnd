import { useContext, useState, useEffect } from 'react';
import { contexto } from '../contexto/contexto';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';
import logo from "../../assets/Logo.png";
import BurguerButton from '../burguerButton/BurguerButton';
import { FaShoppingCart, FaEdit, FaPlusCircle } from 'react-icons/fa';
import { MdOutlineLockPerson } from 'react-icons/md';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from '../auth/AuthContext';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { getUserDetails } from '../reservas/actions/getUserDetails';

function Header() {
  const { datos } = useContext(contexto);
  const [clicked, setClicked] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [nosotrosDropdownOpen, setNosotrosDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { auth, logout } = useAuth();
  
  const {user, token} = auth || {};
  const userId = user?.sub;
  const [userDetails, setUserDetails] = useState({});
  
  useEffect(() => {
    if (userId && token) {
      getUserDetails(userId, token).then(details => {
        setUserDetails(details);
      }).catch(error => {
        console.error('Error fetching user details:', error);
      });
     }
  }, [userId, token]);
 
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

  // const isCartaSectionActive = location.pathname.startsWith('/menu');
  // const isCarritoSectionActive = location.pathname === '/carrito';
  // const isReservasSectionActive = location.pathname === '/reservas';

  const closeMenuDropdown = () => setMenuDropdownOpen(false);
  const closeNosotrosDropdown = () => setNosotrosDropdownOpen(false);
  const closeAdminDropdown = () => setAdminDropdownOpen(false);
  const closeUserDropdown = () => setUserDropdownOpen(false);

  const pedidosCount = userDetails.pedidos ? userDetails.pedidos.length : 0;

  return (
    <div id="header" className="header">
      <div className="logoHeader">
        <NavLink to="/"><img src={logo} alt="logo" /></NavLink>
      </div>
      <nav id="navbar" className={`navbar ${clicked ? 'active' : ''}`}>
        <ul>
        <li><NavLink to="/dondeestamos">Nosotros</NavLink></li>
        <NavDropdown
            id="nav-dropdown-dark-example"
            title="Carta"
            menuVariant="dark"
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
          <li><NavLink to="/reservas">Reservas</NavLink></li>
          {/* <li><NavLink to="/reservas">Reservas</NavLink></li> */}
          {user && user.role === "admin" ? (
            <NavDropdown
              id="nav-dropdown-admin"
              title="Administrar"
              menuVariant="dark"
              onToggle={() => setAdminDropdownOpen(!adminDropdownOpen)}
              show={adminDropdownOpen}
            >
              <div className='back-drop'>
                <li>
                  <NavLink className='drop-item' to={`/cargarsucursales`} onClick={closeAdminDropdown}><FaPlusCircle className="icon " />Agregar Sucursales</NavLink>
                </li>
                <li>
                  <NavLink className='drop-item' to={`/cargarmenu`} onClick={closeAdminDropdown}><FaPlusCircle className="icon" />Agregar producto</NavLink>
                </li>
                <li>
                  <NavLink className='drop-item' to={`/pedidos-generales`} onClick={closeAdminDropdown}><FaPlusCircle className="icon" />Administrar recibidos</NavLink>
                </li>
                <li>
                  <NavLink className='drop-item' to={`/listadoreservas`} onClick={closeAdminDropdown}><FaPlusCircle className="icon" />Administrar reservas</NavLink>
                </li>
                <li>
                  <NavLink className='drop-item' to={`/listadeusuarios`} onClick={closeAdminDropdown}><FaPlusCircle className="icon " />Administrar usuarios</NavLink>
                </li>
              </div>
            </NavDropdown>
          ) : null}
          {user ? (
            <div className="user-menu">
              <NavDropdown
                id="nav-dropdown-user"
                title={
                  <>
                    <IoPersonCircleOutline className='iconLogin' />
                    {user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase()}
                  </>
                }
                menuVariant="dark"
                onToggle={() => setUserDropdownOpen(!userDropdownOpen)}
                show={userDropdownOpen}
              >
                <div className='back-drop'>
                  {/*
                  <div className='profile'>{`Nombre: ${(auth.user.name) || ''} ${(auth.user.lastname) || ''}`}</div>
                  <div className='profile'>{`Email: ${(auth.user.email) || ''}`}</div>
                  <div className='profile'>{`Rol: ${(auth.user.role) || ''}`}</div>
                  <div className='profile'>{`Pedidos: ${pedidosCount}`}</div>
                  */}
                  <NavLink
                    className='drop-item'
                    to={`/pedidos`}
                    onClick={closeMenuDropdown}
                  >
                  Mis pedidos
                  </NavLink>
                  <NavLink
                    className='drop-item'
                    to={`/reservasrealizadas`}
                    onClick={closeMenuDropdown}
                  >
                  Mis reservas
                  </NavLink>
                  <NavLink to={`/`} className='drop-item' onClick={() => { closeUserDropdown(); logout(); }}>Logout</NavLink>
                </div>
              </NavDropdown>
            </div>
          ) : (
            <li><NavLink to="/login"><MdOutlineLockPerson className='iconLogin' />Login</NavLink></li>
          )}
          {datos?.carrito?.length > 0 ? (
          <div className={`cart-icon active `}>
            <NavLink to="/carrito" className='cart'>
              <FaShoppingCart />
              <span className="cart-item-count">{datos?.carrito?.length || 0}</span>
            </NavLink>
          </div>
          ):(
            null
          )}
        </ul>
      </nav>
      {/* <div className={`cart-icon active `}>
        <NavLink to="/carrito" className='cart'><FaShoppingCart  /></NavLink>
        <span className="cart-item-count">{datos?.carrito?.length || 0}</span>
      </div> */}
      <div className="burguer">
        <BurguerButton clicked={clicked} handleClick={handleClick} />
      </div>
    </div>
  );
}

export default Header;
