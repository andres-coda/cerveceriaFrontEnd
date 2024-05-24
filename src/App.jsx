import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
library.add(faAngleLeft, faAngleRight);

import './App.css'
import { contexto } from './componentes/contexto/contexto'
import { useContext, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Menu from './componentes/menu/Menu';
import QuienesSomos from './componentes/QuienesSomos/QuienesSomos';
import MenuDetallesAux from './componentes/menuDetalles/MenuDetallesAux';
import Login from './componentes/auth/Login';
import Registro from './componentes/auth/Registro';
import  Home  from './componentes/Home/Home';
import Footer from './componentes/footer/Footer'
import Header from './componentes/header/Header'
import Carrito from './componentes/carrito/Carrito';
import MenuCargar from './componentes/menuCargar/MenuCargar';
import DondeEstamos  from './componentes/DondeEstamos/DondeEstamos';
import Contacto from './componentes/Contacto/Contacto'
import Reservas from './componentes/reservas/Reservas';
import ModalUsers from "./componentes/modalUsers/ModalUsers";
import MenuAux from "./componentes/menu/MenuAux";
import PrivateRoute from "./componentes/privateRoute/PrivateRoute";
import { AuthProvider } from "./componentes/auth/AuthContext";
import AddSucursal from "./componentes/DondeEstamos/AddSucursal";

function App() {
  const { datos } = useContext(contexto);
  return ( 
    <BrowserRouter>
    <AuthProvider>   
        <Header /> 
        <Routes>
          {Array.isArray(datos.productos) ? ( datos.productos.map((dato)=>{
            return (
              <Route path={`/menu/${dato.idProducto}`} element={<MenuDetallesAux idProducto={dato.idProducto}/>} key={dato.idProducto}/>
            )
          })):(null)}
          {Array.isArray(datos.categoria) ? ( datos.categoria.map((categorias)=>{
            return (
              <Route path={`/menu/${categorias.nombre}`} element={<MenuAux categoria={categorias}/>} key={categorias.idCategoria}/>
            )
          })):(null)}
          {Array.isArray(datos.tipo) ? (datos.tipo.map((tipo)=>{
            return (
              <Route path={`/menu/${tipo.nombre}`} element={<MenuAux categoria={tipo}/>} key={tipo.idNombre}/>
            )
          })):(null)}
          <Route path='/' element={<Home />}/>
          <Route path='/menu' element={<MenuAux categoria={undefined}/>}/>
          <Route path='/login' element={<Login />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='/quienessomos' element={<QuienesSomos />}/>
          <Route path='/dondeestamos' element={<DondeEstamos />}/>
          <Route path='/contacto' element={<Contacto />}/>
          <Route path='/carrito' element={<Carrito />}/>
          <Route path="/reservas" element={<PrivateRoute roles={['user', 'admin']} />}>
            <Route path='/reservas' element={<Reservas />} />
          </Route>
          <Route path="/cargarmenu" element={<PrivateRoute roles={['admin']} />}>
            <Route path='/cargarmenu' element={<MenuCargar />} />
          </Route>
          <Route path="/cargarsucursales" element={<PrivateRoute roles={['admin']} />}>
            <Route path='/cargarsucursales' element={<AddSucursal />} />
          </Route>
          <Route path="/perfil" element={<PrivateRoute roles={['user', 'admin']} />}>
            <Route path='/perfil' element={<ModalUsers />} />
          </Route>
        </Routes>
      <Footer />
    </AuthProvider>  
      </BrowserRouter>  
  )
}

export default App;

