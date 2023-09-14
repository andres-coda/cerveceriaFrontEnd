import React, { useState } from 'react';
import './Header.css';
import logo from "../../assets/Logo.png"
import BurguerButton from '../burguerButton/BurguerButton';


function Header() {
    const [clicked, setClicked] = useState(false);
    const [isDropdownActive, setIsDropdownActive] = useState(false);
    const handleClick = () => {        
        setClicked(!clicked)
    }

    return (
        <div id="header" className="header">
            


                <a href="/home" className="logoHeader">

                    <img src={logo} alt="logo" />

                </a>
                <nav id="navbar" className={`navbar ${clicked ? 'active' : ''}`}>
                    <ul>
                        <li><a href="/">Inicio</a></li>
                        <li><a href="/buscar">Buscar</a></li>
                        <li><a href="/nosotros">Nosotros</a></li>
                        <li className={`dropdown ${isDropdownActive ? 'active' : ''}`}
                            onClick={() => setIsDropdownActive(!isDropdownActive)}>
                            <a href="/menu"><span>Carta</span></a>
                            <ul className={isDropdownActive ? 'active' : ''}>
                                <li><a href="/menu/bebida">Bebidas</a></li>
                                <li><a href="/menu/clasica">Comida Clasica</a></li>
                                <li><a href="/menu/sandwich">Sandwiches</a></li>
                                <li><a href="/menu/vegetariana">Comida Vegetariana</a></li>
                                <li><a href="/menu/sintacc">Comida Sin TACC</a></li>
                            </ul>
                        </li>
                        <li><a href="/login">Login</a></li>
                    </ul>
                </nav>

                <a className="btn-book-a-table" href="/reservas">Reservas</a>
                <div className="burguer">
                    <BurguerButton clicked={clicked} handleClick={handleClick} onClick={() => setIsDropdownActive(false)}/>
                </div>

            
        </div>
    )
}
export default Header;
