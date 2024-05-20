import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../endPoints/endPoints';

const AuthContext = createContext();

export const AuthProvider = ({ children}) => {
  const navigate = useNavigate();  
  const [auth, setAuth] = useState({ 
    token: localStorage.getItem('token') || null,
    user: null
  });

  useEffect(() => {
    if (auth.token) {
      fetchProfile(auth.token);
    }
  }, [auth.token]);

  const login = async (email, password, role = 'user') => {
    console.log('Sending data:', { email, password, role }); 
    
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, role }),
    });

    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en el inicio de sesión');
    }
    const data = await response.json();
    localStorage.setItem('token', data.access_token);
      setAuth({ token: data.access_token, user: null });
      await fetchProfile(data.access_token);
      navigate('/');    
  };

  const fetchProfile = async (token) => {
    const response = await fetch(`${BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al obtener el perfil');
    }

    const data = await response.json();
    console.log(data);    
    setAuth((prevAuth) => ({ ...prevAuth, user: data }));    
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null });
    navigate('/');  
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, fetchProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);