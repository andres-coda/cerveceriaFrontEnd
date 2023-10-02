<<<<<<< Updated upstream
import React, { useState, useContext } from 'react';
import { contexto } from '../contexto/contexto';
import { Link } from 'react-router-dom';
=======
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Header.css';
// import logo from "../../assets/Logo.png"
// import BurguerButton from '../burguerButton/BurguerButton';
// import { FaShoppingCart } from 'react-icons/fa';
// import NavDropdown from 'react-bootstrap/NavDropdown'


// function Header() {
//   const [clicked, setClicked] = useState(false);  

//   const handleClick = () => {
//     setClicked(!clicked)    
//   }  

//   return (
//     <div id="header" className="header">
//       <div className="logoHeader">
//         <Link to="/"><img src={logo} alt="logo" /></Link>
//       </div>
//       <nav id="navbar" className={`navbar ${clicked ? 'active' : ''}`}>
//         <ul>
//           <li><Link to="/">Inicio</Link></li>
//           <li><Link to="/map">Buscar</Link></li>
//           <NavDropdown
//             id="nav-dropdown-dark-example"
//             title="Nosotros"
//             menuVariant="light"
//           >
//             <div className='back-drop'>
//               <NavDropdown.Item className='drop-item' href="/quienessomos">¿Quienes Somos?</NavDropdown.Item>
//               <NavDropdown.Item className='drop-item' href="/dondeestamos">¿Donde Estamos?</NavDropdown.Item>
//               <NavDropdown.Item className='drop-item' href="/contacto">Contacto</NavDropdown.Item>
//             </div>
//           </NavDropdown>
//           <NavDropdown
//             id="nav-dropdown-dark-example"
//             title="Carta"
//             menuVariant="light"            
//           >
//             <div className='back-drop'>
//               <NavDropdown.Item className='drop-item' href="/menu">Carta Completa</NavDropdown.Item>
//               <NavDropdown.Item className='drop-item' href="/menu/bebida">Bebidas</NavDropdown.Item>
//               <NavDropdown.Item className='drop-item' href="/menu">Comida Clásica</NavDropdown.Item>
//               <NavDropdown.Item className='drop-item' href="/menu">Sandwiches</NavDropdown.Item>
//               <NavDropdown.Item className='drop-item' href="/menu">Comida Vegetariana</NavDropdown.Item>
//               <NavDropdown.Item className='drop-item' href="/menu">Comida Sin TACC</NavDropdown.Item>              
//             </div>
//           </NavDropdown>
//           <li><Link to="/registro">Login</Link></li>
//         </ul>
//       </nav>
//       <div className="cart-icon">         
//         <Link to="/carrito" className='cart'><FaShoppingCart/></Link>       
//         <span className="cart-item-count">3</span> 
//       </div>

//       <Link to="/reservas" className="btn-book-a-table">Reservas</Link>
//       <div className="burguer">
//         <BurguerButton clicked={clicked} handleClick={handleClick} onClick={() => setIsDropdownActive(false)} />
//       </div>
//     </div>
//   )
// }
// export default Header;


/**
 * Opcion carrito visible solo en la seccion de menu...
 */

// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import './Header.css';
// import logo from "../../assets/Logo.png"
// import BurguerButton from '../burguerButton/BurguerButton';
// import { FaShoppingCart } from 'react-icons/fa';
// import NavDropdown from 'react-bootstrap/NavDropdown';

// function Header() {
//   const [clicked, setClicked] = useState(false);
//   const location = useLocation();

//   const handleClick = () => {
//     setClicked(!clicked);
//   }

//   // Verificar si la ubicación actual está en una de las rutas de la sección "Carta"
//   const isCartaSectionActive = location.pathname.startsWith('/menu');

//   return (
//     <div id="header" className="header">
//       <div className="logoHeader">
//         <Link to="/"><img src={logo} alt="logo" /></Link>
//       </div>
//       <nav id="navbar" className={`navbar ${clicked ? 'active' : ''}`}>
//         <ul>
//           <li><Link to="/">Inicio</Link></li>
//           <li><Link to="/map">Buscar</Link></li>
//           <NavDropdown
//             id="nav-dropdown-dark-example"
//             title="Nosotros"
//             menuVariant="light"
//           >
//             <div className='back-drop'>
//               <NavDropdown.Item className='drop-item' href="/quienessomos">¿Quienes Somos?</NavDropdown.Item>
//               <NavDropdown.Item className='drop-item' href="/dondeestamos">¿Donde Estamos?</NavDropdown.Item>
//               <NavDropdown.Item className='drop-item' href="/contacto">Contacto</NavDropdown.Item>
//             </div>
//           </NavDropdown>
//           <NavDropdown
//             id="nav-dropdown-dark-example"
//             title="Carta"
//             menuVariant="light"
//           >
//             <div className='back-drop'>
//               <NavDropdown.Item className='drop-item' href="/menu">Carta Completa</NavDropdown.Item>
//               <NavDropdown.Item className='drop-item' href="/menu/bebida">Bebidas</NavDropdown.Item>
//               <NavDropdown.Item className='drop-item' href="/menu">Comida Clásica</NavDropdown.Item>
//               <NavDropdown.Item className='drop-item' href="/menu">Sandwiches</NavDropdown.Item>
//               <NavDropdown.Item className='drop-item' href="/menu">Comida Vegetariana</NavDropdown.Item>
//               <NavDropdown.Item className='drop-item' href="/menu">Comida Sin TACC</NavDropdown.Item>
//             </div>
//           </NavDropdown>
//           <li><Link to="/registro">Login</Link></li>
//         </ul>
//       </nav>
//       {isCartaSectionActive && (
//         <div className="cart-icon">
//           <Link to="/carrito" className='cart'><FaShoppingCart/></Link>
//           <span className="cart-item-count">3</span> 
//         </div>
//       )}
//       <Link to="/reservas" className="btn-book-a-table">Reservas</Link>
//       <div className="burguer">
//         <BurguerButton clicked={clicked} handleClick={handleClick} onClick={() => setIsDropdownActive(false)} />
//       </div>
//     </div>
//   )
// }

// export default Header;

// import React, { useState } from 'react';
// import { NavLink, useLocation } from 'react-router-dom'; // Cambio de Link a NavLink
// import './Header.css';
// import logo from "../../assets/Logo.png"
// import BurguerButton from '../burguerButton/BurguerButton';
// import { FaShoppingCart } from 'react-icons/fa';
// import NavDropdown from 'react-bootstrap/NavDropdown';

// function Header() {
//   const [clicked, setClicked] = useState(false);
//   const location = useLocation();

//   const handleClick = () => {
//     setClicked(!clicked);
//   }

//   const isCartaSectionActive = location.pathname.startsWith('/menu');

//   return (
//     <div id="header" className="header">
//       <div className="logoHeader">
//         <NavLink to="/"><img src={logo} alt="logo" /></NavLink> {/* Cambio de Link a NavLink */}
//       </div>
//       <nav id="navbar" className={`navbar ${clicked ? 'active' : ''}`}>
//         <ul>
//           <li><NavLink to="/" activeClassName="active-link">Inicio</NavLink></li> {/* Cambio de Link a NavLink */}
//           <li><NavLink to="/map" activeClassName="active-link">Buscar</NavLink></li> {/* Cambio de Link a NavLink */}
//           <NavDropdown
//             id="nav-dropdown-dark-example"
//             title="Nosotros"
//             menuVariant="light"
//           >
//             <div className='back-drop'>
//               <NavLink className='drop-item' to="/quienessomos" activeClassName="active-link">¿Quienes Somos?</NavLink> {/* Cambio de Link a NavLink */}
//               <NavLink className='drop-item' to="/dondeestamos" activeClassName="active-link">¿Donde Estamos?</NavLink> {/* Cambio de Link a NavLink */}
//               <NavLink className='drop-item' to="/contacto" activeClassName="active-link">Contacto</NavLink> {/* Cambio de Link a NavLink */}
//             </div>
//           </NavDropdown>
//           <NavDropdown
//             id="nav-dropdown-dark-example"
//             title="Carta"
//             menuVariant="light"
//           >
//             <div className='back-drop'>
//               <NavLink className='drop-item' to="/menu" activeClassName="active-link">Carta Completa</NavLink> {/* Cambio de Link a NavLink */}
//               <NavLink className='drop-item' to="/menu/bebida" activeClassName="active-link">Bebidas</NavLink> {/* Cambio de Link a NavLink */}
//               <NavLink className='drop-item' to="/menu" activeClassName="active-link">Comida Clásica</NavLink> {/* Cambio de Link a NavLink */}
//               <NavLink className='drop-item' to="/menu" activeClassName="active-link">Sandwiches</NavLink> {/* Cambio de Link a NavLink */}
//               <NavLink className='drop-item' to="/menu" activeClassName="active-link">Comida Vegetariana</NavLink> {/* Cambio de Link a NavLink */}
//               <NavLink className='drop-item' to="/menu" activeClassName="active-link">Comida Sin TACC</NavLink> {/* Cambio de Link a NavLink */}
//             </div>
//           </NavDropdown>
//           <li><NavLink to="/registro" activeClassName="active-link">Login</NavLink></li> {/* Cambio de Link a NavLink */}
//         </ul>
//       </nav>
//       {isCartaSectionActive && (
//         <div className="cart-icon">
//           <NavLink to="/carrito" className='cart'><FaShoppingCart/></NavLink> {/* Cambio de Link a NavLink */}
//           <span className="cart-item-count">3</span> 
//         </div>
//       )}
//       <NavLink to="/reservas" className="btn-book-a-table">Reservas</NavLink> {/* Cambio de Link a NavLink */}
//       <div className="burguer">
//         <BurguerButton clicked={clicked} handleClick={handleClick} onClick={() => setIsDropdownActive(false)} />
//       </div>
//     </div>
//   )
// }

// export default Header;

/* Codigo con dropdowns funcionando */

// import React, { useState } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
// import './Header.css';
// import logo from "../../assets/Logo.png"
// import BurguerButton from '../burguerButton/BurguerButton';
// import { FaShoppingCart } from 'react-icons/fa';
// import NavDropdown from 'react-bootstrap/NavDropdown';

// function Header() {
//   const [clicked, setClicked] = useState(false);
//   const [menuDropdownOpen, setMenuDropdownOpen] = useState(false); // Estado para el dropdown "Carta"
//   const [nosotrosDropdownOpen, setNosotrosDropdownOpen] = useState(false); // Estado para el dropdown "Nosotros"
//   const location = useLocation();

//   const handleClick = () => {
//     setClicked(!clicked);
//     setMenuDropdownOpen(false); // Cierra el dropdown "Carta"
//     setNosotrosDropdownOpen(false); // Cierra el dropdown "Nosotros"
//   }

//   const isCartaSectionActive = location.pathname.startsWith('/menu');
//   const isNosotrosSectionActive = location.pathname.startsWith('/quienessomos');
//   const isCarritoSectionActive = location.pathname === '/carrito'; // Verifica si está en "/carrito"

//   const closeMenuDropdown = () => {
//     setMenuDropdownOpen(false); // Cierra el dropdown "Carta"
//   };

//   const closeNosotrosDropdown = () => {
//     setNosotrosDropdownOpen(false); // Cierra el dropdown "Nosotros"
//   };

//   return (
//     <div id="header" className="header">
//       <div className="logoHeader">
//         <NavLink to="/"><img src={logo} alt="logo" /></NavLink>
//       </div>
//       <nav id="navbar" className={`navbar ${clicked ? 'active' : ''}`}>
//         <ul>
//           <li><NavLink to="/" activeClassName="active-link">Inicio</NavLink></li>
//           <li><NavLink to="/map" activeClassName="active-link">Buscar</NavLink></li>
//           <NavDropdown
//             id="nav-dropdown-dark-example"
//             title="Nosotros"
//             menuVariant="light"
//             onToggle={() => setNosotrosDropdownOpen(!nosotrosDropdownOpen)}
//             show={nosotrosDropdownOpen}
//           >
//             <div className='back-drop'>
//               <NavLink className='drop-item' to="/quienessomos" activeClassName="active-link" onClick={closeNosotrosDropdown}>¿Quienes Somos?</NavLink>
//               <NavLink className='drop-item' to="/dondeestamos" activeClassName="active-link" onClick={closeNosotrosDropdown}>¿Donde Estamos?</NavLink>
//               <NavLink className='drop-item' to="/contacto" activeClassName="active-link" onClick={closeNosotrosDropdown}>Contacto</NavLink>
//             </div>
//           </NavDropdown>
//           <NavDropdown
//             id="nav-dropdown-dark-example"
//             title="Carta"
//             menuVariant="light"
//             onToggle={() => setMenuDropdownOpen(!menuDropdownOpen)}
//             show={menuDropdownOpen}
//           >
//             <div className='back-drop'>
//               <NavLink className='drop-item' to="/menu" activeClassName="active-link" onClick={closeMenuDropdown}>Carta Completa</NavLink>
//               <NavLink className='drop-item' to="/menu/bebida" activeClassName="active-link" onClick={closeMenuDropdown}>Bebidas</NavLink>
//               <NavLink className='drop-item' to="/menu" activeClassName="active-link" onClick={closeMenuDropdown}>Comida Clásica</NavLink>
//               <NavLink className='drop-item' to="/menu" activeClassName="active-link" onClick={closeMenuDropdown}>Sandwiches</NavLink>
//               <NavLink className='drop-item' to="/menu" activeClassName="active-link" onClick={closeMenuDropdown}>Comida Vegetariana</NavLink>
//               <NavLink className='drop-item' to="/menu" activeClassName="active-link" onClick={closeMenuDropdown}>Comida Sin TACC</NavLink>
//             </div>
//           </NavDropdown>
//           <li><NavLink to="/registro" activeClassName="active-link">Login</NavLink></li>
//         </ul>
//       </nav>
//       {(isCartaSectionActive || isCarritoSectionActive) && (
//         <div className="cart-icon">
//           <NavLink to="/carrito" className='cart'><FaShoppingCart/></NavLink>
//           <span className="cart-item-count">3</span> 
//         </div>
//       )}
//       <NavLink to="/reservas" className="btn-book-a-table">Reservas</NavLink>
//       <div className="burguer">
//         <BurguerButton clicked={clicked} handleClick={handleClick} onClick={() => setIsDropdownActive(false)} />
//       </div>
//     </div>
//   )
// }

// export default Header;

import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
>>>>>>> Stashed changes
import './Header.css';
import logo from "../../assets/Logo.png"
import BurguerButton from '../burguerButton/BurguerButton';
import { FaShoppingCart } from 'react-icons/fa';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
  const { datos } = useContext(contexto);
  const [clicked, setClicked] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false); // Estado para el dropdown "Carta"
  const [nosotrosDropdownOpen, setNosotrosDropdownOpen] = useState(false); // Estado para el dropdown "Nosotros"
  const location = useLocation();

  const handleClick = () => {
    setClicked(!clicked);
    setMenuDropdownOpen(false); // Cierra el dropdown "Carta"
    setNosotrosDropdownOpen(false); // Cierra el dropdown "Nosotros"
  }

  const isCartaSectionActive = location.pathname.startsWith('/menu');
  const isCarritoSectionActive = location.pathname === '/carrito'; // Verifica si está en "/carrito"
  const isReservasSectionActive = location.pathname === '/reservas'; // Verifica si está en "/reservas"

  const closeMenuDropdown = () => {
    setMenuDropdownOpen(false); // Cierra el dropdown "Carta"
  };

  const closeNosotrosDropdown = () => {
    setNosotrosDropdownOpen(false); // Cierra el dropdown "Nosotros"
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
          <li><NavLink to="/reservas" activeClassName="active-link">Reservas</NavLink></li> {/* Agregamos la remarcación para "Reservas" */}
        </ul>
      </nav>
<<<<<<< Updated upstream
      <div className="cart-icon">         
        <Link to="/carrito" className='cart'><FaShoppingCart/></Link>       
        <span className="cart-item-count">{datos.carrito.length}</span> 
=======
      {/* {(isCartaSectionActive || isCarritoSectionActive || isReservasSectionActive) && ( // Mostrar el carrito si está en "Carta", "/carrito" o "/reservas"
        <div className="cart-icon">
          <NavLink to="/carrito" className='cart'><FaShoppingCart/></NavLink>
          <span className="cart-item-count">3</span> 
        </div>
      )} */}
      <div className={`cart-icon ${isCartaSectionActive || isCarritoSectionActive || isReservasSectionActive ? 'active' : ''}`}>
        <NavLink to="/carrito" className='cart'><FaShoppingCart/></NavLink>
        <span className="cart-item-count">3</span> 
>>>>>>> Stashed changes
      </div>
      <div className="burguer">
        <BurguerButton clicked={clicked} handleClick={handleClick} onClick={() => setIsDropdownActive(false)} />
      </div>
    </div>
  )
}

export default Header;
