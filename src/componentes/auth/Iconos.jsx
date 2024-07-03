import React, { useState } from 'react';
import { FaLock, FaLockOpen, FaKey, FaEye, FaEyeSlash, FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight, FaSignOutAlt, FaPowerOff, FaDoorOpen, FaDoorClosed } from 'react-icons/fa';
import { MdLock, MdLockOpen, MdVpnKey, MdVisibility, MdVisibilityOff, MdKeyboardArrowUp, MdKeyboardArrowDown, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdExitToApp } from 'react-icons/md';
import { FiLock, FiUnlock, FiKey, FiEye, FiEyeOff, FiArrowUp, FiArrowDown, FiArrowLeft, FiArrowRight, FiLogOut } from 'react-icons/fi';
import './perfil.css';
import { IoKey, IoLockClosed, IoLockOpen, IoLogOutOutline, IoLogOutSharp } from 'react-icons/io5';

const PasswordIcons = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleLogout = () => {
        // Aquí puedes agregar la lógica para cerrar sesión
        console.log('Cerrar sesión...');
    };

    return (
        <div className='containerGeneral'>
            <div className='iconos'>
                {/* Font Awesome */}
                <div>
                    <FaEye style={{ cursor: 'pointer' }} onClick={togglePasswordVisibility} />
                    <FaEyeSlash style={{ cursor: 'pointer' }} onClick={togglePasswordVisibility} />
                    <FaArrowUp />
                    <FaArrowDown />
                    <FaArrowLeft />
                    <FaArrowRight />
                    <FaSignOutAlt style={{ cursor: 'pointer' }} onClick={handleLogout} />
                    <FaPowerOff style={{ cursor: 'pointer' }} onClick={handleLogout} />
                    <FaDoorOpen style={{ cursor: 'pointer' }} onClick={handleLogout} />
                    <FaDoorClosed style={{ cursor: 'pointer' }} onClick={handleLogout} />
                </div>

                {/* Material Icons */}
                <div>
                    <MdVisibility style={{ cursor: 'pointer' }} onClick={togglePasswordVisibility} />
                    <MdVisibilityOff style={{ cursor: 'pointer' }} onClick={togglePasswordVisibility} />
                    <MdKeyboardArrowUp />
                    <MdKeyboardArrowDown />
                    <MdKeyboardArrowLeft />
                    <MdKeyboardArrowRight />
                    <MdExitToApp style={{ cursor: 'pointer' }} onClick={handleLogout} />
                </div>

                {/* Feather Icons */}
                <div>
                    <FiEye style={{ cursor: 'pointer' }} onClick={togglePasswordVisibility} />
                    <FiEyeOff style={{ cursor: 'pointer' }} onClick={togglePasswordVisibility} />
                    <FiArrowUp />
                    <FiArrowDown />
                    <FiArrowLeft />
                    <FiArrowRight />
                    <FiLogOut style={{ cursor: 'pointer' }} onClick={handleLogout} />
                    <p>este</p>
                </div>

                {/* Ionicons */}
                <div>
                    <IoLogOutOutline style={{ cursor: 'pointer' }} onClick={handleLogout} />
                    <IoLogOutSharp style={{ cursor: 'pointer' }} onClick={handleLogout} />
                </div>
            </div>

            {/* Iconos de Contraseña */}
            <div className='iconos'>
                <h3>Font Awesome</h3>
                <FaLock size={24} />
                <FaLockOpen size={24} />
                <FaKey size={24} />

                <h3>Material Icons</h3>
                <MdLock size={24} />
                <MdLockOpen size={24} />
                <MdVpnKey size={24} />

                <h3>Ionicons</h3>
                <IoLockClosed size={24} />
                <IoLockOpen size={24} />
                <IoKey size={24} />

                <h3>Feather Icons</h3>
                <FiLock size={24} />
                <FiUnlock size={24} />
                <FiKey size={24} />
            </div>
        </div>
    );
}

export default PasswordIcons;
