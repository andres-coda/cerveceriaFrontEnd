import React, { useState } from 'react';
import './Parrafo.css'
import { FiEye, FiEyeOff } from 'react-icons/fi';

const PassParrafo = ({ password }) => {
    const maskedPassword = '*'.repeat(password.length); 
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <li>
            <p className="masked-password">{!isPasswordVisible ? maskedPassword : password}</p>
            { !isPasswordVisible ? 
                <FiEye  className='iconPass' onClick={togglePasswordVisibility} /> : 
                <FiEyeOff  className='iconPass' onClick={togglePasswordVisibility} />
            }   
        </li>
    );
}

export default PassParrafo;
